import { View, Text, StyleSheet } from "react-native";
import { useCountdown } from "@/hooks/useCountDown";
import { colors } from "@/theme/color";

export default function RamadanCard({ timings }: any) {
  const now = new Date();

  // Function to clean time like "05:12 (IST)" → "05:12"
  const cleanTime = (timeString: string) => {
    return timeString.split(" ")[0]; // remove timezone
  };

  // -------- Sehri (Fajr) --------
  const sehriRaw = cleanTime(timings?.Fajr || "00:00");
  const [sfH, sfM] = sehriRaw.split(":").map(Number);

  const sehriTime = new Date();
  sehriTime.setHours(sfH, sfM, 0, 0);

  // -------- Iftar (Maghrib) --------
  const iftarRaw = cleanTime(timings?.Maghrib || "00:00");
  const [mgH, mgM] = iftarRaw.split(":").map(Number);

  const iftarTime = new Date();
  iftarTime.setHours(mgH, mgM, 0, 0);

  // Determine next event safely
  let targetTime = sehriTime;
  let label = "Sehri Ends In";

  if (now < sehriTime) {
    targetTime = sehriTime;
    label = "Sehri Ends In";
  } else if (now < iftarTime) {
    targetTime = iftarTime;
    label = "Iftar In";
  } else {
    const tomorrowSehri = new Date(sehriTime);
    tomorrowSehri.setDate(tomorrowSehri.getDate() + 1);
    targetTime = tomorrowSehri;
    label = "Next Sehri In";
  }

  const { time } = useCountdown(targetTime);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ramadan Timings</Text>

      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Sehri</Text>
          <Text style={styles.time}>{sehriRaw}</Text>
        </View>

        <View>
          <Text style={styles.label}>Iftar</Text>
          <Text style={styles.time}>{iftarRaw}</Text>
        </View>
      </View>

      <View style={styles.countdownBox}>
        <Text style={styles.countdownLabel}>{label}</Text>
        <Text style={styles.timer}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: colors.surface,
    borderRadius: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  time: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: 4,
  },
  countdownBox: {
    backgroundColor: colors.primary,
    padding: 6,
    borderRadius: 5,
    alignItems: "center",
  },
  countdownLabel: {
    color: "#fff",
    fontSize: 14,
  },
  timer: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
  },
});