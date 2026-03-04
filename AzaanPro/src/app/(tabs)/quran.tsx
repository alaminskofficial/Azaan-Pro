import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

interface Props {
  navigation: any;
}

export default function QuranScreen({ navigation }: Props) {
  const [surahs, setSurahs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => {
        setSurahs(data.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={surahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.surahCard}
            onPress={() => router.push(`/surah/${item.number}`)}
          >
            <Text style={styles.number}>{item.number}</Text>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.englishName}</Text>
              <Text style={styles.sub}>{item.englishNameTranslation}</Text>
            </View>

            <Text style={styles.arabicName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1630",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  surahCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 0.5,
    borderColor: "#1e2a4a",
  },

  number: {
    color: "#4da6ff",
    fontSize: 18,
    width: 40,
  },

  name: {
    color: "#fff",
    fontSize: 16,
  },

  sub: {
    color: "#aaa",
    fontSize: 13,
  },

  arabicName: {
    color: "#fff",
    fontSize: 18,
  },
});
