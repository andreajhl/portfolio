import React from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { AVAILABLE_CURRENCIES_FOR_PAYMENTS } from "../../../../constants/availableCurrencyForPayments";
import { currencyExchange } from "../../state/ducks/payments/actions";
import * as GTM from "../../state/utils/gtm";
import findAvailableCurrencyByName from "../../utils/findAvailableCurrencyByName";

const mapStateToProps = ({ payments: { currencyExchangeReducer } }) => ({
  currencyExchangeLoading: currencyExchangeReducer.loading,
  currencyExchangeData: currencyExchangeReducer.data,
});

const mapDispatchToProps = { currencyExchange };

const defaultCurrencyExchangeData = { to: "USD" };
const defaultCurrencyExchange = () => {};

const CurrencyDropdownSelect = ({
  currencyExchange = defaultCurrencyExchange,
  currencyExchangeData = defaultCurrencyExchangeData,
  available_currencies = AVAILABLE_CURRENCIES_FOR_PAYMENTS,
  className,
  onChangeCurrency,
}) => {
  const intl = useIntl();
  const handleCurrentCurrency = ({ target: { value } }) => {
    const newCurrencyExchange = findAvailableCurrencyByName(value);
    onChangeCurrency(newCurrencyExchange.name);
    currencyExchange({
      from: currencyExchangeData.to.name,
      to: newCurrencyExchange.name,
    });
    GTM.tagManagerDataLayer("CLICK_ON_DROPDOWN_CURRENCY", newCurrencyExchange);
  };

  const currentCurrency = findAvailableCurrencyByName(currencyExchangeData.to);

  return (
    <select
      style={{
        borderRadius: "10px",
        border: "0px",
        boxShadow: "0px 0px 10px rgb(0 0 0 / 10%)",
        textIndent: "10px",
        background: "white",
      }}
      className={`form-select font-weight-bold w-100 ${
        className ? className : ""
      }`}
      value={currentCurrency.name}
      onChange={(event) => handleCurrentCurrency(event)}
    >
      {available_currencies.map((item, index) => {
        return (
          <option key={index} value={item.name}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
};

const _CurrencyDropdownSelect = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyDropdownSelect);

export { _CurrencyDropdownSelect as CurrencyDropdownSelect };
