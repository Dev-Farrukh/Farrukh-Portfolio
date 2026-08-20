export const BRAND = { deep: "#6d28d9", mid: "#8b5cf6", bright: "#c4b5fd" };

export function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16));
}