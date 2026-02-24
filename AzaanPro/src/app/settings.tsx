import { View, Text, Button } from "react-native";
import { useAppStore } from "@/store/appStore";

export default function Settings() {
  const setMethod = useAppStore((s) => s.setMethod);
  const setMadhab = useAppStore((s) => s.setMadhab);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginTop: 20, color: "white", textAlign: "center" }}>
        Calculation Method
      </Text>
      <Button title="Karachi" onPress={() => setMethod(1)} />
      <Button title="Umm al-Qura" onPress={() => setMethod(4)} />

      <Text style={{ marginTop: 20, color: "white", textAlign: "center" }}>
        Madhab
      </Text>
      <Button title="Hanafi" onPress={() => setMadhab("hanafi")} />
      <Button title="Shafi" onPress={() => setMadhab("shafi")} />
    </View>
  );
}
