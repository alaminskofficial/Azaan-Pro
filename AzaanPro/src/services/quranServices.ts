import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getSurah(id: number) {
  const key = `surah_${id}`;

  const cached = await AsyncStorage.getItem(key);
  if (cached) {
    return JSON.parse(cached);
  }

  const res = await fetch(
    `https://api.alquran.cloud/v1/surah/${id}/editions/ar-tajweed,en.asad`
  );

  const data = await res.json();

  const result = {
    arabic: data.data[0].ayahs,
    translation: data.data[1].ayahs,
  };

  await AsyncStorage.setItem(key, JSON.stringify(result));

  return result;
}