import { useAppStore } from "@/store/appStore";
import { applyHijriOffset } from "@/utils/hijriUtils";

const applyTodayData = (monthlyData: any) => {

    const store = useAppStore.getState();
    const setPrayerTimes = store.setPrayerTimes;
    const setMonthlyPrayerTimes = store.setMonthlyPrayerTimes;
    const setHijriDate = store.setHijriDate;
    const setIsRamadan = store.setIsRamadan;
    const today = new Date();
    const todayIndex = today.getDate() - 1;
    const todayData = monthlyData[todayIndex];
    if (!todayData) return;
  
    const todayTimings = todayData.timings;
    const hijriRaw = todayData.date.hijri;
    const offset = useAppStore.getState().hijriOffset;
  
    const hijri = applyHijriOffset(hijriRaw, offset);
  
    setPrayerTimes(todayTimings);
    setMonthlyPrayerTimes(monthlyData);
    setIsRamadan(hijri.month === 9);
    setHijriDate(`${hijri.day} ${hijri.monthName} ${hijri.year}`);
  };

  export { applyTodayData };