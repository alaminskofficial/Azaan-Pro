import { useEffect, useRef, useState } from "react";
import { getCurrentAndNextPrayer } from "@/utils/prayerUtils";

export function usePrayerTracker(prayers: any) {
  const [prayerInfo, setPrayerInfo] = useState<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!prayers) return;

    const scheduleNextUpdate = () => {
      const now = new Date();
      const info = getCurrentAndNextPrayer(prayers);

      setPrayerInfo(info);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (!info?.nextTime) return;

      const delay = info.nextTime.getTime() - now.getTime();

      if (delay > 0) {
        timeoutRef.current = setTimeout(scheduleNextUpdate, delay);
      }
    };

    scheduleNextUpdate();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [prayers]);

  return prayerInfo;
}