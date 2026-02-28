import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppStore } from "@/store/appStore";
import { getUserLocation } from "@/services/locationServices";

export const useBootstrapLocation = () => {
  useEffect(() => {
    const bootstrap = async () => {
      const store = useAppStore.getState();

      // 1. If store already has location → do nothing
      if (store.location) return;

      // 2️. Try AsyncStorage
      const saved = await AsyncStorage.getItem("last_location");
      console.log("Bootstrapping location, found in storage:", !!saved);
      if (saved) {
        const loc = JSON.parse(saved);
        store.setLocation(loc);
        store.setCity(loc.city || "Your Location");
        return;
      }

      // 3️. Fallback → auto detect (FIRST TIME ONLY)
      const loc = await getUserLocation();
      if (loc) {
        store.setLocation(loc);
        store.setCity(loc.city || "Your Location");
        await AsyncStorage.setItem("last_location", JSON.stringify(loc));
      }
    };

    bootstrap();
  }, []);
};