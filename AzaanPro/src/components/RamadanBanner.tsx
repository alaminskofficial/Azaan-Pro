import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppStore } from "@/store/appStore";
import { colors } from "@/theme/color";

export default function RamadanBanner() {
  const isRamadan = useAppStore((s) => s.isRamadan);

  if (!isRamadan) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌙 Ramadan Mubarak</Text>
      <Text style={styles.subtitle}>
        May Allah accept your fasting and prayers
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