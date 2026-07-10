import { VideoView, useVideoPlayer } from "expo-video";
import { StyleSheet } from "react-native";

interface AppVideoPlayerProps {
  uri: string;
}

export function AppVideoPlayer({ uri }: AppVideoPlayerProps) {
  const player = useVideoPlayer(uri, (videoPlayer) => {
    videoPlayer.loop = false;
    videoPlayer.play();
  });

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
