import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { HisnText } from "@/utils/hisn";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { colors } from "@/theme/color";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  item: HisnText;
};

export const HisnDuaCard = ({ item }: Props) => {
  const { toggle, playingId } = useAudioPlayer();

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 18,
        padding: 16,
        marginBottom: 18,
      }}
    >
      {/* Arabic */}
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 22,
          lineHeight: 38,
          textAlign: "right",
          marginBottom: 10,
        }}
      >
        {item.ARABIC_TEXT}
      </Text>

      {/* Instruction */}
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 13,
          marginBottom: 8,
        }}
      >
        {item.LANGUAGE_ARABIC_TRANSLATED_TEXT}
      </Text>

      {/* Translation */}
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 14,
          lineHeight: 22,
          marginBottom: 12,
        }}
      >
        {item.TRANSLATED_TEXT}
      </Text>

      {/* Footer */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Repeat */}
        <Text
          style={{
            color: colors.primary,
            fontSize: 12,
          }}
        >
          Repeat: {item.REPEAT} times
        </Text>

        {/* Audio */}
        {item.AUDIO && (
          <TouchableOpacity
            onPress={() => toggle(item.ID, item.AUDIO)}
            style={{
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 30,
            }}
          >
            <Ionicons
              name={playingId === item.ID ? "pause" : "play"}
              size={22}
              color={colors.textPrimary}
            />
            <Text style={{ color: colors.textPrimary }}>
              {playingId === item.ID ? "Pause" : "Play"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
