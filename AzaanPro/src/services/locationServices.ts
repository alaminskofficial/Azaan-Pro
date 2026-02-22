import * as Location from "expo-location";

export const getUserLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") return null;

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  const reverse = await Location.reverseGeocodeAsync(position.coords);

  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    city: reverse[0]?.city || reverse[0]?.region || "Unknown",
  };
};