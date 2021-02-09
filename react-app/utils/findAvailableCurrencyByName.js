import { AVAILABLE_CURRENCIES } from "../components/layouts/currency-dropdown/constants";

const findAvailableCurrencyByName = (name) =>
  AVAILABLE_CURRENCIES.find((item) => item.name === name);

export default findAvailableCurrencyByName;
