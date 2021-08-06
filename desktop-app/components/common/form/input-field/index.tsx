import classes from "classnames";
import styles from "./styles.module.scss";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

function InputField({ className = "", ...props }: InputFieldProps) {
  return <input className={classes(styles.InputField, className)} {...props} />;
}

export { InputField };
