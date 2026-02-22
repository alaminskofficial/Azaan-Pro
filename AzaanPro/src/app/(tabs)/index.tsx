import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Header from "@/components/Header";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useAppStore } from "@/store/appStore";
import CountdownCard from "@/components/CountDownCard";
import { getCurrentAndNextPrayer } from "@/utils/prayerUtils";

export default function HomeScreen() {
  const { loading } = usePrayerTimes();
  const prayers = useAppStore((s) => s.prayerTimes);
  const prayerInfo = prayers ? getCurrentAndNextPrayer(prayers) : null;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading prayer times...</Text>
      </View>
    );
  }

  if (!prayers) {
    return (
      <View style={styles.center}>
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      {prayerInfo && (
        <CountdownCard
          current={prayerInfo.current}
          next={prayerInfo.next}
          nextTime={prayerInfo.nextTime}
        />
      )}

      <View style={styles.card}>
        <Text style={styles.title}>Today's Prayers</Text>
        <Text>Fajr: {prayers.Fajr}</Text>
        <Text>Dhuhr: {prayers.Dhuhr}</Text>
        <Text>Asr: {prayers.Asr}</Text>
        <Text>Maghrib (Iftar): {prayers.Maghrib}</Text>
        <Text>Isha: {prayers.Isha}</Text>
        <Text>Sehri Ends (Imsak): {prayers.Imsak}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
