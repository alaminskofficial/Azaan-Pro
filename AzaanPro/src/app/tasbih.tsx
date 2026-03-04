import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Vibration,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import * as Haptics from "expo-haptics";
import Svg, { Circle } from "react-native-svg";
import { colors } from "@/theme/color";

const PRESETS = [33, 99, 100, 500];

export default function TasbihScreen() {
  const [count, setCount] = useState(0);
  const [loop, setLoop] = useState(0);
  const [target, setTarget] = useState(99);
  const [modalVisible, setModalVisible] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const radius = 130;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  // Animate progress
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: count / target,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [count, target]);

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Vibration.vibrate(10);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();

    if (count + 1 >= target) {
      setLoop((prev) => prev + 1);
      setCount(0);

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Vibration.vibrate(200);
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const changeTarget = (value: number) => {
    setTarget(value);
    setCount(0);
    setLoop(0);
    setModalVisible(false);
  };

  const applyCustomTarget = () => {
    const num = parseInt(customValue);
    if (!isNaN(num) && num > 0) {
      changeTarget(num);
      setCustomValue("");
    }
  };

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasbih Counter</Text>

      {/* Top Controls */}
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.smallCircle}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.smallText}>{target}</Text>
        </TouchableOpacity>

        <Text style={styles.loopText}>Loop {loop}</Text>

        <TouchableOpacity
          style={styles.smallCircle}
          onPress={() => {
            setCount(0);
            setLoop(0);
          }}
        >
          <Text style={styles.smallText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Main Circle */}
      <TouchableWithoutFeedback onPress={handlePress}>
        <Animated.View
          style={[styles.circleWrapper, { transform: [{ scale: scaleAnim }] }]}
        >
          <Svg width={280} height={280}>
            <Circle
              stroke="#1e2a4a"
              fill="none"
              cx="140"
              cy="140"
              r={radius}
              strokeWidth={strokeWidth}
            />

            <AnimatedCircle
              stroke="#4da6ff"
              fill="none"
              cx="140"
              cy="140"
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin="140,140"
            />
          </Svg>

          <View style={styles.centerContent}>
            <Text style={styles.countText}>
              {count.toString().padStart(2, "0")}
            </Text>
            <Text style={styles.tapText}>Tap to count</Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* Target Selection Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Select Target Count</Text>

            <FlatList
              data={PRESETS}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => changeTarget(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />

            <TextInput
              placeholder="Custom number"
              keyboardType="numeric"
              value={customValue}
              onChangeText={setCustomValue}
              style={styles.input}
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.applyBtn}
              onPress={applyCustomTarget}
            >
              <Text style={styles.applyText}>Apply Custom</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 20,
  },

  topRow: {
    position: "absolute",
    top: 70,
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
  },

  smallText: {
    color: colors.textPrimary,
    fontSize: 16,
  },

  loopText: {
    color: colors.textPrimary,
    fontSize: 16,
  },

  circleWrapper: {
    width: 280,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
  },

  centerContent: {
    position: "absolute",
    alignItems: "center",
  },

  countText: {
    fontSize: 70,
    color: colors.textPrimary,
    fontWeight: "200",
  },

  tapText: {
    marginTop: 10,
    color: "#bbb",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "85%",
    backgroundColor: colors.progressBg,
    padding: 20,
    borderRadius: 20,
  },

  modalTitle: {
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 15,
    textAlign: "center",
  },

  option: {
    paddingVertical: 10,
    alignItems: "center",
  },

  optionText: {
    color: colors.textSecondary,
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 12,
    padding: 10,
    marginTop: 15,
    color: colors.textPrimary,
  },

  applyBtn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.magneticWarningBg,
    borderRadius: 12,
    alignItems: "center",
  },

  applyText: {
    color: colors.textPrimary,
    fontWeight: "600",
  },

  cancelText: {
    textAlign: "center",
    marginTop: 10,
    color: colors.textSecondary,
  },
});
