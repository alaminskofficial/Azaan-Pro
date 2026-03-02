import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAsmaUlHusna, AsmaName } from "@/services/asmaServices";
import { ASMA_UL_HUSNA_STORAGE_KEY } from "@/constants/azaanPro";

export function useAsmaUlHusna() {
  const [names, setNames] = useState<AsmaName[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        // 1️. Try cache first
        const cached = await AsyncStorage.getItem(ASMA_UL_HUSNA_STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (mounted) {
            setNames(parsed);
            setLoading(false);
          }
          return;
        }

        // 2️. Fetch from API
        const data = await fetchAsmaUlHusna();

        // 3️. Save to cache
        await AsyncStorage.setItem(
          ASMA_UL_HUSNA_STORAGE_KEY,
          JSON.stringify(data)
        );

        if (mounted) setNames(data);
      } catch (e) {
        if (mounted) setError("Unable to load Asma-ul-Husna");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return { names, loading, error };
}
