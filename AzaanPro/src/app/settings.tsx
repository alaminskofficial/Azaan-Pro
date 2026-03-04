import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAppStore } from "@/store/appStore";
import { colors } from "@/theme/color";
import { getMethodName, METHOD_IDS } from "@/utils/methodUtils";
import { getUserLocation } from "@/services/locationServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export default function Settings() {
  const method = useAppStore((s) => s.method);
  const madhab = useAppStore((s) => s.madhab);
  const setMethod = useAppStore((s) => s.setMethod);
  const setMadhab = useAppStore((s) => s.setMadhab);
  const hijriOffset = useAppStore((s) => s.hijriOffset);
  const setHijriOffset = useAppStore((s) => s.setHijriOffset);
  const setCity = useAppStore((s) => s.setCity);
  const city = useAppStore((s) => s.city);
  const setLocation = useAppStore((s) => s.setLocation);
  const location = useAppStore((s) => s.location);

  const METHODS = METHOD_IDS.map((id) => ({
    id,
    name: getMethodName(id),
  }));

  const updateLocation = async () => {
    const loc = await getUserLocation();
    if (!loc) return;

    setLocation(loc);
    setCity(loc.city || "Your Location");
    await AsyncStorage.setItem("last_location", JSON.stringify(loc));
    alert(`Location updated to ${loc.city}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>App Settings</Text>

        {/* Location */}
        <View style={styles.card}>
          <View style={styles.locationCenter}>
            <Text style={styles.label}>Location</Text>

            <Text style={styles.locationCity}>📍 {city || "Not set"}</Text>

            {location && (
              <Text style={styles.locationCoords}>
                Lat {location.latitude.toFixed(4)} • Lon{" "}
                {location.longitude.toFixed(4)}
              </Text>
            )}

            <TouchableOpacity style={styles.detectBtn} onPress={updateLocation}>
              <Text style={styles.detectText}>Auto Detect Location</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Calculation Method */}
        <View style={styles.card}>
          <Text style={styles.label}>Calculation Method :</Text>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={method}
              dropdownIconColor={colors.primary} // arrow color
              onValueChange={(itemValue) => setMethod(itemValue)}
              style={[styles.picker, { color: colors.textPrimary }]} // text color
              itemStyle={{ color: colors.textPrimary }}
            >
              {METHODS.map((m) => (
                <Picker.Item
                  key={m.id}
                  label={m.name}
                  value={m.id}
                  color={colors.textPrimary}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Madhab */}
        <View style={styles.card}>
          <Text style={styles.label}>Juristic Method (Madhab) :</Text>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={madhab.toLowerCase()}
              dropdownIconColor={colors.primaryLight}
              onValueChange={(value) => setMadhab(value)}
              style={[styles.picker, { color: colors.textPrimary }]} // text color
              itemStyle={{ color: colors.textPrimary }}
            >
              <Picker.Item
                label="Hanafi"
                value="hanafi"
                color={colors.textPrimary}
              />
              <Picker.Item
                label="Shafi/Maliki/Hanbali"
                value="shafi"
                color={colors.textPrimary}
              />
            </Picker>
          </View>
        </View>
        {/* Hijri Adjustment */}
        <View style={styles.card}>
          <Text style={styles.label}>Hijri Date Adjustment :</Text>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={hijriOffset}
              dropdownIconColor={colors.primary}
              onValueChange={(value) => setHijriOffset(value)}
              style={[styles.picker, { color: colors.textPrimary }]}
              itemStyle={{ color: colors.textPrimary }}
            >
              <Picker.Item
                label="-2 days"
                value={-2}
                color={colors.textPrimary}
              />
              <Picker.Item
                label="-1 day (Recommended for India)"
                value={-1}
                color={colors.textPrimary}
              />
              <Picker.Item
                label="No adjustment"
                value={0}
                color={colors.textPrimary}
              />
              <Picker.Item
                label="+1 day"
                value={1}
                color={colors.textPrimary}
              />
              <Picker.Item
                label="+2 days"
                value={2}
                color={colors.textPrimary}
              />
            </Picker>
          </View>

          <Text style={styles.helper}>
            {" "}
            Note: Adjust if local moon sighting differs
          </Text>
        </View>
        <View style={styles.versionBox}>
          <Text style={styles.versionText}>
            App Version {Constants.expoConfig?.version ?? "1.0.0"}
          </Text>
          <Text style={styles.versionText}>
            Developed by Alamin ( Azaan Pro )
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
  },
  centerCard: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 420,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  pickerWrapper: {
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  picker: {
    color: colors.success,
  },
  helper: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 6,
  },
  value: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  action: {
    color: colors.primary,
    fontWeight: "600",
  },
  locationCity: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  locationCoords: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
  detectBtn: {
    marginTop: 14,
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detectText: {
    color: colors.primary,
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.surface,
    justifyContent: "center",
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  locationCenter: {
    alignItems: "center",
  },
  versionBox: {
    marginTop: 20,
    alignItems: "center",
  },
  versionText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
