import { BenefitTypeType } from "react-app/src/types/subscriptionBenefitType";
import { defineMessages, MessageDescriptor } from "react-intl";

type BenefitTypeMessages = {
  [Property in BenefitTypeType]: MessageDescriptor;
} & { fallback: MessageDescriptor };

const descriptionLabelsMessages: BenefitTypeMessages = defineMessages({
  RAFFLE: {
    defaultMessage: "Descripción del sorteo:",
  },
  VIDEO_CALL: {
    defaultMessage: "Descripción de videollamada:",
  },
  DISCOUNT: {
    defaultMessage: "Descripción del descuento:",
  },
  fallback: {
    defaultMessage: "Descripción:",
  },
});

export function getDescriptionLabelMessage(benefitType: BenefitTypeType) {
  return (
    descriptionLabelsMessages[benefitType] || descriptionLabelsMessages.fallback
  );
}

const benefitsTypeMessages: BenefitTypeMessages = defineMessages({
  RAFFLE: {
    defaultMessage: "sorteo",
  },
  VIDEO_CALL: {
    defaultMessage: "videollamada",
  },
  DISCOUNT: {
    defaultMessage: "descuento",
  },
  fallback: {
    defaultMessage: "beneficio",
  },
});

export function getBenefitTypeMessage(benefitType: BenefitTypeType) {
  return benefitsTypeMessages[benefitType] || benefitsTypeMessages.fallback;
}

const nextBenefitBannerText: BenefitTypeMessages = defineMessages({
  RAFFLE: {
    defaultMessage: "Faltan {countdown} para el siguiente sorteo",
  },
  VIDEO_CALL: {
    defaultMessage: "Faltan {countdown} para la siguiente videollamada",
  },
  DISCOUNT: {
    defaultMessage: "Faltan {countdown} para el siguiente descuento",
  },
  fallback: {
    defaultMessage: "Faltan {countdown} para el siguiente beneficio",
  },
});

export function getSubscriptionNextBenefitBannerText(
  benefitType: BenefitTypeType
) {
  return nextBenefitBannerText[benefitType] || nextBenefitBannerText.fallback;
}
