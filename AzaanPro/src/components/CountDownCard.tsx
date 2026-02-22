import { View, Text, StyleSheet } from "react-native";
import { useCountdown } from "@/hooks/useCountDown";

export default function CountDownCard({
  current,
  next,
  nextTime,
}: any) {
  const timeLeft = useCountdown(nextTime);

  return (
    <View style={styles.container}>
      <Text style={styles.current}>Current: {current}</Text>
      <Text style={styles.next}>Next: {next}</Text>
      <Text style={styles.timer}>{timeLeft}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: "#2D6A4F",
    borderRadius: 10,
  },
  current: { color: "#fff", fontSize: 16 },
  next: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  timer: { color: "#fff", fontSize: 28, marginTop: 10 },
});