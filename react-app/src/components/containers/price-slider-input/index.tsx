import { InputWithDynamicWidth } from "desktop-app/components/common/form/input-with-dynamic-width";
import useIsInBrowser from "react-app/src/utils/useIsInBrowser";
import Maybe from "desktop-app/components/common/helpers/maybe";
import styles from "./styles.module.scss";
import { ReactNode } from "react";
import classes from "classnames";

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
        <span className={styles.span}>$</span>
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
      </div>
    </div>
  );
}

export { PriceRangeSliderInput };
