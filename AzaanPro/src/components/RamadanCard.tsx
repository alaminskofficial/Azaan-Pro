import { View, Text, StyleSheet } from "react-native";
import { useCountdown } from "@/hooks/useCountDown";

export default function RamadanCard({ timings }: any) {
  const now = new Date();

  const maghrib = new Date();
  const [h, m] = timings.Maghrib.split(":");
  maghrib.setHours(h);
  maghrib.setMinutes(m);

  const timeLeft = useCountdown(maghrib);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iftar Countdown</Text>
      <Text style={styles.timer}>{timeLeft}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: "#F4A261",
    borderRadius: 10,
  },
  title: { fontSize: 16 },
  timer: { fontSize: 26, fontWeight: "bold" },
});