import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useAppStore } from "@/store/appStore";
import { getCurrentAndNextPrayer } from "@/utils/prayerUtils";

export default function PrayerTimes() {
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
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today's Prayers</Text>
      <Text>Fajr: {prayers.Fajr}</Text>
      <Text>Sunrise: {prayers.Sunrise}</Text>
      <Text>Dhuhr: {prayers.Dhuhr}</Text>
      <Text>Asr: {prayers.Asr}</Text>
      <Text>Maghrib (Iftar): {prayers.Maghrib}</Text>
      <Text>Isha: {prayers.Isha}</Text>
      {/* <Text>Midnight: {prayers.Midnight}</Text> */}
      <Text>Qiyam: {prayers.qiyam}</Text>
      <Text>Sehri Ends (Imsak): {prayers.Imsak}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
      margin: 35,
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