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
  return createElement("video", {
    autoPlay: true,
    controls: true,
    muted: true,
    playsInline: true,
    preload: "auto",
    src: uri,
    style: playerStyle,
  });
}
