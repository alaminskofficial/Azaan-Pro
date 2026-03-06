import { Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useFonts } from "expo-font";

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
   const [fontLoaded] = useFonts({
    kfgqpc: require("../../assets/fonts/kfgqpcttf.ttf"),
  });

  return (
    <ThemeProvider value={MyTheme}>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </ThemeProvider>
  );
}
