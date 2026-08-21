"use client";

import { useEffect } from "react";
import { usePalette } from "@/hooks/usePalette";

export function PaletteFavicon() {
  const { palette } = usePalette();

  useEffect(() => {
    const href = `/favicon/${palette}.png`;
    let icon = document.querySelector<HTMLLinkElement>('link[data-palette-favicon="true"]');

    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      icon.dataset.paletteFavicon = "true";
      document.head.appendChild(icon);
    }

    icon.type = "image/png";
    icon.href = href;
  }, [palette]);

  return null;
}
