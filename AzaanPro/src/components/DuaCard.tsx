import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DetailType } from "@/utils/dua";
import { colors } from "@/theme/color";

type Props = {
  dua: DetailType;
};

export const DuaCard = ({ dua }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
      }}
    >
      {/* Title */}
      <Text
        style={{
          color: colors.primary,
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 10,
        }}
      >
        {dua.title}
      </Text>

      {/* Arabic */}
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 22,
          lineHeight: 36,
          textAlign: "right",
          marginBottom: 12,
        }}
      >
        {dua.arabic}
      </Text>

      {/* Latin */}
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 14,
          fontStyle: "italic",
          marginBottom: 8,
        }}
      >
        {dua.latin}
      </Text>

      {/* Translation */}
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 14,
          marginBottom: 10,
        }}
      >
        {dua.translation}
      </Text>

      {/* Expand */}
      {(dua.benefits || dua.notes) && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text
            style={{
              color: colors.primary,
              fontSize: 13,
              marginTop: 6,
            }}
          >
            {expanded ? "Hide details" : "Show Details"}
          </Text>
        </TouchableOpacity>
      )}

      {expanded && (
        <View style={{ marginTop: 10 }}>
          {dua.benefits && (
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 13,
                marginBottom: 6,
              }}
            >
              🌿 {dua.benefits}
            </Text>
          )}

          {dua.notes && (
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 13,
              }}
            >
              📖 {dua.notes}
            </Text>
          )}

          {dua.source && (
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 12,
                marginTop: 6,
              }}
            >
              Source: {dua.source}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};