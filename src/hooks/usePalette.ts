"use client";

import { useEffect, useState } from "react";
import { PALETTES } from "@/lib/palettes";

const PALETTE_STORAGE_KEY = "portfolio-palette";

function isPalette(value: string): boolean {
  return PALETTES.some(({ id }) => id === value);
}

export function usePalette() {
  const [palette, setPaletteState] = useState("iris");

  const setPalette = (nextPalette: string) => {
    if (!isPalette(nextPalette)) return;

    setPaletteState(nextPalette);
    window.localStorage.setItem(PALETTE_STORAGE_KEY, nextPalette);
    window.dispatchEvent(new CustomEvent("portfolio-palette-change", { detail: nextPalette }));
  };

  useEffect(() => {
    const storedPalette = window.localStorage.getItem(PALETTE_STORAGE_KEY);
    if (storedPalette && isPalette(storedPalette)) {
      setPaletteState(storedPalette);
    }

    const onPaletteChange = (event: Event) => {
      const nextPalette = (event as CustomEvent<string>).detail;
      if (typeof nextPalette === "string" && isPalette(nextPalette)) {
        setPaletteState(nextPalette);
      }
    };

    window.addEventListener("portfolio-palette-change", onPaletteChange);
    return () => window.removeEventListener("portfolio-palette-change", onPaletteChange);
  }, []);

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