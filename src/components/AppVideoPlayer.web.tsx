import { createElement } from "react";
import type { CSSProperties } from "react";

interface AppVideoPlayerProps {
  uri: string;
}

const playerStyle: CSSProperties = {
  backgroundColor: "#000",
  display: "block",
  height: 220,
  width: "100%",
};

export function AppVideoPlayer({ uri }: AppVideoPlayerProps) {
  console.log("[video:web] player rendered", { uri });

  return createElement("video", {
    autoPlay: false,
    controls: true,
    muted: false,
    playsInline: true,
    preload: "auto",
    src: uri,
    style: playerStyle,
    onLoadStart: () => console.log("[video:web] load started", { uri }),
    onCanPlay: () => console.log("[video:web] can play", { uri }),
    onPlay: () => console.log("[video:web] playback started", { uri }),
    onError: (event: { currentTarget?: { error?: unknown } }) =>
      console.error("[video:web] playback error", { uri, error: event.currentTarget?.error }),
  });
}
