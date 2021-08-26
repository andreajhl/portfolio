import { BenefitTypeType } from "react-app/src/types/subscriptionBenefitType";
import { defineMessages } from "react-intl";

const descriptionLabelsMessages = defineMessages({
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

const benefitsTypeMessages = defineMessages({
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
