import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAppStore } from "@/store/appStore";
import { colors } from "@/theme/color";
import { getMethodName, METHOD_IDS } from "@/utils/methodUtils";

export default function Settings() {
  const method = useAppStore((s) => s.method);
  const madhab = useAppStore((s) => s.madhab);
  const setMethod = useAppStore((s) => s.setMethod);
  const setMadhab = useAppStore((s) => s.setMadhab);
  const hijriOffset = useAppStore((s) => s.hijriOffset);
  const setHijriOffset = useAppStore((s) => s.setHijriOffset);

  const METHODS = METHOD_IDS.map((id) => ({
    id,
    name: getMethodName(id),
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Prayer Settings</Text>

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
            <Picker.Item label="+1 day" value={1} color={colors.textPrimary} />
            <Picker.Item label="+2 days" value={2} color={colors.success} />
          </Picker>
        </View>

        <Text style={styles.helper}>Adjust if local moon sighting differs</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },

  header: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: 25,
    marginBottom: 25,
  },

  card: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
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
});
