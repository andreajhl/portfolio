import { LIST_OF_CURRENCIES_FOR_DLOCAL_PAYMENT_METHOD } from "constants/userDocumentFormatAllowedByCurrency";
import {
  AVAILABLE_PAYMENTS_METHODS_DLOCAL,
  DLOCAL_PAYMENT_METHODS_WITH_CARD_REQUIRED,
} from "./../../constants/availablePaymentsMethods";

export const isAValidDLocalPaymentMethod = (paymentMethod) =>
  AVAILABLE_PAYMENTS_METHODS_DLOCAL.some((method) => method === paymentMethod);

export const isADLocalPaymentMethodWithCardRequired = (paymentMethod) =>
  DLOCAL_PAYMENT_METHODS_WITH_CARD_REQUIRED.some(
    (method) => method === paymentMethod
  );

export const isACurrencyForDLocalPaymentMethod = (userCurrency) =>
  LIST_OF_CURRENCIES_FOR_DLOCAL_PAYMENT_METHOD.some(
    (currency) => currency === userCurrency
  );
