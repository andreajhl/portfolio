import {
  InputWithLeftLabel,
  InputWithLeftLabelProps
} from "../input-with-left-label";
import styles from "./styles.module.scss";

type ContractDataFormInputProps = Omit<
  InputWithLeftLabelProps,
  "containerClassName" | "labelClassName"
>;

function ContractDataFormInput({
  className = "",
  ...props
}: ContractDataFormInputProps) {
  return (
    <InputWithLeftLabel
      containerClassName={`${styles.ContractDataFormControl} ${
        !props.disabled ? styles.ContractDataFormControlEditing : ""
      } ${className}`}
      labelClassName={styles.ContractDataFormControlLabel}
      inputClassName={styles.ContractDataFormControlInput}
      {...props}
    />
  );
}

export { ContractDataFormInput };
