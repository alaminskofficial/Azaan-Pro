import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  TextInput,
} from "react-native";

import { getSurahList } from "@/services/quranServices";
import SurahItem from "@/components/SurahItem";

export default function Quran() {
  const [surahs, setSurahs] = useState<any[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getSurahList();
    setSurahs(data);
    setFilteredSurahs(data);
    setLoading(false);
  };

  const handleSearch = (text: string) => {
    setSearch(text);

    const filtered = surahs.filter((s) =>
      s.englishName.toLowerCase().includes(text.toLowerCase()) ||
      s.englishNameTranslation.toLowerCase().includes(text.toLowerCase()) ||
      s.name.includes(text)
    );

    setFilteredSurahs(filtered);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      
      {/* Search Bar */}
      <View style={{ padding: 15 }}>
        <TextInput
          placeholder="Search Surah..."
          value={search}
          onChangeText={handleSearch}
          style={{
            backgroundColor: "#f1f1f1",
            padding: 12,
            borderRadius: 10,
            fontSize: 16,
          }}
        />
      </View>

      {/* Surah List */}
      <FlatList
        data={filteredSurahs}
        keyExtractor={(item: any) => item.number.toString()}
        renderItem={({ item }) => <SurahItem surah={item} />}
      />
    </View>
  );
}