import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getDuasByCategory } from "@/services/duaServices";
import { DetailType } from "@/utils/dua";
import { DuaCard } from "@/components/DuaCard";
import { colors } from "@/theme/color";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DuaListScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [duas, setDuas] = useState<DetailType[]>([]);

  useEffect(() => {
    if (slug) {
      getDuasByCategory(slug).then(setDuas);
    }
  }, [slug]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          color: colors.textPrimary,
          padding: 16,
        }}
      >
        {slug?.replace(/-/g, " ")}
      </Text>
      <FlatList
        data={duas}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => <DuaCard dua={item} />}
      />
    </SafeAreaView>
  );
}