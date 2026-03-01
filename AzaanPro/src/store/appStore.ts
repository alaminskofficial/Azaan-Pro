import { create } from "zustand";

type LocationType = {
  latitude: number;
  longitude: number;
  city?: string;
};

interface AppState {
  city: string;
  location: LocationType | null;
  prayerTimes: any; //todays prayer times
  monthlyPrayerTimes: any;
  method: number;
  madhab: string;
  hijriDate: string;
  hijriOffset: number;
  isRamadan: boolean;

  setCity: (city: string) => void;
  setLocation: (loc: any) => void;
  setPrayerTimes: (times: any) => void;
  setMonthlyPrayerTimes: (times: any) => void;
  setHijriDate: (date: string) => void;
  setHijriOffset: (offset: number) => void;
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
  hijriOffset: -1, // -1 means auto (for india), 0 means no offset, +1 means add one day
  isRamadan: false,
  setCity: (city) => set({ city }),
  setLocation: (location) => set({ location }),
  setPrayerTimes: (times) => set({ prayerTimes: times }),
  setMonthlyPrayerTimes: (times) => set({ monthlyPrayerTimes: times }),
  setHijriDate: (date) => set({ hijriDate: date }),
  setHijriOffset: (offset) => set({ hijriOffset: offset }),
  setIsRamadan: (isRamadan) => set({ isRamadan }),
  setMethod: (method) => set({ method }),
  setMadhab: (madhab) => set({ madhab }),
}));