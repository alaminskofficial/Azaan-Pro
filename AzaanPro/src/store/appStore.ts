import { create } from "zustand";

interface AppState {
  city: string;
  location: { latitude: number; longitude: number } | null;
  prayerTimes: any;
  method: number;
  hijriDate: string;

  setCity: (city: string) => void;
  setLocation: (loc: any) => void;
  setPrayerTimes: (times: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  city: "",
  location: null,
  prayerTimes: null,
  method: 1, // kar(Ind) be default
  hijriDate: "",
  setCity: (city) => set({ city }),
  setLocation: (location) => set({ location }),
  setPrayerTimes: (times) => set({ prayerTimes: times }),
  setHijriDate: (date: string) => set({ hijriDate: date }),
}));