export function getTextOfFormatAllowedForUserDocument(
  documentName: string
): string {
  if (documentName === "CPF o CNPJ") {
    return "Use the format XXX.XXX.XXX-XX";
  } else return "";
}
