import { IntlFormatters } from "react-intl";
import { labelMessagesForCountryCodeFilter } from "react-app/src/constants/messages";

function getTranslatedCountryName(
  country: { name: string; countryCode: string },
  formatMessage: IntlFormatters["formatMessage"]
) {
  const fallbackName = country?.name || "";
  if (typeof formatMessage !== "function") return fallbackName;
  const categoryTitleMessage =
    labelMessagesForCountryCodeFilter[country.countryCode];
  return categoryTitleMessage
    ? formatMessage(categoryTitleMessage)
    : fallbackName;
}

export default getTranslatedCountryName;
