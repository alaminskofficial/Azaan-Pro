import React, { useEffect, useRef, useState } from "react";
import { View, FlatList, useWindowDimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { getSurah } from "@/services/quranServices";
import { playAyah, stopAyah } from "@/services/audioServices";

import AyahCard from "@/components/AyahCard";
import { useQuranStore } from "@/store/quranStore";
import SurahHeader from "@/components/SurahHeader";

export default function Surah() {
  const { id, name, arabicName, revelationType, ayahs } =
    useLocalSearchParams();
  const { width } = useWindowDimensions();

  const flatListRef = useRef<FlatList>(null);

  const { showTranslation, setActiveAyah, activeAyah } = useQuranStore();

  const [arabic, setArabic] = useState<any[]>([]);
  const [translation, setTranslation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getSurah(Number(id));
    setArabic(data.arabic);
    setTranslation(data.translation);
    setLoading(false);
  };

  const play = async (index: number) => {
    setActiveAyah(index);

    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });

    await playAyah(arabic[index].number, () => {
      const next = index + 1;

      if (next < arabic.length) {
        play(next);
      }
    });
    setPaused(false);
  };
  const stop = async () => {
    await stopAyah();
    setPaused(true);
    setActiveAyah(-1);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 20 }}>
        <SurahHeader
          id={id}
          name={name}
          arabicName={arabicName}
          revelationType={revelationType}
          ayahs={ayahs}
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={arabic}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item, index }) => (
          <AyahCard
            ayah={item}
            ayahNumber={index + 1}
            translation={translation[index]}
            width={width}
            isActive={activeAyah === index}
            showTranslation={showTranslation}
            play={() => play(index)}
            stop={stop}
            bookmark={() => {}}
          />
        )}
      />
    </View>
  );
}
