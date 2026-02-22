import { View, Text, StyleSheet } from "react-native";
import { useAppStore } from "../store/appStore";

export default function Header() {
  const city = useAppStore((s) => s.city);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Azaan Pro</Text>
      <Text style={styles.city}>{city}</Text>
    </View>
  );
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
  city: {
    color: "#fff",
    marginTop: 4,
  },
});