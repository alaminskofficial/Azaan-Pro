import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tailwind from "twrnc";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function AyahCard({
  ayah,
  ayahNumber,
  translation,
  width,
  isActive, // bg color change
  play,
  stop,
  bookmark,
  showTranslation,
}: any) {
  return (
    <View style={tailwind`bg-[#f4f1e8] mb-3`}>
      {/* Arabic Section */}
      <View style={tailwind`px-5 py-6`}>
        <View style={tailwind`flex-row justify-between items-start`}>
          {/* Ayah Number */}
          <View
            style={tailwind`border-2 border-green-700 w-8 h-8 rounded-full items-center justify-center`}
          >
            <Text style={tailwind`text-green-700 font-bold`}>{ayahNumber}</Text>
          </View>

          {/* Arabic Text */}
          <Text
            style={[
              tailwind`text-right text-3xl text-green-900 flex-1 ml-4`,
              { fontFamily: "kfgqpc" },
            ]}
          >
            {ayah.text}
          </Text>
        </View>

        {/* Actions */}
        <View style={tailwind`flex-row justify-end gap-10 mt-5`}>
          {ayah.sajda && (
            <View style={tailwind`flex-row`}>
              <FontAwesome5
                name="pray"
                size={15}
                color="#1f6f43"
                style={tailwind`mr-4`}
              />
              <Text style={tailwind`text-green-700 text-sm font-semibold`}>
                Sajda
              </Text>
            </View>
          )}

          {/* Play Button */}
          <TouchableOpacity
            onPress={play}
            style={tailwind`bg-green-700 w-8 h-8 rounded-full items-center justify-center`}
          >
            <Ionicons name={"play"} size={15} color="white" />
          </TouchableOpacity>

          {/* Stop  Button */}
          <TouchableOpacity
            onPress={stop}
            style={tailwind`bg-green-700 w-8 h-8 rounded-full items-center justify-center`}
          >
            <Ionicons name={"stop"} size={15} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Translation Section */}
      {translation && showTranslation && (
        <View style={tailwind`bg-gray-100 px-5 py-3`}>
          <Text style={tailwind`text-gray-700 text-base`}>
            {translation.text}
          </Text>
        </View>
      )}
    </View>
  );
}
