import { Audio } from "expo-av";

let sound: Audio.Sound | null = null;

/* ---------------- PLAY AYAH ---------------- */
export async function playAyah(ayahNumber: number, onFinish?: () => void) {
  try {
    if (sound) {
      await sound.unloadAsync();
      sound = null;
    }

    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNumber}.mp3`,
    });

    sound = newSound;

    sound.setOnPlaybackStatusUpdate((status: any) => {
      if (status.didJustFinish) {
        onFinish?.();
      }
    });

    await sound.playAsync();
  } catch (err) {
    console.log("Play error:", err);
  }
}

/* ---------------- PAUSE AYAH ---------------- */
export async function pauseAyah() {
  try {
    if (!sound) return;

    const status = await sound.getStatusAsync();

    if (status.isLoaded && status.isPlaying) {
      await sound.pauseAsync();
    }
  } catch (err) {
    console.log("Pause error:", err);
  }
}

/* ---------------- RESUME AYAH ---------------- */
export async function resumeAyah() {
  try {
    if (!sound) return;

    const status = await sound.getStatusAsync();

    if (status.isLoaded && !status.isPlaying) {
      await sound.playAsync();
    }
  } catch (err) {
    console.log("Resume error:", err);
  }
}

/* ---------------- STOP AYAH ---------------- */
export async function stopAyah() {
  try {
    if (!sound) return;

    await sound.stopAsync();
    await sound.unloadAsync();

    sound = null;
  } catch (err) {
    console.log("Stop error:", err);
  }
}
