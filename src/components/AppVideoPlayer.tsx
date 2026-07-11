import { VideoView, useVideoPlayer } from "expo-video";
import { StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

const FALLBACK_VIDEO =
  "https://media.w3.org/2010/05/bunny/trailer.mp4";

interface AppVideoPlayerProps {
  uri: string;
}

export function AppVideoPlayer({ uri }: AppVideoPlayerProps) {
  const player = useVideoPlayer(uri, (videoPlayer) => {
    console.log("[video] player created", { uri });
    videoPlayer.loop = false;
    videoPlayer.muted = false;
    videoPlayer.volume = 1;
    videoPlayer.play();
  });
  const fallbackUsedRef = useRef(false);

  useEffect(() => {
    fallbackUsedRef.current = false;
    const subscription = player.addListener("statusChange", ({ status, error }) => {
      console.log("[video] status change", { uri, status, error });

      if (status !== "error" || fallbackUsedRef.current || uri === FALLBACK_VIDEO) {
        return;
      }

      fallbackUsedRef.current = true;
      console.warn("[video] source failed, trying fallback", { uri, fallback: FALLBACK_VIDEO });
      void player
        .replaceAsync(FALLBACK_VIDEO)
        .then(() => player.play())
        .catch(() => {
          // Keep the native controls available if the fallback also fails.
        });
    });

    return () => subscription.remove();
  }, [player, uri]);

  return (
    <VideoView
      player={player}
      nativeControls
      contentFit="contain"
      fullscreenOptions={{ enable: true }}
      allowsPictureInPicture
      style={styles.player}
    />
  );
}

const styles = StyleSheet.create({
  player: {
    width: "100%",
    height: 220,
  },
});
