import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { Magnetometer } from "expo-sensors";
import { colors } from "@/theme/color";

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

/* ---------------- Qibla Calculation ---------------- */
const getQiblaDirection = (userLat: number, userLng: number) => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const dLng = toRad(KAABA_LNG - userLng);

  const y = Math.sin(dLng) * Math.cos(toRad(KAABA_LAT));
  const x =
    Math.cos(toRad(userLat)) * Math.sin(toRad(KAABA_LAT)) -
    Math.sin(toRad(userLat)) *
      Math.cos(toRad(KAABA_LAT)) *
      Math.cos(dLng);

  const bearing = toDeg(Math.atan2(y, x));
  return (bearing + 360) % 360;
};

export default function QiblaCompassScreen() {
  const [heading, setHeading] = useState(0);
  const [qibla, setQibla] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const needleRotate = useRef(new Animated.Value(0)).current;
  const dialRotate = useRef(new Animated.Value(0)).current;
  const lastAngle = useRef(0);

  /* ---------------- Location ---------------- */
  const useCurrentLocation = async () => {
    setLoading(true);

    const { status } =
      await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLoading(false);
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const direction = getQiblaDirection(
      loc.coords.latitude,
      loc.coords.longitude
    );

    setQibla(direction);
    setLoading(false);
  };

  useEffect(() => {
    useCurrentLocation();
  }, []);

  /* ---------------- Magnetometer ---------------- */
  useEffect(() => {
    const subscription = Magnetometer.addListener((data) => {
      let angle = Math.atan2(-data.x, data.y) * (180 / Math.PI);
      if (angle < 0) angle += 360;

      // Smooth transition
      const smooth =
        lastAngle.current +
        (angle - lastAngle.current) * 0.15;
      lastAngle.current = smooth;

      setHeading(smooth);

      // Rotate Dial (real compass behavior)
      Animated.timing(dialRotate, {
        toValue: -smooth,
        duration: 80,
        useNativeDriver: true,
      }).start();

      // Rotate Needle toward Qibla
      if (qibla !== null) {
        let direction = qibla - smooth;
        direction = ((direction + 540) % 360) - 180;

        Animated.timing(needleRotate, {
          toValue: direction,
          duration: 80,
          useNativeDriver: true,
        }).start();
      }
    });

    Magnetometer.setUpdateInterval(120);
    return () => subscription.remove();
  }, [qibla]);

  const dialRotateInterpolate = dialRotate.interpolate({
    inputRange: [-360, 360],
    outputRange: ["-360deg", "360deg"],
  });

  const needleRotateInterpolate = needleRotate.interpolate({
    inputRange: [-180, 180],
    outputRange: ["-180deg", "180deg"],
  });

  const isFacing =
    qibla !== null &&
    Math.abs(((heading - qibla + 540) % 360) - 180) < 5;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qibla Direction</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginVertical: 30 }}
        />
      ) : (
        <>
          <Text style={styles.info}>
            Heading: {Math.round(heading)}°
          </Text>

          <Text style={styles.info}>
            Qibla: {qibla !== null ? Math.round(qibla) : "--"}°
          </Text>

          {isFacing && (
            <Text style={styles.facing}>
              ✔ You are facing Qibla
            </Text>
          )}

          {/* Compass */}
          <View style={styles.wrapper}>
            {/* Rotating Dial */}
            <Animated.View
              style={[
                styles.dial,
                { transform: [{ rotate: dialRotateInterpolate }] },
              ]}
            >
              <Text style={[styles.label, { top: 15 }]}>N</Text>
              <Text style={[styles.label, { bottom: 15 }]}>S</Text>
              <Text style={[styles.label, { left: 15 }]}>W</Text>
              <Text style={[styles.label, { right: 15 }]}>E</Text>
            </Animated.View>

            {/* Needle */}
            {qibla !== null && (
              <Animated.View
                style={[
                  styles.needleContainer,
                  {
                    transform: [
                      { rotate: needleRotateInterpolate },
                    ],
                  },
                ]}
              >
                <View style={styles.needle} />
              </Animated.View>
            )}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={useCurrentLocation}
          >
            <Text style={styles.buttonText}>
              Refresh Location
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 10,
  },

  info: {
    fontSize: 16,
    color: colors.textPrimary,
    marginTop: 4,
  },

  facing: {
    marginTop: 10,
    color: colors.success,
    fontWeight: "600",
  },

  wrapper: {
    width: 280,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },

  dial: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 3,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },

  needleContainer: {
    position: "absolute",
    alignItems: "center",
  },

  needle: {
    width: 4,
    height: 130,
    backgroundColor: colors.error,
    borderRadius: 2,
  },

  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: colors.textPrimary,
    fontWeight: "600",
  },
});