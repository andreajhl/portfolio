import { defineMessages } from "react-intl";

const messages = defineMessages({
  shareMessage: {
    defaultMessage:
      "¡Hola! Te invito a ganar premios junto a mi en Famosos.com. Ingresa ya a {referralLink}.",
  },
  shareMailSubject: {
    defaultMessage: "Me gustaría invitarte a Famosos.com",
  },
});

export const errorMessages = defineMessages({
  "record not found": {
    defaultMessage:
      "El código de referido {referrerCode} no pertenece a ningún usuario",
  },
});

export default messages;
