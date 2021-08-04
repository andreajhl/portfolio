import { useCallback } from "react";
import { localeAvailables } from "react-app/src/utils/transformUserNavigatorLanguageToISO2Code";
import {
  IntlFormatters,
  MessageDescriptor,
  useIntl as useOriginalIntl,
} from "react-intl";

const isMessageDescriptor = (object: any) =>
  object && Object.keys(object).includes("defaultMessage");

type TextType<
  T extends MessageDescriptor | unknown
> = T extends MessageDescriptor ? string : T;

type FormatMessageParameters = Parameters<IntlFormatters["formatMessage"]>;

type ValuesType = FormatMessageParameters[1];
type OptionsType = FormatMessageParameters[2];

function useIntl() {
  const {
    locale: originalLocale,
    formatMessage: originalFormatMessage,
    ...intl
  } = useOriginalIntl();
  const locale = originalLocale as localeAvailables;

  const formatMessage = useCallback(
    function <T extends MessageDescriptor | unknown>(
      text: T,
      values?: ValuesType,
      options?: OptionsType
    ): TextType<T> {
      if (!isMessageDescriptor(text)) return (text || "") as TextType<T>;
      return originalFormatMessage(text, values, options) as TextType<T>;
    },
    [originalFormatMessage]
  );

  return { ...intl, locale, formatMessage };
}

export * from "react-intl";

export { useIntl };
