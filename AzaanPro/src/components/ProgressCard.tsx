import { View, Text } from "react-native";
import tailwind from "twrnc";
import { colors } from "@/theme/color";

export default function ProgressCard() {
  return (
    <View
      style={[
        tailwind`mx-4 mt-4 p-4 rounded-2xl`,
        { backgroundColor: colors.info },
      ]}
    >
      <Text style={[tailwind`text-base font-semibold`, { color: colors.notificationBg }]}>
        Today's Progress
      </Text>

      <View style={tailwind`h-2 bg-gray-700 rounded-full mt-3`}>
        <View
          style={[
            tailwind`h-2 rounded-full`,
            { width: "50%", backgroundColor: colors.primary },
          ]}
        />
      </View>

      <Text style={[tailwind`mt-2 text-sm`, { color: colors.info }]}>
        4/8 Goals Completed
      </Text>
    </View>
  );
}