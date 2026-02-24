import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/color';

export default function PrayerRow({ name, time, active = false }: any) {
    return (
      <View style={[styles.row, active && styles.activeRow]}>
        <Text style={[styles.prayerName, active && styles.activeText]}>
          {name}
        </Text>
        <Text style={[styles.prayerTime, active && styles.activeText]}>
          {time}
        </Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 14,
      borderBottomWidth: 0.5,
      borderColor: colors.border,
    },
  
    activeRow: {
      backgroundColor: colors.primary + "15",
      borderRadius: 8,
      paddingHorizontal: 5,
    },
  
    prayerName: {
      fontSize: 16,
      color: colors.textPrimary,
      paddingHorizontal: 5,
    },
  
    prayerTime: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.textPrimary,
    },
  
    activeText: {
      color: colors.primary,
      fontWeight: "700",
    },
  });