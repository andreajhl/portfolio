export type localeAvailables = "es" | "en" | "pt" | "por" | "pt-BR";
export function returnLangPathFromExternalAssets(locale: localeAvailables) {
  if (locale === "es") {
    return "es";
  }
  if (locale === "en") {
    return "en";
  }
  if (locale === "pt" || locale === "por" || locale === "pt-BR") {
    return "pt";
  }
  return "es";
}
