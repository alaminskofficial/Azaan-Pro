import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAppStore } from "../store/appStore";
import tailwind from "twrnc";
import { colors } from "@/theme/color";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

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
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <View
            style={tailwind`w-8 h-8 bg-gray-600 rounded-full items-center justify-center relative`}
          >
            {/* User Icon */}
            <AntDesign name="user" size={18} color="white" />

            {/* Online Status Dot */}
            <View
              style={tailwind`
          w-2 h-2 
          bg-green-500 
          rounded-full 
          absolute 
          bottom-0 
          right-0 
          border-2 
          border-white
        `}
            />
          </View>
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
