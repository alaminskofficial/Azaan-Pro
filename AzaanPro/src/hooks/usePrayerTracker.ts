import { useEffect, useRef, useState, useCallback } from "react";
import { AppState, AppStateStatus } from "react-native";
import { getCurrentAndNextPrayer } from "@/utils/prayerUtils";

export  function usePrayerTracker(prayers: any) {
  const [prayerInfo, setPrayerInfo] = useState<any | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  const clearExistingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const scheduleNextUpdate = useCallback(() => {
    if (!prayers) return;

    const now = new Date();
    const info = getCurrentAndNextPrayer(prayers);

    setPrayerInfo(info);

    if (!info?.nextTime) return;

    const delay = info.nextTime.getTime() - now.getTime();

    clearExistingTimeout();

    // If delay invalid (edge case like midnight passed), refresh after 30 sec
    if (delay <= 0) {
      timeoutRef.current = setTimeout(scheduleNextUpdate, 30000);
      return;
    }

    timeoutRef.current = setTimeout(scheduleNextUpdate, delay);
  }, [prayers]);

  useEffect(() => {
    if (!prayers) return;
    scheduleNextUpdate();

    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextState === "active"
      ) {
        scheduleNextUpdate();
      }

      appStateRef.current = nextState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      clearExistingTimeout();
      subscription.remove();
    };
  }, [prayers, scheduleNextUpdate]);

  return prayerInfo;
}
