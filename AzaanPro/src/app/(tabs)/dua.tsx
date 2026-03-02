import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { getCategories } from "@/services/duaServices";
import { CategoryType } from "@/utils/dua";
import { HisnData } from "@/utils/hisn";
import hisn from "@/data/husn_en.json";
import { colors } from "@/theme/color";

type TabType = "dua" | "hisn";

export default function HomeScreen() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>("dua"); // default
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const hisnData = hisn as HisnData;

  /* ---------------- Render Tabs ---------------- */
  const renderTabs = () => (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.surface,
        marginHorizontal: 16,
        borderRadius: 14,
        padding: 4,
      }}
    >
      <TabButton
        title="Dhikr & Duas"
        active={activeTab === "dua"}
        onPress={() => setActiveTab("dua")}
      />
      <TabButton
        title="Hisn Al-Muslim"
        active={activeTab === "hisn"}
        onPress={() => setActiveTab("hisn")}
      />
    </View>
  );

  /* ---------------- Dua List ---------------- */
  const renderDuaList = () => (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.slug}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => router.push(`/duas/${item.slug}`)}
          style={cardStyle}
        >
          <Text style={cardText}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );

  /* ---------------- Hisn List ---------------- */
  const renderHisnList = () => (
    <FlatList
      data={hisnData.English}
      keyExtractor={(item) => item.ID.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => router.push(`/hisn/${item.ID}`)}
          style={cardStyle}
        >
          <Text style={cardText}>{item.TITLE}</Text>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Tabs */}
      {renderTabs()}

      {/* Content */}
      <View style={{ flex: 1 }}>
        {activeTab === "dua" ? renderDuaList() : renderHisnList()}
      </View>
    </SafeAreaView>
  );
}

/* ---------------- Tab Button ---------------- */

function TabButton({
  title,
  active,
  onPress,
}: {
  title: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: active ? colors.primary : "transparent",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "600",
          color: active ? "#fff" : colors.textSecondary,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

/* ---------------- Shared Styles ---------------- */

const cardStyle = {
  backgroundColor: colors.surface,
  padding: 16,
  borderRadius: 14,
  marginBottom: 12,
};

const cardText = {
  fontSize: 16,
  fontWeight: "500" as const,
  color: colors.primary,
};
