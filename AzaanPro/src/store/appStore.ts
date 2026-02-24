import { create } from "zustand";

interface AppState {
  city: string;
  location: { latitude: number; longitude: number } | null;
  prayerTimes: any;
  monthlyPrayerTimes: any;
  method: number;
  madhab: string;
  hijriDate: string;
  isRamadan: boolean;

  setCity: (city: string) => void;
  setLocation: (loc: any) => void;
  setPrayerTimes: (times: any) => void;
  setMonthlyPrayerTimes: (times: any) => void;
  setHijriDate: (date: string) => void;
  setIsRamadan: (isRamadan: boolean) => void;
  setMethod: (method: number) => void;
  setMadhab: (madhab: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  city: "",
  location: null,
  prayerTimes: null,
  monthlyPrayerTimes: null,
  method: 1, // kar(Ind) be default
  madhab: "hanafi",
  hijriDate: "",
  isRamadan: false,
  setCity: (city) => set({ city }),
  setLocation: (location) => set({ location }),
  setPrayerTimes: (times) => set({ prayerTimes: times }),
  setMonthlyPrayerTimes: (times) => set({ monthlyPrayerTimes: times }),
  setHijriDate: (date) => set({ hijriDate: date }),
  setIsRamadan: (isRamadan) => set({ isRamadan }),
  setMethod: (method) => set({ method }),
  setMadhab: (madhab) => set({ madhab }),
}));