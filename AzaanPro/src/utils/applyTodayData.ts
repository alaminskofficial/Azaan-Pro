import { useAppStore } from "@/store/appStore";
import { applyHijriOffset } from "@/utils/hijriUtils";

export const applyTodayData = (monthlyData: any) => {
  const store = useAppStore.getState();

  const today = new Date();
  const todayIndex = today.getDate() - 1;
  const todayData = monthlyData[todayIndex];
  if (!todayData) return;

  const hijri = applyHijriOffset(
    todayData.date.hijri,
    store.hijriOffset
  );

  store.setPrayerTimes(todayData.timings);
  store.setMonthlyPrayerTimes(monthlyData);
  store.setHijriDate(
    `${hijri.day} ${hijri.monthName} ${hijri.year}`
  );
  store.setIsRamadan(hijri.month === 9);
};