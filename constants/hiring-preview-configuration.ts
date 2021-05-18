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

export const defaultGiftCardContent = {
  BIRTHDAY: {
    title: "¡Feliz cumpleaños {{deliveryTo}}!",
    message: "Pasa un día genial en\nesta vuelta al sol.",
  },

  SPECIAL_OCCASION: {
    title: " ¡Felicitaciones para ti {{deliveryTo}}!",
    message: "¡Que vengan más celebraciones así!",
  },
  SONG: {
    title: "Este video especial para ti",
    message: "¡a disfrutar esta melodía y a ponerse de buenas!",
  },
  CHEER_UP: {
    title: "¡Ánimo {{deliveryTo}}!",
    message: "Todo saldrá bien, la vida es sabia.",
  },
  MOTIVATION: {
    title: " ¡Vamos {{deliveryTo}}!",
    message: "Todo es posible si así lo crees. Sueña y vive en grande.",
  },
  JOKE: {
    title: "Disfruta este video {{deliveryTo}}",
    message: "¡La vida es más bonita con sonrisas y carcajadas!",
  },
  OTHER: {
    title: "¡Disfruta tu video {{deliveryTo}}!",
    message: "",
  },
};

export function getDefaultGiftCardContent(occasion, deliveryTo) {
  const cardContent =
    defaultGiftCardContent[occasion] || defaultGiftCardContent.OTHER;

  return {
    title: cardContent.title.replace("{{deliveryTo}}", deliveryTo),
    message: cardContent.message,
  };
}
