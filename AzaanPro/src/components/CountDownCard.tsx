import { View, Text, StyleSheet } from "react-native";
import { useCountdown } from "@/hooks/useCountDown";
import { colors } from "@/theme/color";
import Svg, { Circle } from "react-native-svg";
import { useMemo } from "react";

export default function CountDownCard({
  current,
  currentTime,
  next,
  nextTime,
}: any) {
  const { time, ms } = useCountdown(nextTime);

  const ONE_HOUR_MS = 60 * 60 * 1000;

  // Show entire right section only within 1 hour
  const showUpcoming = ms <= ONE_HOUR_MS && ms > 0;

  // Circle progress only in last 60 minutes
  const progress = useMemo(() => {
    if (ms > ONE_HOUR_MS) return 0;
    if (ms <= 0) return 1;

    return 1 - ms / ONE_HOUR_MS;
  }, [ms]);

  const radius = 55;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.prayerName}>{current}</Text>

        <Text style={styles.prayerTime}>
          {currentTime instanceof Date
            ? currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : currentTime}
        </Text>

        <Text style={styles.viewAll}>View All Prayers</Text>
      </View>

      {/* Show only if next prayer is within 1 hour */}
      {showUpcoming && (
        <View style={styles.right}>
          <Svg width={140} height={140}>
            {/* Background */}
            <Circle
              stroke={colors.border}
              fill="none"
              cx="70"
              cy="70"
              r={radius}
              strokeWidth={strokeWidth}
            />

            {/* Progress (last 30 min only) */}
            {ms <= ONE_HOUR_MS && (
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
            )}
          </Svg>

          <View style={styles.timerContainer}>
            <Text style={styles.nextLabel}>{next}</Text>
            <Text style={styles.timer}>{time}</Text>
          </View>
        </View>
      )}
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
  left: { flex: 1 },

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
