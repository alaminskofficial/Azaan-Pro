import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppStore } from "@/store/appStore";
import { colors } from "@/theme/color";
import { getCurrentAndNextPrayer } from "@/utils/prayerUtils";

export default function RamadanBanner() {
  const prayers = useAppStore((s) => s.prayerTimes);
  const isRamadan = useAppStore((s) => s.isRamadan);
  const prayerInfo = prayers ? getCurrentAndNextPrayer(prayers) : null;
  
  if (!isRamadan) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌙 Ramadan Mubarak</Text>
      <Text style={styles.subtitle}>
        {prayerInfo?.next === "Fajr"
          ? "Time for Suhoor"
          : prayerInfo?.next === "Maghrib"
          ? "Iftar time approaching"
          : "May Allah accept your fasting and prayers"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ramadan,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    color: "#E5E7EB",
    fontSize: 12,
    marginTop: 2,
  },
});
