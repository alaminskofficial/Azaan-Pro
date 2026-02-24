import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { Magnetometer } from "expo-sensors";
import { useAppStore } from "@/store/appStore";
import { colors } from "@/theme/color";

export default function QiblaScreen() {
  const storeLocation = useAppStore((s) => s.location);

  const [location, setLocation] = useState(storeLocation);
  const [qibla, setQibla] = useState<number | null>(null);
  const [heading, setHeading] = useState(0);
  const [loading, setLoading] = useState(false);
  const [calibrate, setCalibrate] = useState(false);

  const needleRotate = useRef(new Animated.Value(0)).current;

  /* ---------------- Fetch Qibla ---------------- */
  const fetchQibla = async (lat: number, lng: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.aladhan.com/v1/qibla/${lat}/${lng}`
      );
      const json = await res.json();
      setQibla(json.data.direction);
    } catch (e) {
      console.log("Qibla error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchQibla(location.latitude, location.longitude);
    }
  }, [location]);

  /* ---------------- Use Current Location ---------------- */
  const useCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  /* ---------------- Compass Sensor ---------------- */
  useEffect(() => {
    const sub = Magnetometer.addListener((data) => {
      let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
      angle = angle >= 0 ? angle : angle + 360;

      setHeading(angle);

      if (data.x === 0 && data.y === 0) {
        setCalibrate(true);
      } else {
        setCalibrate(false);
      }
    });

    Magnetometer.setUpdateInterval(150);
    return () => sub.remove();
  }, []);

  /* ---------------- Needle Animation ---------------- */
  useEffect(() => {
    if (qibla === null) return;

    // normalize angle between -180 and 180 (prevents long rotation)
    let direction = qibla - heading;
    direction = ((direction + 540) % 360) - 180;

    Animated.timing(needleRotate, {
      toValue: direction,
      duration: 120,
      useNativeDriver: true,
    }).start();
  }, [heading, qibla]);

  const rotateInterpolate = needleRotate.interpolate({
    inputRange: [-180, 180],
    outputRange: ["-180deg", "180deg"],
  });

  const isFacing =
  qibla !== null &&
  Math.abs(((heading - qibla + 540) % 360) - 180) < 5; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qibla Finder</Text>

      {loading || qibla === null ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <View style={styles.compassContainer}>
          {/* Compass Circle */}
          {/* Static N, S, E, W labels  we will update it with image later*/}
          <View style={styles.compassCircle}>
            <Text style={styles.north}>N</Text>
            <Text style={styles.south}>S</Text>
            <Text style={styles.east}>E</Text>
            <Text style={styles.west}>W</Text>

            {/* Needle */}
            <Animated.View
              style={[
                styles.needleContainer,
                { transform: [{ rotate: rotateInterpolate }] },
              ]}
            >
              <View style={styles.needle} />
              <View style={styles.arrowHead} />
            </Animated.View>
          </View>
        </View>
      )}

      <Text style={styles.info}>
        Heading: {Math.round(heading)}°
      </Text>

      <Text style={styles.info}>
        Qibla: {qibla ? Math.round(qibla) : "--"}°
      </Text>

      {calibrate && (
        <Text style={styles.calibrate}>
          Move phone in 8 shape to calibrate compass
        </Text>
      )}
      {isFacing && (
        <Text style={styles.facing}>
          ✔ You are facing Qibla
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={useCurrentLocation}>
        <Text style={styles.buttonText}>
          Use Current Location
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 22,
    color: colors.textPrimary,
    marginBottom: 20,
    fontWeight: "600",
  },

  compassContainer: {
    width: 280,
    height: 280,
    alignItems: "center",
    justifyContent: "center",
  },

  compassCircle: {
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 4,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  needleContainer: {
    position: "absolute",
    alignItems: "center",
  },

  needle: {
    width: 4,
    height: 110,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },

  arrowHead: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: colors.primary,
    marginTop: -5,
  },

  north: {
    position: "absolute",
    top: 10,
    fontWeight: "bold",
    color: colors.primary,
  },

  south: {
    position: "absolute",
    bottom: 10,
    fontWeight: "bold",
    color: colors.primary,
  },

  east: {
    position: "absolute",
    right: 10,
    fontWeight: "bold",
    color: colors.primary,
  },

  west: {
    position: "absolute",
    left: 10,
    fontWeight: "bold",
    color: colors.primary,
  },

  info: {
    color: colors.textSecondary,
    marginTop: 8,
    fontSize: 15,
  },

  calibrate: {
    marginTop: 10,
    color: colors.warning,
    fontSize: 13,
  },

  button: {
    marginTop: 30,
    backgroundColor: colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: colors.textPrimary,
    fontWeight: "600",
  },
  facing: {
    marginTop: 10,
    color: colors.success,
    fontWeight: "600",
  },
});