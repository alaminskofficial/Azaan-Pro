import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { colors } from "@/theme/color";
import { useAsmaUlHusna } from "@/hooks/useAsmaUlHusna";

export default function NamesScreen() {
  const { names, loading, error } = useAsmaUlHusna();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading Asma-ul-Husna…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.numberPill}>
        <Text style={styles.number}>{item.number}</Text>
      </View>

      <Text style={styles.arabic}>{item.name}</Text>
      <Text style={styles.transliteration}>{item.transliteration}</Text>
      <Text style={styles.meaning}>{item.en.meaning}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Asma-ul-Husna</Text>
        <Text style={styles.headerSubtitle}>
          The 99 Beautiful Names of Allah
        </Text>
      </View>
      <FlatList
        data={names}
        keyExtractor={(item) => String(item.number)}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
  },

  list: {
    paddingVertical: 16,
  },

  row: {
    justifyContent: "space-between",
  },

  card: {
    backgroundColor: colors.surface,
    width: "48%",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  numberPill: {
    alignSelf: "flex-start",
    backgroundColor: colors.headingPillBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },

  number: {
    color: colors.primaryLight,
    fontSize: 12,
    fontWeight: "600",
  },

  arabic: {
    fontSize: 26,
    textAlign: "center",
    color: colors.textPrimary,
    marginBottom: 6,
    fontWeight: "600",
  },

  transliteration: {
    fontSize: 14,
    textAlign: "center",
    color: colors.textSecondary,
    marginBottom: 6,
  },

  meaning: {
    fontSize: 13,
    textAlign: "center",
    color: colors.textMuted,
  },

  center: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: colors.textSecondary,
  },

  errorText: {
    color: colors.error,
    fontSize: 16,
  },
  header: {
    paddingTop: 30,
    paddingBottom: 16,
    alignItems: "center",
    backgroundColor: colors.background,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },

  headerSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: colors.textSecondary,
    letterSpacing: 0.3,
  },
});
