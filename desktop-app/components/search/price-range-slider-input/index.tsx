import styles from "./styles.module.scss";
import { InputWithDynamicWidth } from "desktop-app/components/common/form/input-with-dynamic-width";
import classes from "classnames";
import { ReactNode, useEffect, useState } from "react";
import usePriceConverter from "lib/hooks/usePriceConverter";
import useIsInBrowser from "react-app/src/utils/useIsInBrowser";
import Maybe from "desktop-app/components/common/helpers/maybe";

type PriceRangeSliderInputProps = {
  initialPrice: number;
  value: number;
  name: string;
  isTouched?: boolean;
  onChange?: (value: string) => void;
  label: ReactNode;
};

function PriceRangeSliderInput({
  initialPrice,
  value,
  name,
  onChange = function () {},
  isTouched = true,
  label,
}: PriceRangeSliderInputProps) {
  const { getExchangePrice, getOriginalPrice, currency } = usePriceConverter();
  const [inputValue, setInputValue] = useState(
    String(getExchangePrice(initialPrice))
  );
  const isInBrowser = useIsInBrowser();

  useEffect(() => {
    if (typeof value === "undefined") return;
    setInputValue(String(getExchangePrice(value)));
  }, [getExchangePrice, value]);

  function changeInputValue({ target: { value } }) {
    const newValue = value.replace(/[^0-9.]/g, "");
    setInputValue(newValue);
    if (newValue === "") return;
    onChange(String(getOriginalPrice(newValue)));
  }

  function fixInputToValidValue() {
    if (String(value) === inputValue) return;
    setInputValue(String(getExchangePrice(value)));
  }

  const inputId = "PriceRangeSliderInput-" + name;
  const inputIsEmpty = inputValue === "" || !isTouched;

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
            placeholder={String(getExchangePrice(initialPrice))}
            onChange={changeInputValue}
            onBlur={fixInputToValidValue}
            autoComplete="off"
            value={inputValue}
          />
        </Maybe>
        <span>{currency}</span>
      </div>
    </div>
  );
}

export { PriceRangeSliderInput };
