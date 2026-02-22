import { View, Text, StyleSheet } from "react-native";
import { useCountdown } from "@/hooks/useCountDown";
import { colors } from "@/theme/color";
import Svg, { Circle } from "react-native-svg";
import { useMemo } from "react";

export default function CountDownCard({ current, next, nextTime }: any) {
  const timeLeft = useCountdown(nextTime);

  // Convert countdown (HH:MM:SS) → seconds
  const totalSeconds = 24 * 60 * 60; // fallback
  const remainingSeconds = useMemo(() => {
    const parts = timeLeft?.split(":") || [];
    if (parts.length !== 3) return 0;
    return (
      parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
    );
  }, [timeLeft]);

  const progress = 1 - remainingSeconds / totalSeconds;

  const radius = 55;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.prayerName}>{current}</Text>
        <Text style={styles.prayerTime}>
          {nextTime instanceof Date
            ? nextTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : nextTime}
        </Text>

        <Text style={styles.viewAll}>View All Prayers</Text>
      </View>

      <View style={styles.right}>
        <Svg width={140} height={140}>
          <Circle
            stroke={colors.border}
            fill="none"
            cx="70"
            cy="70"
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke={colors.success}
            fill="none"
            cx="70"
            cy="70"
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin="70,70"
          />
        </Svg>

        <View style={styles.timerContainer}>
          <Text style={styles.nextLabel}>{next}</Text>
          <Text style={styles.timer}>{timeLeft}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flex: 1,
  },

  prayerName: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.textPrimary,
  },

  prayerTime: {
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 5,
  },

  viewAll: {
    marginTop: 15,
    color: colors.primary,
    fontWeight: "500",
  },

  right: {
    justifyContent: "center",
    alignItems: "center",
  },

  timerContainer: {
    position: "absolute",
    alignItems: "center",
  },

  nextLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  timer: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
});
