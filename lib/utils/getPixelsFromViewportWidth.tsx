export function getPixelsFromViewportWidth(viewportWidth: number) {
  const averageWindowWidth = 1366;
  const windowWidth =
    typeof window !== "undefined" ? window.innerWidth : averageWindowWidth;
  return windowWidth * (viewportWidth / 100);
}
