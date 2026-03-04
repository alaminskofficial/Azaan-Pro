import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import Header from "@/components/Header";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useAppStore } from "@/store/appStore";
import CountdownCard from "@/components/CountDownCard";
import { getCurrentAndNextPrayer } from "@/utils/prayerUtils";
import RamadanCard from "@/components/RamadanCard";
import NotificationBanner from "@/components/NotificationsBanner";
import { colors } from "@/theme/color";
import RamadanBanner from "@/components/RamadanBanner";
import { useScheduleDailyNotifications } from "@/hooks/useDailyNotifications";
import { useBootstrapLocation } from "@/hooks/useBootstrapLocation";
import { usePrayerTracker } from "@/hooks/usePrayerTracker";
import { stories } from "@/utils/storyUtils";

export default function HomeScreen() {
  useBootstrapLocation(); 
  const { loading } = usePrayerTimes();
  const prayers = useAppStore((s) => s.prayerTimes);
  const isRamadan = useAppStore((s) => s.isRamadan);
  useScheduleDailyNotifications(prayers);
  const prayerInfo = usePrayerTracker(prayers);
  
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.textPrimary }}>
          Loading prayer times...
        </Text>
      </View>
    );
  }

  if (!prayers) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.textPrimary }}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Countdown Card */}
        {prayerInfo && (
          <CountdownCard
            key={`${prayerInfo.current}-${prayerInfo.next}`}
            current={prayerInfo.current}
            currentTime={prayerInfo.currentTime}
            next={prayerInfo.next}
            nextTime={prayerInfo.nextTime}
          />
        )}

        {/* Notification Banner */}
        <NotificationBanner />

        {/* Ramadan Card */}
        {isRamadan && <RamadanBanner />}
        {isRamadan && <RamadanCard timings={prayers} />}

        {/* Latest Stories --todo*/}
        <Text style={styles.sectionTitle}>Latest Stories</Text>
        <FlatList
          horizontal
          data={stories}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{uri: item.img}}
              style={styles.storyImage}
            />
          )}
        />

        {/* Goals Progress --todo */}
        <View style={styles.goalCard}>
          <Text style={styles.goalTitle}>Complete 5 more goals today</Text>

          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: "60%" }]} />
          </View>

          <Text style={styles.goalStats}>
            3/5 Prayers • 5/6 Dhikr • 1/2 Ramadan
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 10,
  },

  storyImage: {
    width: 120,
    height: 160,
    borderRadius: 14,
    marginRight: 10,
  },

  goalCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    marginBottom: 40,
  },

  goalTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 10,
    overflow: "hidden",
  },

  progress: {
    height: 8,
    backgroundColor: colors.success,
  },

  goalStats: {
    color: colors.textSecondary,
    marginTop: 8,
    fontSize: 12,
  },
});
