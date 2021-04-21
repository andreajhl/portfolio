import styles from "./styles.module.scss";

type InputWithDynamicWidthProps = {
  removeBorder?: boolean;
  name: string;
  className: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function InputWithDynamicWidth({
  removeBorder = false,
  name,
  className,
  ...inputProps
}: InputWithDynamicWidthProps) {
  return (
    <span
      className={`${styles.InputWithDynamicWidth} ${
        removeBorder ? styles.InputWithDynamicWidthWithoutBorder : ""
      }`}
    >
      <span aria-hidden>{inputProps.value}</span>
      <input
        type="text"
        name={name}
        id={name}
        className={`${styles.InputWithDynamicWidthInput} ${className}`}
        {...inputProps}
      />
    </span>
  );
}

export { InputWithDynamicWidth };
