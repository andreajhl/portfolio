import { IntlFormatters } from "react-intl";
import isEmail from "validator/lib/isEmail";
import errorMessages from "./errorMessages";

export function validateDeliveryTo(value: string) {
  if (value.length === 0) return "Debes introducir un nombre";
  if (value.length > 40) {
    return "Debes introducir un máximo de 40 caracteres.";
  }
}

export function validateDeliveryFrom(
  value: string,
  { values: { contractType } }
) {
  if (contractType !== 2) return;
  if (value.length === 0) return "Debes introducir un nombre";
  if (value.length > 40) {
    return "Debes introducir un máximo de 40 caracteres.";
  }
}

export function validateInstructions(value: string) {
  if (value.length === 0) return "Debes escribir tus instrucciones.";
  if (value.length > 300) {
    return "Debes introducir un máximo de 300 caracteres.";
  }
}

export function validateDeliveryContactCellphone(value: string) {
  if (value.length <= 4) return "Ingresa un número de teléfono válido.";
}

export const getDeliveryToValidator = (
  formatMessage: IntlFormatters["formatMessage"]
) =>
  function deliveryToValidator(value: string) {
    if (value.length === 0) {
      return formatMessage(errorMessages.emptyNameError);
    }
    const maxLength = 40;
    if (value.length > maxLength) {
      return formatMessage(errorMessages.maxLengthError, { maxLength });
    }
  };

export const getDeliveryFromValidator = (
  formatMessage: IntlFormatters["formatMessage"]
) =>
  function deliveryFromValidator(value: string, { values: { contractType } }) {
    if (contractType !== 2) return;
    if (value.length === 0) {
      return formatMessage(errorMessages.emptyNameError);
    }
    const maxLength = 40;
    if (value.length > maxLength) {
      return formatMessage(errorMessages.maxLengthError, { maxLength });
    }
  };

export const getInstructionsValidator = (
  formatMessage: IntlFormatters["formatMessage"]
) =>
  function instructionsValidator(value: string) {
    if (value.length === 0)
      return formatMessage(errorMessages.emptyInstructions);
    const maxLength = 300;
    if (value.length > maxLength) {
      return formatMessage(errorMessages.maxLengthError, { maxLength });
    }
  };

export const getOccasionValidator = (
  formatMessage: IntlFormatters["formatMessage"]
) =>
  function occasionValidator(value: string) {
    if (value.length === 0)
      return formatMessage(errorMessages.unSelectedOccasion);
  };

export const getDeliveryContactValidator = (
  formatMessage: IntlFormatters["formatMessage"]
) =>
  function deliveryContactValidator(value: string) {
    if (!isEmail(value)) return formatMessage(errorMessages.invalidEmail);
  };

export const getDeliveryContactCellphoneValidator = (
  formatMessage: IntlFormatters["formatMessage"]
) =>
  function deliveryContactCellphoneValidator(value: string) {
    if (value.length <= 4) {
      return formatMessage(errorMessages.invalidCellphoneNumber);
    }
  };
