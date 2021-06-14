import ClientContractType from "desktop-app/types/clientContract";
import { OccasionType } from "desktop-app/types/contractDataType";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import {
  availablePageBackgroundsUrls,
  availableCardColors,
  getActionButtonsBackgroundColorsForPageBackground,
} from "./hiring-preview-configuration";

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

export function getDefaultGiftCardContent(
  occasion: OccasionType,
  deliveryTo: string
) {
  const cardContent =
    defaultGiftCardContent[occasion] || defaultGiftCardContent.OTHER;

  return {
    title: cardContent.title.replace("{{deliveryTo}}", deliveryTo || ""),
    message: cardContent.message,
  };
}

function getDefaultHiringConfiguration({
  occasion,
  deliveryTo,
}: ClientContractType): HiringPreviewConfigurationType {
  const cardContent = getDefaultGiftCardContent(occasion, deliveryTo);
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
