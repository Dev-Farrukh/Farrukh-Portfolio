"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (!ids.length) return;
    const update = () => {
      const current = ids.findLast((id) => {
        const element = document.getElementById(id);
        return element && element.getBoundingClientRect().top <= 140;
      });
      setActive(current ?? ids[0]);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [ids]);

  return active;
}