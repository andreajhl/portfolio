import { defineMessages, useIntl } from "react-intl";
import { CellphoneNumberInput } from "../../common/form/cellphone-number-input";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";

type DeliveryCellphoneInputProps = {
  value?: string;
  disabled?: boolean;
  onChange: (value: any) => void;
};

const messages = defineMessages({
  searchPlaceholder: {
    defaultMessage: "Buscar país",
  },
});

function DeliveryCellphoneInput({
  value = "",
  disabled = false,
  onChange = function () {},
}: DeliveryCellphoneInputProps) {
  const { formatMessage } = useIntl();
  return (
    <Maybe
      it={!disabled}
      orElse={
        <span className={styles.CellphoneNumberInputDisabled}>+{value}</span>
      }
    >
      <CellphoneNumberInput
        onChange={onChange}
        inputClass={styles.CellphoneNumberInput}
        buttonClass={styles.CellphoneNumberInputButton}
        value={String(value)}
        placeholder="+57 310 1234567"
        country="co"
        enableSearch
        searchPlaceholder={formatMessage(messages.searchPlaceholder)}
      />
    </Maybe>
  );
}

export { DeliveryCellphoneInput };
