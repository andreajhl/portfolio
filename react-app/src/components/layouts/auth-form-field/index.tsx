import { InputHTMLAttributes } from "react";
import Maybe from "../../common/helpers/maybe";
import classes from "classnames";
import styles from "./styles.module.scss";
import { ReactNode } from "react";
import { CollapsibleErrorMessage } from "../../common/widgets/collapsible-error-message";

type AuthFormFieldProps = {
  className?: string;
  label?: string | ReactNode;
  iconElement?: ReactNode;
  error?: string;
  onIconClick?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

function AuthFormField({
  className,
  label,
  name = `AuthFormField-${Date.now()}`,
  id = name,
  iconElement,
  onIconClick,
  error,
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
        <input
          id={id}
          name={name}
          className={classes(styles.Input, error && styles.HasError)}
          {...inputProps}
        />
        <Maybe it={Boolean(iconElement)}>
          <div onClick={onIconClick} className={styles.IconContainer}>
            {iconElement}
          </div>
        </Maybe>
      </div>
      <CollapsibleErrorMessage
        className={styles.AuthFormFieldError}
        errorMessage={error}
        unmountOnExit
      />
    </div>
  );
}

export { AuthFormField };
