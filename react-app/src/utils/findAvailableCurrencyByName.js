import { AVAILABLE_CURRENCIES } from "../constants/availableCurrencies";

const findAvailableCurrencyByName = (name) =>
  AVAILABLE_CURRENCIES.find((item) => item.name === name);

export default findAvailableCurrencyByName;
