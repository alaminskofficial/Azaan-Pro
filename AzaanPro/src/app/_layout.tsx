import { Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Audio } from "expo-av";
export default function RootLayout() {
  const MyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: "white",
    },
  };
  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: false,
    playsInSilentModeIOS: true,
  });

  return (
    <ThemeProvider value={MyTheme}>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </ThemeProvider>
  );
}
