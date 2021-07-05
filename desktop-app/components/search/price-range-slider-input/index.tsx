import styles from "./styles.module.scss";
import { InputWithDynamicWidth } from "desktop-app/components/common/form/input-with-dynamic-width";
import classes from "classnames";
import { ReactNode } from "react";
import useIsInBrowser from "react-app/src/utils/useIsInBrowser";
import Maybe from "desktop-app/components/common/helpers/maybe";

type PriceRangeSliderInputProps = {
  initialPrice: number;
  value: string;
  name: string;
  isTouched?: boolean;
  onChange?: (value: string) => void;
  label: ReactNode;
  maxLength?: number;
  currency?: string;
  onBlur?: (event: any) => void;
};

function PriceRangeSliderInput({
  initialPrice,
  value,
  name,
  onChange = function () {},
  onBlur,
  maxLength,
  isTouched = true,
  label,
  currency = "USD",
}: PriceRangeSliderInputProps) {
  const isInBrowser = useIsInBrowser();

  function changeInputValue({ target: { value } }) {
    const newValue = value.replace(/[^0-9.]/g, "");
    onChange(newValue);
  }

  const inputId = "PriceRangeSliderInput-" + name;
  const inputIsEmpty = value === "" || !isTouched;

  return (
    <div className={styles.PriceRangeSliderInputWrapper}>
      <label htmlFor={inputId} className={styles.PriceRangeSliderInputLabel}>
        {label}
      </label>
      <div
        className={classes(
          styles.PriceRangeSliderInputControl,
          inputIsEmpty && styles.PriceRangeSliderInputControlEmpty
        )}
      >
        <span>$</span>
        {/* Para corregir bug donde al ser montado el input, no posee el ancho correcto. */}
        <Maybe it={isInBrowser} orElse={initialPrice}>
          <InputWithDynamicWidth
            removeBorder
            type="text"
            name={inputId}
            id={inputId}
            className={classes(
              styles.PriceRangeSliderInput,
              isTouched && styles.PriceRangeSliderInputIsTouched
            )}
            placeholder={String(initialPrice)}
            onChange={changeInputValue}
            onBlur={onBlur}
            autoComplete="off"
            value={value}
            maxLength={maxLength}
          />
        </Maybe>
        <span>{currency}</span>
      </div>
    </div>
  );
}

export { PriceRangeSliderInput };
