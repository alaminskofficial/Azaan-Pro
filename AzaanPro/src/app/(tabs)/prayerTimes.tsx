import React, { useMemo, useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useAppStore } from "@/store/appStore";
import { colors } from "@/theme/color";
import { cleanTime, getMethodName } from "@/utils/methodUtils";
import PrayerRow from "@/components/PrayerRow";
import { usePrayerTracker } from "@/hooks/usePrayerTracker";

const { width } = Dimensions.get("window");

export default function PrayerTimesScreen() {
  const { loading } = usePrayerTimes();
  const monthlyPrayerTimes = useAppStore((s) => s.monthlyPrayerTimes);
  const prayers = useAppStore((s) => s.prayerTimes);
  const prayerInfo = usePrayerTracker(prayers);

  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const madhab = useAppStore((s) => s.madhab);
  const method = useAppStore((s) => s.method);
  const currentPrayer = prayerInfo?.current || null;
  const days = useMemo(() => {
    if (!monthlyPrayerTimes || !monthlyPrayerTimes.length) return [];

    const todayReadable = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const startIndex = monthlyPrayerTimes.findIndex(
      (d: any) => d.date?.readable === todayReadable
    );

    const index = startIndex >= 0 ? startIndex : 0;

    return monthlyPrayerTimes.slice(index, index + 7);
  }, [monthlyPrayerTimes]);

  const todayIndex = 0;

  useEffect(() => {
    if (flatListRef.current && days.length) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: todayIndex,
          animated: false,
        });
        setActiveIndex(todayIndex);
      }, 300);
    }
  }, [todayIndex, days.length]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text>Loading prayer times...</Text>
      </View>
    );
  }

  const onScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const renderItem = ({ item }: any) => {
    const t = item.timings;
    const formattedDate = item.date?.readable;
    return (
      <View style={styles.page}>
        <Text style={styles.date}>{formattedDate}</Text>
        <PrayerRow
          name="Sehri Ends (Imsak)"
          time={cleanTime(t?.Imsak)}
          active={currentPrayer === "Imsak"}
        />
        <PrayerRow
          name="Fajr"
          time={cleanTime(t?.Fajr)}
          active={currentPrayer === "Fajr"}
        />
        <PrayerRow
          name="Sunrise"
          time={cleanTime(t?.Sunrise)}
          active={currentPrayer === "Sunrise"}
        />
        <PrayerRow
          name="Dhuhr"
          time={cleanTime(t?.Dhuhr)}
          active={currentPrayer === "Dhuhr"}
        />
        <PrayerRow
          name="Asr"
          time={cleanTime(t?.Asr)}
          active={currentPrayer === "Asr"}
        />
        <PrayerRow
          name="Maghrib / Iftar"
          time={cleanTime(t?.Maghrib)}
          active={currentPrayer === "Maghrib"}
        />
        <PrayerRow
          name="Isha"
          time={cleanTime(t?.Isha)}
          active={currentPrayer === "Isha"}
        />
        <PrayerRow
          name="First Third"
          time={cleanTime(t?.Firstthird)}
          active={currentPrayer === "Firstthird"}
        />
        <PrayerRow
          name="Midnight"
          time={cleanTime(t?.Midnight)}
          active={currentPrayer === "Midnight"}
        />
        <PrayerRow
          name="Qiyam (Last Third)"
          time={cleanTime(t?.Lastthird)}
          active={currentPrayer === "Lastthird"}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Section - Auto Fill */}
      <View style={styles.listContainer}>
        <FlatList
          ref={flatListRef}
          data={days}
          renderItem={renderItem}
          keyExtractor={(item) => item.date.timestamp}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <View style={styles.dotsContainer}>
          {days.map((_: any, i: any) => (
            <View
              key={i}
              style={[styles.dot, i === activeIndex && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      {/* Bottom Section - Natural Height */}
      <View style={styles.bottomPanel}>
        <Text style={styles.bottomTitle}>Calculation Settings</Text>

        <View style={styles.bottomRow}>
          <Text style={styles.bottomLabel}>Juristic Method:</Text>
          <Text
            style={styles.bottomValue}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {madhab === "hanafi" ? "Hanafi" : "Shafi/Maliki/Hanbali"}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.bottomLabel}>Calculation Method:</Text>
          <Text
            style={styles.bottomValue}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {getMethodName(method)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width,
    padding: 20,
    backgroundColor: colors.background,
  },

  date: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: colors.textPrimary,
  },

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
    paddingHorizontal: 10,
  },

  prayerName: {
    fontSize: 16,
    color: colors.textPrimary,
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

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: colors.primary,
    width: 8,
    height: 8,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  listContainer: {
    flex: 1,
  },

  bottomPanel: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: colors.border,
  },

  bottomTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: 10,
    textAlign: "center",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  bottomLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    flex: 1,
  },

  bottomValue: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
});
