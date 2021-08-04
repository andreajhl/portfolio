import { IntlFormatters } from "react-intl";
import { labelMessagesForCategoriesFilter } from "react-app/src/constants/messages";

function getTranslatedCategoryTitle(
  categoryTitle: string,
  formatMessage: IntlFormatters["formatMessage"]
) {
  if (typeof formatMessage !== "function") return categoryTitle;
  const categoryTitleMessage = labelMessagesForCategoriesFilter[categoryTitle];
  return categoryTitleMessage
    ? formatMessage(categoryTitleMessage)
    : categoryTitle;
}

export default getTranslatedCategoryTitle;
