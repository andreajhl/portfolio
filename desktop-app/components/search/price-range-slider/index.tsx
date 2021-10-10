import {
  RangeSlider,
  RangeSliderProps,
} from "desktop-app/components/common/form/range-slider";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import debounce from "lodash.debounce";
import { PriceRangeSliderInput } from "../price-range-slider-input";
import usePriceConverter from "lib/hooks/usePriceConverter";

type PriceRangeSliderProps = {
  min?: number;
  max?: number;
} & Omit<RangeSliderProps, "algorithm" | "isTouched">;

function PriceRangeSlider({
  min = 0,
  max = 100,
  values = [0, 100],
  setValues = function () {},
  isTouched,
  changeIsTouched,
  onChange,
  onClick = function () {},
}: PriceRangeSliderProps) {
  const { getExchangePrice, getOriginalPrice, currency } = usePriceConverter();
  const [low, high] = values;
  const debouncedOnChange = useMemo(() => debounce(onChange, 500), []);
  const [minInputValue, setMinInputValue] = useState("");
  const [maxInputValue, setMaxInputValue] = useState("");
  const currentCurrencyRef = useRef<string>();

  function changeValues(state: { values: [number, number] }): void {
    changeIsTouched();
    setValues(state.values);
    updateInputValues(state.values);
  }

  const updateInputValues = useCallback(
    (values: [number, number]) => {
      setMinInputValue(String(getExchangePrice(values[0])));
      setMaxInputValue(String(getExchangePrice(values[1])));
    },
    [getExchangePrice]
  );

  useEffect(() => {
    if (currentCurrencyRef.current === currency) return;
    currentCurrencyRef.current = currency;
    updateInputValues(values);
  }, [currency, updateInputValues, values]);

  function onClickAfterChangeIsTouched() {
    changeIsTouched();
    onClick();
  }

  function changeLowValue(value: string): void {
    changeIsTouched();
    setMinInputValue(value);
    let newLow = getOriginalPrice(Number(value));
    if (newLow < min) newLow = min;
    if (newLow >= high) newLow = high;
    setValues([newLow, high]);
    debouncedOnChange({ values: [newLow, high] });
  }

  function changeHighValue(value: string): void {
    changeIsTouched();
    setMaxInputValue(value);
    let newHigh = getOriginalPrice(Number(value));
    if (newHigh <= low) newHigh = low;
    if (newHigh > max) newHigh = max;
    setValues([low, newHigh]);
    debouncedOnChange({ values: [low, newHigh] });
  }

  const inputsMaxLength = String(getExchangePrice(max)).length;

  function fixMinInputToValidValue() {
    if (String(low) === minInputValue) return;
    setMinInputValue(String(getExchangePrice(low)));
  }

  function fixMaxInputToValidValue() {
    if (String(high) === maxInputValue) return;
    setMaxInputValue(String(getExchangePrice(high)));
  }

  return (
    <div className={styles.PriceRangeSlider}>
      <RangeSlider
        min={min}
        max={max}
        values={values}
        isTouched={isTouched}
        onValuesUpdated={changeValues}
        onClick={onClickAfterChangeIsTouched}
        onChange={onChange}
        className={styles.PriceRangeSliderSlider}
      />
      <div className={styles.PriceRangeSliderInputs}>
        <PriceRangeSliderInput
          label={<FormattedMessage defaultMessage="Mínimo" />}
          initialPrice={getExchangePrice(min)}
          value={minInputValue}
          name="minimum"
          isTouched={isTouched}
          onChange={changeLowValue}
          onBlur={fixMinInputToValidValue}
          currency={currency}
          maxLength={inputsMaxLength}
        />
        <span className={styles.PriceRangeSliderInputsSeparator}>-</span>
        <PriceRangeSliderInput
          label={<FormattedMessage defaultMessage="Máximo" />}
          initialPrice={getExchangePrice(max)}
          value={maxInputValue}
          name="maximum"
          isTouched={isTouched}
          onChange={changeHighValue}
          onBlur={fixMaxInputToValidValue}
          currency={currency}
          maxLength={inputsMaxLength}
        />
      </div>
    </div>
  );
}

export { PriceRangeSlider };
