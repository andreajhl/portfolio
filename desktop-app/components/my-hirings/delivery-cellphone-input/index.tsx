import { CellphoneNumberInput } from "../../common/form/cellphone-number-input";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";

type DeliveryCellphoneInputProps = {
  value?: string;
  disabled?: boolean;
};

function DeliveryCellphoneInput({
  value = "",
  disabled = false,
}: DeliveryCellphoneInputProps) {
  return (
    <Maybe
      it={!disabled}
      orElse={
        <span className={styles.CellphoneNumberInputDisabled}>{value}</span>
      }
    >
      <CellphoneNumberInput
        inputClass={styles.CellphoneNumberInput}
        buttonClass={styles.CellphoneNumberInputButton}
        value={String(value)}
        placeholder="+57 310 1234567"
        country="co"
        enableSearch
        searchPlaceholder="Buscar país"
      />
    </Maybe>
  );
}

export { DeliveryCellphoneInput };
