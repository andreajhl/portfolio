import { IntlFormatters } from "react-intl";
import isEmail from "validator/lib/isEmail";
import isDate from "validator/lib/isDate";
import errorMessages from "./errorMessages";

export const getEmailValidator = (
  formatMessage: IntlFormatters["formatMessage"]
) =>
  function emailValidator(value: string) {
    if (!isEmail(value)) return formatMessage(errorMessages.invalidEmail);
  };

export const getDateValidator = (
  formatMessage: IntlFormatters["formatMessage"]
) =>
  function dateValidator(value: string) {
    if (value === "") return formatMessage(errorMessages.emptyDate);
    if (!isDate(value)) {
      return formatMessage(errorMessages.invalidDate);
    }
  };
