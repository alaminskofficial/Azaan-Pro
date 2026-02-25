import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAppStore } from "../store/appStore";
import tailwind from "twrnc";
import { colors } from "@/theme/color";
import { useRouter } from "expo-router";

export default function Header() {
  const city = useAppStore((s) => s.city);
  const hijriDate = useAppStore((s) => s.hijriDate);
  const router = useRouter();

  return (
    <View
      style={tailwind`px-4 pt-4 pb-3 flex-row justify-between items-center`}
    >
      <Text style={styles.logo}>Azaan Pro</Text>
      <TouchableOpacity onPress={() => router.push("/settings")}>
        <View>
          <Text
            style={[
              tailwind`text-lg font-bold`,
              { color: colors.textSecondary },
            ]}
          >
            {city}
          </Text>
          <Text style={{ color: colors.textSecondary }}>{hijriDate}</Text>
        </View>
      </TouchableOpacity>

      <View style={tailwind`flex-row gap-3`}>
        {/* <View style={tailwind`w-8 h-8 bg-purple-500 rounded-full`} /> */}
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <View style={tailwind`w-8 h-8 bg-gray-600 rounded-full`} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
  },
  logo: {
    fontSize: 22,
    color: colors.textPrimary,
    fontWeight: "bold",
  },
});
