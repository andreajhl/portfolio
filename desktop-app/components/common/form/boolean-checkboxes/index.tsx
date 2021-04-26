import classes from "classnames";
import styles from "./styles.module.scss";

type BooleanRadiosInputsProps = {
  name?: string;
  inline?: boolean;
  className?: string;
  containerClass?: string;
  onChange?: (value, event) => void;
  value: boolean;
};

const TRUTHY_VALUE = 1;
const FALSY_VALUE = "";

function BooleanRadiosInputs({
  name = `BooleanRadiosInputs-${Date.now()}`,
  inline = true,
  value,
  className = "",
  containerClass = className,
  onChange = function () {},
}: BooleanRadiosInputsProps) {
  return (
    <div
      className={classes(
        styles.BooleanRadiosInputs,
        containerClass,
        inline && styles.BooleanRadiosInputsInline
      )}
      onChange={(event) => {
        onChange(Boolean((event as any).target.value), event);
      }}
    >
      <label
        htmlFor={`${name}-true`}
        className={styles.BooleanRadiosInputsLabel}
      >
        <i
          className={classes(
            "fa fa-check",
            value && styles.BooleanRadiosInputsLabelChecked
          )}
        />
        Sí
      </label>
      <input
        type="radio"
        name={name}
        id={`${name}-true`}
        value={TRUTHY_VALUE}
        hidden
      />
      <label
        htmlFor={`${name}-false`}
        className={styles.BooleanRadiosInputsLabel}
      >
        <i
          className={classes(
            "fa fa-times",
            !value && styles.BooleanRadiosInputsLabelChecked
          )}
        />
        No
      </label>
      <input
        type="radio"
        name={name}
        id={`${name}-false`}
        value={FALSY_VALUE}
        hidden
      />
    </div>
  );
}

export { BooleanRadiosInputs };
