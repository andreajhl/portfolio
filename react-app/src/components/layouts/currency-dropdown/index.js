import React from "react";
import { connect } from "react-redux";
import { AVAILABLE_CURRENCIES } from "./constants";
import { currencyExchange } from "../../../state/ducks/payments/actions";
import findAvailableCurrencyByName from "../../../utils/findAvailableCurrencyByName";
import { CurrencyIcon } from "../../common/icons";
import styles from "./styles.module.scss";
import classes from "classnames";
import Popup from "reactjs-popup";

const mapStateToProps = ({ payments: { currencyExchangeReducer } }) => ({
  currencyExchangeLoading: currencyExchangeReducer.loading,
  currencyExchangeData: currencyExchangeReducer.data
});

const mapDispatchToProps = { currencyExchange };

const defaultCurrencyExchangeData = { to: "USD" };
const defaultCurrencyExchange = (params) => {};

function CurrencyDropdownLayout({
  currencyExchange = defaultCurrencyExchange,
  currencyExchangeData = defaultCurrencyExchangeData
}) {
  const handleCurrentCurrency = (value) => {
    const newCurrencyExchange = findAvailableCurrencyByName(value);
    currencyExchange({
      from: currencyExchangeData?.from || "USD",
      to: newCurrencyExchange.name
    });
    // GTM.tagManagerDataLayer("CLICK_ON_DROPDOWN_CURRENCY", newCurrencyExchange);
  };

  const currentCurrency = findAvailableCurrencyByName(currencyExchangeData.to);

  return (
    <Popup
      arrow={false}
      position="left top"
      trigger={(props) => (
        <button className={classes("btn btn-outline", styles.ButtonDropdown)}>
          <CurrencyIcon />{" "}
        </button>
      )}
      closeOnDocumentClick
    >
      <div className={styles.CurrencyDropdownMenu}>
        {AVAILABLE_CURRENCIES.map(({ name, flag }) => (
          <div
            className={classes(
              styles.CurrencyDropdownItem,
              currentCurrency?.name === name &&
                styles.CurrencyDropdownItemActive
            )}
            key={name}
            onClick={() => handleCurrentCurrency(name)}
          >
            <img
              src={flag}
              alt={`Bandera de ${name}`}
              className={styles.CurrencyDropdownFlag}
            />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </Popup>
  );
}

const _CurrencyDropdownLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyDropdownLayout);

export { _CurrencyDropdownLayout as CurrencyDropdownLayout };
