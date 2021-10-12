import {RangeSlider,RangeSliderProps} from "react-app/src/components/containers/range-slider";
import { PriceRangeSliderInput } from "react-app/src/components/containers/price-slider-input";
import {RangeGraphi} from 'react-app/src/components/containers/range-graphic';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {rangeSliderLogLinear} from 'lib/utils/rangeSliderLogLinear.js';  
import usePriceConverter from "lib/hooks/usePriceConverter";
import {rankValueGraphi} from 'lib/utils/rankGraphi'
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import debounce from "lodash.debounce";

type PriceRangeSliderProps = {
  min?: number;
  max?: number;
} & Omit<RangeSliderProps, "algorithm" | "isTouched">;

const rankPriceState= ({celebrities})=> celebrities.rankPriceCelebrity

function PriceRangeSlider({
  min = 0,
  max = 100,
  values = [min, max],
  setValues = function () {},
  isTouched,
  changeIsTouched,
  onChange,
  onClick = function () {},
}: PriceRangeSliderProps) {

  const [low, high] = values;
  var rankGraphi= useSelector(rankPriceState);
  const currentCurrencyRef = useRef<string>();
  const [rank,setRank]=useState(rankGraphi)
  const [minInputValue, setMinInputValue] = useState("");
  const [maxInputValue, setMaxInputValue] = useState("");
  const debouncedOnChange = useMemo(() => debounce(onChange, 500), []); 
   const { getExchangePrice, getOriginalPrice, currency } = usePriceConverter();

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
  }, [currency, updateInputValues]);

  useEffect(() => {
    let rank=rankValueGraphi(rankGraphi)
    rank=rank.map(e=>({price:getExchangePrice(e.price),percentage:e.percentage}))
    setRank(rank)
    setMinInputValue(String(rank[0].price));
    setMaxInputValue(String(rank[rank.length-1].price));
  }, [rankGraphi,getExchangePrice])

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
      <RangeGraphi 
        maxInputValue={maxInputValue} 
        minInputValue={minInputValue} 
        max={getExchangePrice(max)}
        rankGraphi={rank}
      />
      <RangeSlider
        max={max}
        min={min}
        algorithm={rangeSliderLogLinear}
        values={values}
        isTouched={isTouched}
        onValuesUpdated={changeValues}
        onClick={onClickAfterChangeIsTouched}
        onChange={onChange}
        pitPoints={rank.map(e=>e.price)}
        className={styles.PriceRangeSliderSlider}
      />
      <div className={styles.PriceRangeSliderInputs}>
            <PriceRangeSliderInput
            label={<FormattedMessage defaultMessage="Precio Mínimo" />}
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
            label={<FormattedMessage defaultMessage="Precio Máximo" />}
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
  