import { DetailType, CategoryType } from "@/utils/dua";
import AsyncStorage from "@react-native-async-storage/async-storage";
import categories from "@/data/categories.json";
import morning from "@/data/morning_dhikr.json";
import evening from "../data/evening_dhikr.json";
import daily from "../data/daily_dua.json";
import selected from "../data/selected_dua.json";
import afterSalah from "../data/dhikr_after_salah.json";

const DUAS_MAP: Record<string, DetailType[]> = {
  "morning-dhikr": morning,
  "evening-dhikr": evening,
  "daily-dua": daily,
  "selected-dua": selected,
  "dhikr-after-salah": afterSalah,
};

export const getCategories = async (): Promise<CategoryType[]> => {
  const cached = await AsyncStorage.getItem("categories").then((res) => (res ? JSON.parse(res) : null));  
  if (cached) return cached;
  await AsyncStorage.setItem("categories", JSON.stringify(categories.en));
  return categories.en;
};

export const getDuasByCategory = async (
  slug: string
): Promise<DetailType[]> => {
  const key = `duas-${slug}`;

  const cached = await AsyncStorage.getItem(key).then((res) => (res ? JSON.parse(res) : null));   
  if (cached) return cached;

  const data = DUAS_MAP[slug] || [];
  await AsyncStorage.setItem(key, JSON.stringify(data));
  return data;
};