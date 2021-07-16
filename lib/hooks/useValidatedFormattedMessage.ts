import { useIntl } from "react-intl";

function useValidatedFormattedMessage() {
  const { formatMessage } = useIntl();

  const isMessageDescriptor = (object: any) =>
    Object.keys(object).includes("defaultMessage");

  function getValidatedFormattedMessage(text: any) {
    if (isMessageDescriptor(text)) return formatMessage(text);
    return text;
  }

  return getValidatedFormattedMessage;
}

export default useValidatedFormattedMessage;
