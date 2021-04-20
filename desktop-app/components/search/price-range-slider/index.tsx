import {
  RangeSlider,
  RangeSliderProps
} from "desktop-app/components/common/form/range-slider";
import { PriceLayout } from "desktop-app/components/common/helpers/price-layout";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

function PriceRangeSliderInput({
  initialPrice,
  value,
  name,
  onChange = function () {},
  isTouched = true
}: {
  initialPrice: number;
  value: number;
  name: string;
  isTouched?: boolean;
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
          inputValue === "" || !isTouched
            ? styles.PriceRangeSliderInputControlEmpty
            : ""
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
                    (inputValue.length || String(initialPrice).length) + ".5ch",
                  marginRight:
                    (4 - (inputValue.length || String(initialPrice).length)) /
                      10 +
                    "em"
                }}
                name={inputId}
                id={inputId}
                className={`${styles.PriceRangeSliderInput} ${
                  isTouched ? styles.PriceRangeSliderInputIsTouched : ""
                }`}
                placeholder={String(initialPrice)}
                onChange={({ target: { value } }) => {
                  const newValue = value.replace(/[^0-9.]/g, "");
                  setInputValue(newValue);
                  if (newValue === "") return;
                  onChange(newValue);
                }}
                onBlur={({ target: { value } }) => {
                  if (value !== "") return;
                  setInputValue(String(initialPrice));
                  onChange(String(initialPrice));
                }}
                autoComplete="off"
              />
              <span>{currency}</span>
            </>
          )}
        />
      </div>
    </div>
  );
}

type PriceRangeSliderProps = {
  min?: number;
  max?: number;
} & Omit<RangeSliderProps, "algorithm" | "isTouched">;

function PriceRangeSlider({
  min = 0,
  max = 100,
  values = [0, 100],
  setValues = function () {},
  onChange,
  onClick = function () {}
}: PriceRangeSliderProps) {
  const [isTouched, setIsTouched] = useState(false);

  const [low, high] = values;

  return (
    <div className={styles.PriceRangeSlider}>
      <RangeSlider
        min={min}
        max={max}
        values={values}
        isTouched={isTouched}
        onValuesUpdated={(state) => {
          if (!isTouched) setIsTouched(true);
          setValues(state.values);
        }}
        onClick={() => {
          if (!isTouched) setIsTouched(true);
          onClick();
        }}
        onChange={onChange}
        className={styles.PriceRangeSliderSlider}
      />
      <div className={styles.PriceRangeSliderInputs}>
        <PriceRangeSliderInput
          initialPrice={min}
          value={low}
          name="minimum"
          isTouched={isTouched}
          onChange={(value) => {
            if (!isTouched) setIsTouched(true);
            let newLow = Number(value);
            if (value !== "" && newLow < min) newLow = min;
            else if (newLow > max) newLow = max;
            setValues([newLow, high]);
            onChange({ values: [newLow, high] });
          }}
        />
        <span className={styles.PriceRangeSliderInputsSeparator}>-</span>
        <PriceRangeSliderInput
          initialPrice={max}
          value={high}
          name="maximum"
          isTouched={isTouched}
          onChange={(value) => {
            if (!isTouched) setIsTouched(true);
            let newHigh = Number(value);
            if (newHigh < min) newHigh = min;
            else if (newHigh > max) newHigh = max;
            setValues([low, newHigh]);
            onChange({ values: [low, newHigh] });
          }}
        />
      </div>
    </div>
  );
}

export { PriceRangeSlider };
