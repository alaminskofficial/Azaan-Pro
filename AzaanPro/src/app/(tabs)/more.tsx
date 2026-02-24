import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/theme/color";
import { Ionicons } from "@expo/vector-icons";

const features = [
  {
    name: "Qibla",
    icon: "navigate",
    route: "/qibla",
  },
  {
    name: "Tasbih",
    icon: "repeat",
    route: "/tasbih",
  },
  {
    name: "Hijri Calendar",
    icon: "calendar",
    route: "/calendar",
  },
  {
    name: "Names of Allah",
    icon: "star",
    route: "/names",
  },
  //   {
  //     name: "Gallery",
  //     icon: "images",
  //     route: "/gallery",
  //   },
  // {
  //   name: "Hajj Guide",
  //   icon: "location",
  //   route: "/hajj",
  // },
  // {
  //   name: "Umrah Guide",
  //   icon: "airplane",
  //   route: "/umrah",
  // },
  {
    name: "Settings",
    icon: "settings",
    route: "/settings",
  },
  {
    name: "Compass",
    icon: "compass",
    route: "/compass",
  },
  // {
  //   name: "Help",
  //   icon: "help-circle",
  //   route: "/help",
  // },
];

export default function MoreScreen() {
  const router = useRouter();

  return (
    <FlatList
      data={features}
      numColumns={3}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push(item.route)}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name={item.icon as any}
              size={28}
              color={colors.primary}
            />
          </View>

          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },

  item: {
    flex: 1,
    alignItems: "center",
    marginVertical: 15,
  },

  iconContainer: {
    width: 65,
    height: 65,
    borderRadius: 18,
    backgroundColor: colors.primary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  text: {
    fontSize: 12,
    textAlign: "center",
    color: colors.textPrimary,
    fontWeight: "500",
  },
});
