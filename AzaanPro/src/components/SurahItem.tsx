import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SurahItem({ surah }: any) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/surah/[id]",
          params: {
            id: surah.number,
            name: surah.englishName,
            arabicName: surah.name,
            revelationType: surah.revelationType,
            ayahs: surah.numberOfAyahs,
          },
        })
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: "#eee",
        backgroundColor: "white",
      }}
    >
      {/* LEFT SIDE */}
      <View style={{ flexDirection: "row", alignItems: "center", flex: 2 }}>
        {/* Surah Number */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            borderWidth: 2,
            borderColor: "#D4AF37",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 14,
          }}
        >
          <Text style={{ fontWeight: "600" }}>{surah.number}</Text>
        </View>

        {/* English Info */}
        <View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: "#1c4d2b",
            }}
          >
            {surah.englishName}
          </Text>

          <Text style={{ color: "#666", fontSize: 13 }}>
            {surah.englishNameTranslation} • {surah.numberOfAyahs} Ayahs
          </Text>
        </View>
      </View>

      {/* ARABIC NAME */}
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            color: "#1c4d2b",
            fontWeight: "600",
          }}
        >
          {surah.name}
        </Text>
      </View>

      {/* RIGHT SIDE */}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {surah.revelationType === "Meccan" ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                marginLeft: 6,
                fontSize: 13,
                fontWeight: "600",
                color: "#1c4d2b",
              }}
            >
              🕋 Makki
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons name="mosque" size={18} color="#1c4d2b" />
            <Text
              style={{
                marginLeft: 6,
                fontSize: 13,
                fontWeight: "600",
                color: "#1c4d2b",
              }}
            >
              Madni
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
