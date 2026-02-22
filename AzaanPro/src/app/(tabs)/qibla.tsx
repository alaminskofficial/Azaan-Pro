import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Magnetometer } from "expo-sensors";
import { useAppStore } from "@/store/appStore";
import { getQiblaDirection } from "@/utils/qibla";

export default function QiblaScreen() {
  const location = useAppStore((s) => s.location);

  const [heading, setHeading] = useState(0);
  const [qibla, setQibla] = useState(0);

  useEffect(() => {
    if (!location) return;

    const direction = getQiblaDirection(location.latitude, location.longitude);
    setQibla(direction);

    const sub = Magnetometer.addListener((data) => {
      const angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
      setHeading(angle);
    });

    Magnetometer.setUpdateInterval(500);

    return () => sub.remove();
  }, [location]);

  const rotate = qibla - heading;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qibla Direction</Text>

      <View
        style={[styles.compass, { transform: [{ rotate: `${rotate}deg` }] } , { backgroundColor: "rgba(255, 255, 255, 0.2)" }]}
      >
        <Text style={styles.arrow}>↑</Text>
      </View>

      <Text style ={styles.color}>Rotate your phone to align the arrow</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 22, marginBottom: 20, color: "white" },
  color: { color: "white" },
  compass: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    fontSize: 40,
  },
});
