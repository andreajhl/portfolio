import {
  InputWithLeftLabel,
  InputWithLeftLabelProps,
} from "../input-with-left-label";
import styles from "./styles.module.scss";
import classes from "classnames";

type ContractDataFormInputProps = Omit<
  InputWithLeftLabelProps,
  "containerClassName" | "labelClassName"
>;

function ContractDataFormInput({
  className,
  ...props
}: ContractDataFormInputProps) {
  return (
    <InputWithLeftLabel
      containerClassName={classes(
        styles.ContractDataFormControl,
        !props.disabled && styles.ContractDataFormControlEditing,
        className
      )}
      labelClassName={styles.ContractDataFormControlLabel}
      inputClassName={styles.ContractDataFormControlInput}
      {...props}
    />
  );
}

export { ContractDataFormInput };
