import { defineMessages } from "react-intl";

const errorMessages = defineMessages({
  emptyNameError: { defaultMessage: "Debes introducir un nombre" },
  emptyInstructions: { defaultMessage: "Debes escribir tus instrucciones" },
  unSelectedOccasion: { defaultMessage: "Debes seleccionar una ocasión" },
  maxLengthError: {
    defaultMessage: "Debes introducir un máximo de {maxLength} caracteres",
  },
  invalidEmail: { defaultMessage: "Ingresa un correo electrónico válido" },
  invalidCellphoneNumber: {
    defaultMessage: "Ingresa un número de teléfono válido",
  },
  invalidEmailList: {
    defaultMessage: "Ingresa una lista de correos electrónicos válidos",
  },
  emptyMessage: {
    defaultMessage: "Ingresa tu mensaje",
  },
  emptyDate: { defaultMessage: "Ingresa una fecha" },
  invalidDate: {
    defaultMessage: "Ingresa una fecha valida. Ejemplo: 2020-06-25",
  },
  invalidCoupon: {
    defaultMessage: "Debes de introducir un cupón valido",
  },
  invalidIdentificationDocument: {
    defaultMessage: "Debes introducir un documento de identificación valido",
  },
  emptyReview: { defaultMessage: "Debes escribir un comentario" },
});

export default errorMessages;
