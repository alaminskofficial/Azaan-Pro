import React from "react";
import { View, Text } from "react-native";
import tailwind from "twrnc";
import { Ionicons } from "@expo/vector-icons";

export default function SurahHeader({
  id,
  name,
  arabicName,
  revelationType,
  ayahs,
}: any) {
  const isMeccan = revelationType === "Meccan";

  return (
    <View
      style={tailwind`bg-green-900 px-6 py-5 mt-5 flex-row items-center justify-between`}
    >
      {/* LEFT SIDE */}
      <View>
        {/* English Name */}
        <Text style={tailwind`text-white text-xl font-bold`}>
          {name} ({id})
        </Text>

        {/* Info Row */}
        <View style={tailwind`flex-row items-center mt-1`}>
          <Ionicons
            name={isMeccan ? "cube" : "business"}
            size={16}
            color="white"
          />

          <Text style={tailwind`text-white ml-2`}>
            {revelationType}
          </Text>

          <Text style={tailwind`text-white mx-2`}>•</Text>

          <Text style={tailwind`text-white`}>
            {ayahs} Ayahs
          </Text>
        </View>
      </View>

      {/* RIGHT SIDE (Arabic Name) */}
      <Text
        style={[
          tailwind`text-white text-3xl`,
          { fontFamily: "kfgqpc" },
        ]}
      >
        {arabicName}
      </Text>
    </View>
  );
}