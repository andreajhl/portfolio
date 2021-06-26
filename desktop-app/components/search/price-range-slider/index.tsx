import {
  RangeSlider,
  RangeSliderProps,
} from "desktop-app/components/common/form/range-slider";
import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import debounce from "lodash.debounce";
import { PriceRangeSliderInput } from "../price-range-slider-input";

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
  const [low, high] = values;
  const debouncedOnChange = useMemo(() => debounce(onChange, 500), []);

  function changeValues(state: { values: [number, number] }): void {
    changeIsTouched();
    setValues(state.values);
  }

  function onClickAfterChangeIsTouched() {
    changeIsTouched();
    onClick();
  }

  function changeLowValue(value: string): void {
    changeIsTouched();
    const newLow = Number(value);
    if (newLow < min) return;
    if (newLow >= high) return;
    setValues([newLow, high]);
    debouncedOnChange({ values: [newLow, high] });
  }

  function changeHighValue(value: string): void {
    changeIsTouched();
    const newHigh = Number(value);
    if (newHigh <= low) return;
    if (newHigh > max) return;
    setValues([low, newHigh]);
    debouncedOnChange({ values: [low, newHigh] });
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
          initialPrice={min}
          value={low}
          name="minimum"
          isTouched={isTouched}
          onChange={changeLowValue}
        />
        <span className={styles.PriceRangeSliderInputsSeparator}>-</span>
        <PriceRangeSliderInput
          label={<FormattedMessage defaultMessage="Máximo" />}
          initialPrice={max}
          value={high}
          name="maximum"
          isTouched={isTouched}
          onChange={changeHighValue}
        />
      </div>
    </div>
  );
}

export { PriceRangeSlider };
