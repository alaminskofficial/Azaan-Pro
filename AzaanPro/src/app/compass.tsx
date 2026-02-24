import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Magnetometer } from "expo-sensors";
import { colors } from "@/theme/color";

export default function CompassScreen() {
  const [heading, setHeading] = useState(0);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const lastAngle = useRef(0);

  useEffect(() => {
    Magnetometer.setUpdateInterval(100);

    const subscription = Magnetometer.addListener((data) => {
      const angle = calculateHeading(data);

      // Smooth the angle (important for stability)
      const smooth =
        lastAngle.current + (angle - lastAngle.current) * 0.2;
      lastAngle.current = smooth;

      setHeading(smooth);

      Animated.timing(rotateAnim, {
        toValue: -smooth,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });

    return () => subscription.remove();
  }, []);

  /* -------- Correct Heading Calculation -------- */
  const calculateHeading = (data: any) => {
    let { x, y } = data;

    // Axis correction for Android (fixes West/North issue)
    let angle = Math.atan2(-x, y) * (180 / Math.PI);

    if (angle < 0) angle += 360;

    return angle;
  };

  /* -------- Direction Text -------- */
  const getDirection = (deg: number) => {
    if (deg >= 337.5 || deg < 22.5) return "N";
    if (deg < 67.5) return "NE";
    if (deg < 112.5) return "E";
    if (deg < 157.5) return "SE";
    if (deg < 202.5) return "S";
    if (deg < 247.5) return "SW";
    if (deg < 292.5) return "W";
    return "NW";
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [-360, 360],
    outputRange: ["-360deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compass</Text>

      <Text style={styles.degree}>
        {Math.round(heading)}°
      </Text>

      <Text style={styles.direction}>
        {getDirection(heading)}
      </Text>

      <View style={styles.wrapper}>
        {/* Rotating Dial */}
        <Animated.View
          style={[styles.dial, { transform: [{ rotate }] }]}
        >
          <Text style={[styles.label, { top: 10 }]}>N</Text>
          <Text style={[styles.label, { bottom: 10 }]}>S</Text>
          <Text style={[styles.label, { right: 10 }]}>E</Text>
          <Text style={[styles.label, { left: 10 }]}>W</Text>
        </Animated.View>

        {/* Fixed Needle */}
        <View style={styles.needle} />
      </View>

      <Text style={styles.calibrate}>
        Move phone in 8 shape to calibrate. Keep device flat.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    marginBottom: 10,
  },
  degree: {
    fontSize: 28,
    color: "white",
    fontWeight: "600",
  },
  direction: {
    fontSize: 22,
    color: "#4CAF50",
    marginBottom: 20,
  },
  wrapper: {
    width: 260,
    height: 260,
    justifyContent: "center",
    alignItems: "center",
  },
  dial: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 4,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    position: "absolute",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  needle: {
    width: 4,
    height: 120,
    backgroundColor: "red",
    borderRadius: 2,
  },
  calibrate: {
    marginTop: 20,
    color: "orange",
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});