import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { getCategories } from "@/services/duaServices";
import { CategoryType } from "@/utils/dua";
import { colors } from "@/theme/color";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

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
        Dhikr & Duas
      </Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push(`/duas/${item.slug}`)
            }
            style={{
              backgroundColor: colors.surface,
              padding: 16,
              borderRadius: 14,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: colors.primary,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}