import { Audio } from "expo-av";

let sound: Audio.Sound | null = null;

export async function playAyah(
  ayahNumber: number,
  onFinish?: () => void
) {
  if (sound) {
    await sound.unloadAsync();
  }

  const { sound: newSound } = await Audio.Sound.createAsync(
    {
      uri: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNumber}.mp3`,
    },
    { shouldPlay: true }
  );

  sound = newSound;

  sound.setOnPlaybackStatusUpdate((status) => {
    if ((status as any).didJustFinish) {
      onFinish?.();
    }
  });
}

export async function stopAudio() {
  if (sound) {
    await sound.stopAsync();
    await sound.unloadAsync();
    sound = null;
  }
}