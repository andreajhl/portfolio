import {
  InputWithLeftLabel,
  InputWithLeftLabelProps
} from "../../common/form/input-with-left-label";
import styles from "./styles.module.scss";

type ContractDataFormInputProps = Omit<
  InputWithLeftLabelProps,
  "containerClassName" | "labelClassName"
>;

function ContractDataFormInput(props: ContractDataFormInputProps) {
  return (
    <InputWithLeftLabel
      containerClassName={`${styles.ContractDataFormControl} ${
        !props.disabled ? styles.ContractDataFormControlEditing : ""
      }`}
      labelClassName={styles.ContractDataFormControlLabel}
      inputClassName={styles.ContractDataFormControlInput}
      {...props}
    />
  );
}

export { ContractDataFormInput };
