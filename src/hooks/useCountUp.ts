"use client";

import { useEffect, useState } from "react";

export function useCountUp(value: number, active: boolean) {
  const [count, setCount] = useState(active ? value : 0);

  useEffect(() => {
    if (active) setCount(value);
  }, [active, value]);

  return count;
}