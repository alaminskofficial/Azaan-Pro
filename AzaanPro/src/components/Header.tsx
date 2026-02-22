import { View, Text, StyleSheet } from "react-native";
import { useAppStore } from "../store/appStore";
import tailwind from "twrnc";
import { colors } from "@/theme/color";

export default function Header() {
  const city = useAppStore((s) => s.city);
  const hijriDate = useAppStore((s) => s.hijriDate);

  return (
    <View style={tailwind`px-4 pt-4 pb-3 flex-row justify-between items-center`}>
        <Text style={styles.logo}>Azaan Pro</Text>
      <View>
        <Text style={[tailwind`text-lg font-bold`, { color: colors.text }]}>
        {city}
        </Text>
        <Text style={{ color: colors.subText }}>
        {hijriDate}
        </Text>
      </View>

      <View style={tailwind`flex-row gap-3`}>
        {/* <View style={tailwind`w-8 h-8 bg-purple-500 rounded-full`} /> */}
        <View style={tailwind`w-8 h-8 bg-gray-600 rounded-full`} />
      </View>
    </View>
  );
}


export  function Header2() {
  
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#2D6A4F",
  },
  logo: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  city: { color: "#fff", marginTop: 4 },
  hijri: { color: "#fff", marginTop: 2 },
});