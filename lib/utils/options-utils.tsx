import { IntlFormatters, MessageDescriptor } from "react-intl";

export const translateOptions = (
  options: { label: MessageDescriptor; value: any }[],
  formatMessage: IntlFormatters["formatMessage"]
) =>
  options.map((option) => ({ ...option, label: formatMessage(option.label) }));

export const getOptionByValue = (
  options: { label: string; value: any }[],
  value: any
) => options.find((option) => option.value === value);
