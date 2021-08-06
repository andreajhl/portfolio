import { ReactNode } from "react";
import { useIntl } from "react-intl";

const isMessageDescriptor = (object: any) =>
  Object.keys(object).includes("defaultMessage");

function useValidatedFormattedMessage() {
  const { formatMessage } = useIntl();

  function getValidatedFormattedMessage(
    text: any,
    values?: Record<string, string | number | boolean | Date | ReactNode>
  ) {
    if (isMessageDescriptor(text)) return formatMessage(text, values);
    return text;
  }

  return getValidatedFormattedMessage;
}

export default useValidatedFormattedMessage;
