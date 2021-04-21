import {
  InputWithLeftLabel,
  InputWithLeftLabelProps
} from "../common/form/input-with-left-label";
import styles from "./styles.module.scss";

type ContractDataFormInputProps = Omit<
  InputWithLeftLabelProps,
  "containerClassName" | "labelClassName"
>;

function ContractDataFormInput(props: ContractDataFormInputProps) {
  return (
    <InputWithLeftLabel
      containerClassName={styles.ContractDataFormControl}
      labelClassName={styles.ContractDataFormControlLabel}
      {...props}
    />
  );
}

export { ContractDataFormInput };
