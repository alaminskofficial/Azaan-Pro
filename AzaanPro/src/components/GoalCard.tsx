import { View, Text, TouchableOpacity } from "react-native";
import tailwind from "twrnc";
import { colors } from "@/theme/color";
import { Ionicons } from "@expo/vector-icons";

export default function GoalCard({ title, completed } : { title: string, completed: boolean }) {
  return (
    <View
      style={[
        tailwind`mx-4 mt-3 p-4 rounded-2xl flex-row justify-between items-center`,
        { backgroundColor: colors.info },
      ]}
    >
      <View style={tailwind`flex-row items-center gap-3`}>
        <View
          style={[
            tailwind`w-6 h-6 rounded-full border`,
            {
              borderColor: completed ? colors.success : colors.error,
              backgroundColor: completed ? colors.success : "transparent",
            },
          ]}
        />
        <Text style={{ color: colors.info }}>{title}</Text>
      </View>

      <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={18} color={colors.dhuhr} />
      </TouchableOpacity>
    </View>
  );
}