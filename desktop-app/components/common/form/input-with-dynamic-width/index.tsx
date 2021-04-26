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
  value,
  ...inputProps
}: InputWithDynamicWidthProps) {
  return (
    <span
      className={`${styles.InputWithDynamicWidth} ${
        removeBorder ? styles.InputWithDynamicWidthWithoutBorder : ""
      }`}
      data-value={value || inputProps.placeholder || ""}
    >
      <input
        type="text"
        name={name}
        id={name}
        className={`${styles.InputWithDynamicWidthInput} ${className}`}
        value={value}
        {...inputProps}
      />
    </span>
  );
}

export { InputWithDynamicWidth };
