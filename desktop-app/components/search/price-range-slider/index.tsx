import { RangeSlider } from "desktop-app/components/common/form/range-slider";
import { PriceLayout } from "desktop-app/components/common/helpers/price-layout";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./styles.module.scss";

type ValuesType = [number, number];

type PriceRangeSliderProps = {
  min?: number;
  max?: number;
  onValuesUpdated?: (data: { values: ValuesType; [key: string]: any }) => void;
  values: ValuesType;
};

function PriceRangeSliderInput({
  initialPrice,
  value,
  name,
  onChange
}: {
  initialPrice: number;
  value: number;
  name: string;
  onChange?: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState(String(initialPrice));

  useEffect(() => {
    if (typeof value === "undefined") return;
    setInputValue(String(value));
  }, [value]);

  const inputId = "PriceRangeSliderInput-" + name;

  return (
    <div className={styles.PriceRangeSliderInputWrapper}>
      <label htmlFor={inputId} className={styles.PriceRangeSliderInputLabel}>
        Mínimo
      </label>
      <div
        className={`${styles.PriceRangeSliderInputControl} ${
          inputValue === "" ? styles.PriceRangeSliderInputControlEmpty : ""
        }`}
      >
        <span className={styles.PriceRangeSliderInputControlSign}>$</span>
        <PriceLayout
          price={value}
          rounding
          showPrefix={false}
          decimalScale={0}
          renderText={(price, currency) => (
            <>
              <input
                type="text"
                value={inputValue}
                style={{
                  width:
                    (inputValue.length || String(initialPrice).length) + ".2ch",
                  marginRight:
                    (4 - (inputValue.length || String(initialPrice).length)) /
                      10 +
                    "em"
                }}
                name={inputId}
                id={inputId}
                className={styles.PriceRangeSliderInput}
                placeholder={String(initialPrice)}
                onChange={({ target: { value } }) => {
                  setInputValue(value);
                  if (value === "") return;
                  onChange(value);
                }}
              />
              <span>{currency}</span>
            </>
          )}
        />
      </div>
    </div>
  );
}

function PriceRangeSlider({
  min = 0,
  max = 100,
  values,
  onValuesUpdated = function () {}
}: PriceRangeSliderProps) {
  const [low, high] = values;

  return (
    <div className={styles.PriceRangeSlider}>
      <RangeSlider
        min={min}
        max={max}
        values={values}
        onValuesUpdated={onValuesUpdated}
        className={styles.PriceRangeSliderSlider}
      />
      <div className={styles.PriceRangeSliderInputs}>
        <PriceRangeSliderInput
          initialPrice={min}
          value={low}
          name="minimum"
          onChange={(value) => {
            let newLow = Number(value);
            if (value !== "" && newLow < min) newLow = min;
            else if (newLow > max) newLow = max;
            onValuesUpdated({ values: [newLow, high] });
          }}
        />
        <span className={styles.PriceRangeSliderInputsSeparator}>-</span>
        <PriceRangeSliderInput
          initialPrice={max}
          value={high}
          name="maximum"
          onChange={(value) => {
            let newHigh = Number(value);
            if (newHigh < min) newHigh = min;
            else if (newHigh > max) newHigh = max;
            onValuesUpdated({ values: [low, newHigh] });
          }}
        />
      </div>
    </div>
  );
}

export { PriceRangeSlider };
