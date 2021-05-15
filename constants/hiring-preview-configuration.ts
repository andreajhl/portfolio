export const availableCardColors = [
  "#E8E8FF",
  "#FFE3F0",
  "#FFF5CA",
  "#E3F8FF",
  "#E3FFE6",
] as const;

export const availablePageBackgroundsUrls = [
  "/assets/img/hirings-preview-backgrounds/background-1.png",
  "/assets/img/hirings-preview-backgrounds/background-2.png",
  "/assets/img/hirings-preview-backgrounds/background-3.png",
  "/assets/img/hirings-preview-backgrounds/background-4.png",
] as const;

export const availableActionButtonsBackgroundColors = [
  "#000000",
  "#FB177D",
  "#FF8CA4",
  "#BA802F",
] as const;

export function getActionButtonsBackgroundColorsForPageBackground(
  pageBackgroundUrl: typeof availablePageBackgroundsUrls[number]
) {
  const pageBackgroundUrlIndex = availablePageBackgroundsUrls.indexOf(
    pageBackgroundUrl
  );

  return availableActionButtonsBackgroundColors[pageBackgroundUrlIndex];
}
