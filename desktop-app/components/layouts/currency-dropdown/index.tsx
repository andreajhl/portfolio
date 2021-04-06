import { Dropdown } from "../../common/button/dropdown";
import { CurrencyIcon } from "desktop-app/components/common/icons";
import { NavLink as div } from "desktop-app/components/common/routing/nav-link";
import styles from "./styles.module.scss";
import { AVAILABLE_CURRENCIES } from "desktop-app/constants/availableCurrencies";
import { connect } from "react-redux";
import findAvailableCurrencyByName from "react-app/src/utils/findAvailableCurrencyByName";
import { currencyExchange } from "react-app/src/state/ducks/payments/actions";
import classes from "classnames";

const mapStateToProps = ({ payments: { currencyExchangeReducer } }) => ({
  currencyExchangeLoading: currencyExchangeReducer.loading,
  currencyExchangeData: currencyExchangeReducer.data
});

const mapDispatchToProps = { currencyExchange };

const defaultCurrencyExchangeData = { to: "USD" };
const defaultCurrencyExchange = (params: any) => {};

function CurrencyDropdown({
  currencyExchange = defaultCurrencyExchange,
  currencyExchangeData = defaultCurrencyExchangeData
}) {
  const handleCurrentCurrency = (value) => {
    const newCurrencyExchange = findAvailableCurrencyByName(value);
    currencyExchange({
      from: (currencyExchangeData.to as any)?.name || "USD",
      to: newCurrencyExchange.name
    });
    // GTM.tagManagerDataLayer("CLICK_ON_DROPDOWN_CURRENCY", newCurrencyExchange);
  };

  const currentCurrency = findAvailableCurrencyByName(currencyExchangeData.to);

  return (
    <Dropdown
      buttonChildren={<CurrencyIcon />}
      buttonClassName="p-0"
      menuClassName={styles.CurrencyDropdownMenu}
      showClassName={styles.CurrencyDropdownMenuShow}
    >
      {AVAILABLE_CURRENCIES.map(({ name, flag }) => (
        <div
          className={classes(
            styles.CurrencyDropdownItem,
            currentCurrency?.name === name && styles.CurrencyDropdownItemActive
          )}
          key={name}
          onClick={() => handleCurrentCurrency(name)}
        >
          <img
            src={flag}
            alt={`Bandera de ${name}`}
            className={styles.CurrencyDropdownFlag}
          />{" "}
          <span>{name}</span>
        </div>
      ))}
    </Dropdown>
  );
}

const _CurrencyDropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyDropdown);

export { _CurrencyDropdown as CurrencyDropdown };
