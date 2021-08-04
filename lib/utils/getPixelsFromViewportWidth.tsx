export function getPixelsFromViewportWidth(
  viewportWidth: number,
  max?: number
) {
  const averageWindowWidth = 1366;
  const windowWidth =
    typeof window !== "undefined" ? window.innerWidth : averageWindowWidth;

  const pixelsFromViewportWidth = windowWidth * (viewportWidth / 100);
  if (max && pixelsFromViewportWidth > max) return max;
  return pixelsFromViewportWidth;
}
