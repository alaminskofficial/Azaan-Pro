import { Audio } from "expo-av";
import { useRef, useState } from "react";

export function useAudioPlayer() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const play = async (id: number, uri: string) => {
    try {
      // Stop previous sound
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );

      soundRef.current = sound;
      setPlayingId(id);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;

        if (status.didJustFinish) {
          stop();
        }
      });
    } catch (e) {
      console.log("Audio play error", e);
    }
  };

  const stop = async () => {
    if (!soundRef.current) return;

    await soundRef.current.stopAsync();
    await soundRef.current.unloadAsync();
    soundRef.current = null;
    setPlayingId(null);
  };

  const toggle = async (id: number, uri: string) => {
    if (playingId === id) {
      await stop();
    } else {
      await play(id, uri);
    }
  };

  return {
    toggle,
    stop,
    playingId,
  };
}