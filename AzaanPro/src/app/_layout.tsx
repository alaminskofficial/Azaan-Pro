import { Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
export default function RootLayout() {
  const MyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: "white",
    },
  };
  return (
    <ThemeProvider value={MyTheme}>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </ThemeProvider>
  );
}
