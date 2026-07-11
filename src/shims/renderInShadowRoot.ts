import type { ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";

interface ShadowRootHandle {
  unmount: () => void;
}

export function renderInShadowRoot(id: string, content: ReactNode): ShadowRootHandle {
  const host = document.createElement("div");
  host.id = `expo-log-box-${id}`;
  document.body.appendChild(host);

  const shadowRoot = host.attachShadow({ mode: "open" });
  const container = document.createElement("div");
  shadowRoot.appendChild(container);

  const root: Root = createRoot(container);
  root.render(content);

  return {
    unmount: () => {
      root.unmount();
      host.remove();
    },
  };
}
