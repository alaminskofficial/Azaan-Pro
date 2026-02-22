import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Header from "@/components/Header";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useAppStore } from "@/store/appStore";
import CountdownCard from "@/components/CountDownCard";
import { getCurrentAndNextPrayer } from "@/utils/prayerUtils";
import RamadanCard from "@/components/RamadanCard";
import NotificationBanner from "@/components/NotificationsBanner";

export default function HomeScreen() {
  const { loading } = usePrayerTimes();
  const prayers = useAppStore((s) => s.prayerTimes);
  console.log("Prayer times:", prayers);
  const prayerInfo = prayers ? getCurrentAndNextPrayer(prayers) : null;
  const isRamadan = useAppStore((s) => s.isRamadan);

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
      <NotificationBanner />
      {isRamadan && <RamadanCard timings={prayers} />}

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 , marginTop: 20 , padding: 20},
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
