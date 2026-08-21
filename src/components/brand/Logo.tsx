"use client";

import Image from "next/image";
import { usePalette } from "@/hooks/usePalette";
import { cn } from "@/utils/cn";

export function Logo({
  className,
  withWordmark = false,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  const { palette } = usePalette();

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src={`/favicon/${palette}.png`}
        alt="Farrukh Noman logo"
        width={44}
        height={44}
        className="block object-contain"
        data-palette-logo
        priority
      />
      {withWordmark ? (
        <span className="gradient-text font-mono text-lg leading-none font-semibold tracking-tight">
          farrukh noman
        </span>
      ) : null}
    </span>
  );
}
