import ClientContractType from "desktop-app/types/clientContract";
import { OccasionType } from "desktop-app/types/contractDataType";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import {
  availablePageBackgroundsUrls,
  availableCardColors,
  getActionButtonsBackgroundColorsForPageBackground,
} from "./hiring-preview-configuration";
import { defineMessages, defineMessage } from "react-intl";

export const defaultGiftCardContent = {
  BIRTHDAY: defineMessages({
    title: { defaultMessage: "¡Feliz cumpleaños {deliveryTo}!" },
    message: { defaultMessage: "Pasa un día genial en esta vuelta al sol." },
  }),
  SPECIAL_OCCASION: defineMessages({
    title: { defaultMessage: "¡Felicitaciones para ti {deliveryTo}!" },
    message: { defaultMessage: "¡Que vengan más celebraciones así!" },
  }),
  SONG: defineMessages({
    title: { defaultMessage: "Este video especial para ti" },
    message: {
      defaultMessage: "¡a disfrutar esta melodía y a ponerse de buenas!",
    },
  }),
  CHEER_UP: defineMessages({
    title: { defaultMessage: "¡Ánimo {deliveryTo}!" },
    message: { defaultMessage: "Todo saldrá bien, la vida es sabia." },
  }),
  MOTIVATION: defineMessages({
    title: { defaultMessage: "¡Vamos {deliveryTo}!" },
    message: {
      defaultMessage:
        "Todo es posible si así lo crees. Sueña y vive en grande.",
    },
  }),
  JOKE: defineMessages({
    title: { defaultMessage: "Disfruta este video {deliveryTo}" },
    message: {
      defaultMessage: "¡La vida es más bonita con sonrisas y carcajadas!",
    },
  }),
  OTHER: {
    title: defineMessage({
      defaultMessage: "¡Disfruta tu video {deliveryTo}!",
    }),
    message: "",
  },
};

export function getDefaultGiftCardContent(occasion: OccasionType) {
  const cardContent =
    defaultGiftCardContent[occasion] || defaultGiftCardContent.OTHER;

  return {
    title: cardContent.title,
    message: cardContent.message,
  };
}

function getDefaultHiringConfiguration({
  occasion,
}: ClientContractType): HiringPreviewConfigurationType {
  const cardContent = getDefaultGiftCardContent(occasion);
  const pageBackgroundUrl = availablePageBackgroundsUrls[1];
  const actionButtonsBackgroundColor = getActionButtonsBackgroundColorsForPageBackground(
    pageBackgroundUrl
  );
  return {
    cardTitle: cardContent.title,
    cardMessage: cardContent.message,
    cardColor: availableCardColors[0],
    pageBackgroundUrl,
    actionButtonsBackgroundColor,
  };
}

export default getDefaultHiringConfiguration;
