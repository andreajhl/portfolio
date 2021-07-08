import { InputHTMLAttributes } from "react";
import Maybe from "../../common/helpers/maybe";
import classes from "classnames";
import styles from "./styles.module.scss";
import { ReactNode } from "react";

type AuthFormFieldProps = {
  className?: string;
  label?: string;
  iconElement?: ReactNode;
  onIconClick?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

function AuthFormField({
  className,
  label,
  name = `AuthFormField-${Date.now()}`,
  id = name,
  iconElement,
  onIconClick,
  ...inputProps
}: AuthFormFieldProps) {
  return (
    <div className={classes(styles.AuthFormField, className)}>
      <Maybe it={Boolean(label)}>
        <label htmlFor={id} className={styles.Label}>
          {label}
        </label>
      </Maybe>
      <div className={styles.InputContainer}>
        <input id={id} name={name} className={styles.Input} {...inputProps} />
        {iconElement ? (
          <div onClick={onIconClick} className={styles.IconContainer}>
            {iconElement}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { AuthFormField };
