import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getSurahList() {
  const cache = await AsyncStorage.getItem("surah_list");

  if (cache) {
    return JSON.parse(cache);
  }

  const res = await fetch("https://api.alquran.cloud/v1/surah");

  const data = await res.json();

  await AsyncStorage.setItem("surah_list", JSON.stringify(data.data));

  return data.data;
}

export async function getSurah(id: number) {
  const key = `surah_${id}`;

  const cache = await AsyncStorage.getItem(key);

  if (cache) {
    return JSON.parse(cache);
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
