import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveGoals = async (goals:any) => {
  await AsyncStorage.setItem("goals", JSON.stringify(goals));
};

export const loadGoals = async () => {
  const data = await AsyncStorage.getItem("goals");
  return data ? JSON.parse(data) : [];
};