import { AVAILABLE_CURRENCIES } from "desktop-app/constants/availableCurrencies";
import { useCallback } from "react";
import { RootState } from "react-app/src/state/store";
import { useSelector } from "react-redux";

const currencyDataSelector = ({
  payments: { currencyExchangeReducer },
}: RootState) => currencyExchangeReducer.data;

function getCurrencyInfo(currencyData: any) {
  const currencyName = currencyData?.to || "USD";
  return AVAILABLE_CURRENCIES.find((item) => item.name === currencyName);
}

const roundPrice = (price: number, round: number): number => {
  if (price <= round) return round;
  const basePrice = round > 1 ? round + price : price;
  return basePrice - (price % round);
};

type OptionsType = { rounding?: boolean; decimalScale?: number };
type PriceConverterType = (price: number, options?: OptionsType) => number;

function usePriceConverter() {
  const currencyData = useSelector(currencyDataSelector);

  const currencyInfo = getCurrencyInfo(currencyData);

  const getExchangePrice: PriceConverterType = useCallback(
    (price, { rounding = false, decimalScale = 0 } = {}) => {
      const exchangePrice = currencyData.rate
        ? price * currencyData.rate
        : price;
      const roundedPrice = rounding
        ? roundPrice(exchangePrice, parseFloat(currencyInfo.round))
        : exchangePrice;
      return parseFloat(roundedPrice.toFixed(decimalScale));
    },
    [currencyData.rate, currencyInfo.round]
  );

  const getOriginalPrice: PriceConverterType = useCallback(
    (price: number, { rounding = false, decimalScale = 0 } = {}) => {
      const originalPrice = currencyData.rate
        ? price / currencyData.rate
        : price;
      const roundedPrice = rounding
        ? roundPrice(originalPrice, 1)
        : originalPrice;
      return parseFloat(roundedPrice.toFixed(decimalScale));
    },
    [currencyData.rate]
  );

  return { getExchangePrice, getOriginalPrice, currency: currencyInfo.name };
}

export default usePriceConverter;
