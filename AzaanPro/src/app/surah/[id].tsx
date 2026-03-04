import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import RenderHTML from "react-native-render-html";
import { Audio } from "expo-av";
import { getSurah } from "@/services/quranServices";
import tailwind from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SurahScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();

  const [arabic, setArabic] = useState<any[]>([]);
  const [translation, setTranslation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const flatListRef = useRef<FlatList>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    load();
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  const load = async () => {
    const data = await getSurah(id ? Number(id) : 1);
    setArabic(data.arabic);
    setTranslation(data.translation);
    setLoading(false);
  };

  const startAutoPlay = async (index: number) => {
    if (index >= arabic.length) {
      setIsPlaying(false);
      setCurrentIndex(null);
      return;
    }

    if (soundRef.current) {
      await soundRef.current.unloadAsync();
    }

    setCurrentIndex(index);
    setIsPlaying(true);

    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });

    const { sound } = await Audio.Sound.createAsync(
      {
        uri: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${arabic[index].number}.mp3`,
      },
      { shouldPlay: true }
    );

    soundRef.current = sound;

    sound.setOnPlaybackStatusUpdate((status) => {
      if ((status as any).didJustFinish) {
        startAutoPlay(index + 1);
      }
    });
  };

  const pausePlayback = async () => {
    await soundRef.current?.stopAsync();
    setIsPlaying(false);
  };

  if (loading) {
    return (
      <View style={tailwind`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={tailwind`flex-1 bg-white p-3`}>
      {/* Controls */}
      <View style={tailwind`flex-row justify-between mb-4`}>
        <TouchableOpacity
          style={tailwind`bg-green-600 px-4 py-2 rounded-xl`}
          onPress={() => setShowTranslation(!showTranslation)}
        >
          <Text style={tailwind`text-white`}>
            {showTranslation ? "Hide Translation" : "Show Translation"}
          </Text>
        </TouchableOpacity>

        {!isPlaying ? (
          <TouchableOpacity
            style={tailwind`bg-blue-600 px-4 py-2 rounded-xl`}
            onPress={() => startAutoPlay(currentIndex ?? 0)}
          >
            <Text style={tailwind`text-white`}>Play</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={tailwind`bg-red-600 px-4 py-2 rounded-xl`}
            onPress={pausePlayback}
          >
            <Text style={tailwind`text-white`}>Pause</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        ref={flatListRef}
        data={arabic}
        keyExtractor={(item) => item.number.toString()}
        getItemLayout={(data, index) => ({
          length: 150,
          offset: 150 * index,
          index,
        })}
        renderItem={({ item, index }) => (
          <View
            style={[
              tailwind`mb-6 p-3 rounded-xl`,
              currentIndex === index && {
                backgroundColor: "#e6f0ff",
              },
            ]}
          >
            <RenderHTML
              contentWidth={width}
              source={{ html: `<div dir="rtl">${item.text}</div>` }}
              tagsStyles={{
                div: {
                  fontSize: 24,
                  lineHeight: 40,
                  textAlign: "right",
                },
              }}
            />

            {showTranslation && (
              <Text style={tailwind`text-gray-600 mt-2`}>
                {translation[index].text}
              </Text>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
