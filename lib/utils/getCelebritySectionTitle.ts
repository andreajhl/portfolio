import { CelebritySectionType } from "desktop-app/types/celebritySectionType";
import {
  localeAvailables,
  transformUserNavigatorLanguageToISO2Code
} from "react-app/src/utils/transformUserNavigatorLanguageToISO2Code";

function getCelebritySectionTitle(
  celebritySection: CelebritySectionType,
  locale: localeAvailables
) {
  const celebritySectionTitle = celebritySection.title;
  if (typeof celebritySectionTitle === "string") return celebritySectionTitle;
  const fallbackTitle = celebritySectionTitle["es"] || "";
  return (
    celebritySectionTitle[transformUserNavigatorLanguageToISO2Code(locale)] ||
    fallbackTitle
  );
}

export default getCelebritySectionTitle;
