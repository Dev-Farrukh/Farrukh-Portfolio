"use client";

import { useEffect, useState } from "react";

export function usePalette() {
  const [palette, setPalette] = useState("iris");

  useEffect(() => {
    const root = document.documentElement;
    if (palette === "iris") {
      root.removeAttribute("data-palette");
    } else {
      root.dataset.palette = palette;
    }
  }, [palette]);

  return { palette, setPalette };
}