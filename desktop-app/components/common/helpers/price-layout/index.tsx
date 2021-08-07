import { ReactNode } from "react";
import { AVAILABLE_CURRENCIES } from "../../../../constants/availableCurrencies";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";

const mapStateToProps = ({ payments: { currencyExchangeReducer } }) => ({
  currencyData: currencyExchangeReducer.data,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export type PriceLayoutProps = {
  price?: number;
  rounding?: boolean;
  showPrefix?: boolean;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
  renderText?: (formattedValue: string, suffix?: string) => ReactNode;
} & StateProps;

const roundPrice = (price: number, round: number): number => {
  if (price <= round) return round;
  const basePrice = round > 1 ? round + price : price;
  return basePrice - (price % round);
};

const defaultCurrencyData = { to: "USD" };

const PriceLayout = ({
  price = 0,
  rounding = false,
  currencyData = defaultCurrencyData,
  showPrefix = true,
  fixedDecimalScale = true,
  decimalScale = 2,
  renderText = (formattedValue, suffix) => `${formattedValue} ${suffix}`,
}: PriceLayoutProps) => {
  const currencyInfo = AVAILABLE_CURRENCIES.find(
    (item) => item.name === currencyData.to
  );

  const exchangePrice = currencyData.rate ? price * currencyData.rate : price;

  const prefix = showPrefix ? currencyInfo["symbol"] : null;

  return (
    <NumberFormat
      value={
        rounding
          ? roundPrice(exchangePrice, parseFloat(currencyInfo.round))
          : exchangePrice
      }
      displayType={"text"}
      thousandSeparator
      decimalScale={decimalScale}
      fixedDecimalScale={fixedDecimalScale}
      prefix={prefix}
      renderText={(formattedValue) =>
        renderText(formattedValue, currencyInfo.name)
      }
    />
  );
};

const _PriceLayout = connect(mapStateToProps)(PriceLayout);

export default PriceLayout;

export { _PriceLayout as PriceLayout };
