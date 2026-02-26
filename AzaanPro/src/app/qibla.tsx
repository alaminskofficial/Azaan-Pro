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
import { getAngleDifference, getQiblaDirection } from "@/utils/qibla";
import { useAppStore } from "@/store/appStore";
import { getUserLocation } from "@/services/locationServices";

export default function QiblaCompassScreen() {
  const glowAnim = useRef(new Animated.Value(0)).current;
  const [heading, setHeading] = useState(0);
  const [qibla, setQibla] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const needleRotate = useRef(new Animated.Value(0)).current;
  const dialRotate = useRef(new Animated.Value(0)).current;
  const lastAngle = useRef(0);
  const savedLocation = useAppStore((s) => s.location); // { latitude: number, longitude: number }

  /* ---------------- Location ---------------- */
  const useCurrentLocation = async () => {
    setLoading(true);
    try {
      //console.log("Fetching location...");
      alert("Fetching location... Please ensure location services are enabled and you have a good GPS signal.");
      const loc = await getUserLocation();
      //console.log("Location obtained:", loc);
     

      if (!loc) {
        setLoading(false);
        return;
      }

      const direction = getQiblaDirection(loc.latitude, loc.longitude);

      setQibla(direction);
    } catch (error) {
      console.log("Error getting location:", error);
      alert(
        "Unable to get location. Please enable location services and try again in an area with good GPS and network signal."
      );
    }
    setLoading(false);
  };
  
  useEffect(() => {
    initFromStorage();
  }, []);

  const initFromStorage = async () => {
    const saved = savedLocation;
    console.log("Saved location from store:", saved);
    if (saved) {
      const direction = getQiblaDirection(saved.latitude, saved.longitude);
      setQibla(direction);
      setLoading(false);
    } else {
      // fallback only if no saved location
      await useCurrentLocation();
    }
  };

  /* ---------------- Magnetometer ---------------- */
  useEffect(() => {
    const subscription = Magnetometer.addListener((data) => {
      let angle = Math.atan2(-data.x, data.y) * (180 / Math.PI);
      if (angle < 0) angle += 360;

      // Smooth transition
      const smooth = lastAngle.current + (angle - lastAngle.current) * 0.15;
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

  const TOLERANCE = 5; // degrees

  const isFacing =
    qibla !== null && getAngleDifference(heading, qibla) <= TOLERANCE;

  useEffect(() => {
    if (isFacing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 900,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 900,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      glowAnim.stopAnimation();
      glowAnim.setValue(0);
    }
  }, [isFacing]);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.9],
  });

  const glowScale = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.15],
  });
  const renderTicks = () => {
    const ticks = [];
    for (let i = 0; i < 360; i += 10) {
      const isMajor = i % 30 === 0;
      ticks.push(
        <View
          key={i}
          style={[
            styles.tick,
            {
              height: isMajor ? 14 : 8,
              transform: [{ rotate: `${i}deg` }],
            },
          ]}
        >
          {isMajor && <Text style={styles.degreeLabel}>{i}°</Text>}
        </View>
      );
    }
    return ticks;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qibla Direction</Text>

      {loading && qibla === null ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginVertical: 30 }}
        />
      ) : (
        <>
          <Text style={styles.info}>Heading: {Math.round(heading)}°</Text>

          <Text style={styles.info}>
            Qibla: {qibla !== null ? Math.round(qibla) : "--"}°
          </Text>

          <Text
            style={[
              styles.facing,
              { color: isFacing ? colors.success : colors.textSecondary },
            ]}
          >
            {isFacing
              ? "✔ You are Facing Qibla 🕋 "
              : "Rotate phone to align with Kaaba"}
          </Text>

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

            {/* Compass Ring */}
            {/* <Animated.View
                style={[
                  styles.dial,
                  { transform: [{ rotate: dialRotateInterpolate }] },
                ]}
              >
                {renderTicks()}

                
                <Text style={[styles.cardinal, { top: 8 }]}>N</Text>
                <Text style={[styles.cardinal, { bottom: 8 }]}>S</Text>
                <Text style={[styles.cardinal, { left: 8 }]}>W</Text>
                <Text style={[styles.cardinal, { right: 8 }]}>E</Text>
              </Animated.View> */}

            {/* Needle */}
            {/* Arrow Needle */}
            {qibla !== null && (
              <Animated.View
                style={[
                  styles.needleContainer,
                  { transform: [{ rotate: needleRotateInterpolate }] },
                ]}
              >
                {/* Arrow Head */}
                <View style={styles.arrowHead} />

                {/* Arrow Shaft */}
                <View style={styles.arrowShaft} />
              </Animated.View>
            )}
            {/* Kaaba Glow */}
            {qibla !== null && (
              <Animated.View
                style={[
                  styles.kaabaGlow,
                  {
                    opacity: glowOpacity,
                    transform: [{ scale: glowScale }],
                  },
                ]}
              >
                <Text style={styles.kaabaIcon}>🕋</Text>
              </Animated.View>
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={useCurrentLocation}>
            <Text style={styles.buttonText}>Refresh Location</Text>
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
    justifyContent: "flex-start",
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
  kaabaGlow: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(34, 197, 94, 0.25)", // soft green glow
    justifyContent: "center",
    alignItems: "center",
  },

  kaabaIcon: {
    fontSize: 34,
    color: colors.success,
  },

  needleShaft: {
    width: 4,
    height: 110,
    backgroundColor: colors.error,
    borderRadius: 2,
  },

  kaabaTip: {
    marginTop: -6,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  tick: {
    position: "absolute",
    width: 2,
    backgroundColor: colors.textPrimary,
    top: 4,
  },
  degreeLabel: {
    position: "absolute",
    top: 18,
    fontSize: 10,
    color: colors.textSecondary,
    transform: [{ rotate: "180deg" }],
  },

  cardinal: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 14,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: colors.error, // arrow color
  },

  arrowShaft: {
    width: 4,
    height: 115,
    backgroundColor: colors.error,
    borderRadius: 2,
  },
});
