import styles from "./styles.module.scss";
import { InputWithDynamicWidth } from "../input-with-dynamic-width";
import { ReactNode } from "react";

export type InputWithLeftLabelProps = {
  name?: string;
  label?: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function InputWithLeftLabel({
  name = "InputWithLeftLabel-" + Math.random(),
  label,
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  ...inputProps
}: InputWithLeftLabelProps) {
  return (
    <div className={`${styles.InputWithLeftLabel} ${containerClassName}`}>
      <label
        className={`${styles.InputWithLeftLabelLabel} ${labelClassName}`}
        htmlFor={name}
      >
        {label}:
      </label>
      <InputWithDynamicWidth
        name={name}
        className={`${styles.InputWithLeftLabelInput} ${inputClassName}`}
        removeBorder
        {...inputProps}
      />
    </div>
  );
}

export { InputWithLeftLabel };
