
import React from "react";
import { FlatList, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import hisn from "@/data/husn_en.json";
import { HisnData } from "@/utils/hisn";
import { HisnDuaCard } from "@/components/HisnDuaCard";
import { colors } from "@/theme/color";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HisnCategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data = hisn as HisnData;

  const category = data.English.find(
    (c) => c.ID === Number(id)
  );

  if (!category) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 20,
          fontWeight: "600",
          padding: 20,
        }}
      >
        {category.TITLE}
      </Text>

      <FlatList
        data={category.TEXT}
        keyExtractor={(item) => item.ID.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => <HisnDuaCard item={item} />}
      />
    </SafeAreaView>
  );
}