import { InputHTMLAttributes } from "react";
import Maybe from "../../common/helpers/maybe";
import classes from "classnames";
import styles from "./styles.module.scss";

type AuthFormFieldProps = {
  className?: string;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function AuthFormField({
  className,
  label,
  name = `AuthFormField-${Date.now()}`,
  id = name,
  ...inputProps
}: AuthFormFieldProps) {
  return (
    <div className={classes(styles.AuthFormField, className)}>
      <Maybe it={Boolean(label)}>
        <label htmlFor={id} className={styles.Label}>
          {label}
        </label>
      </Maybe>
      <input id={id} name={name} className={styles.Input} {...inputProps} />
    </div>
  );
}

export { AuthFormField };
