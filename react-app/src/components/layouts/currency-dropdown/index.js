import React from "react";
import { connect } from "react-redux";
import { AVAILABLE_CURRENCIES } from "./constants";
import { currencyExchange } from "../../../state/ducks/payments/actions";
import findAvailableCurrencyByName from "../../../utils/findAvailableCurrencyByName";
import { CurrencyIcon } from "../../common/icons";
import styles from "./styles.module.scss";
import { Dropdown } from "../../common/button/dropdown";
import classes from "classnames";

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
      from: currencyExchangeData.to?.name || "USD",
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

// const mapStateToProps = ({ payments: { currencyExchangeReducer } }) => ({
//   currencyExchangeLoading: currencyExchangeReducer.loading,
//   currencyExchangeData: currencyExchangeReducer.data
// });

// const mapDispatchToProps = { currencyExchange };

// const defaultCurrencyExchangeData = { to: "USD" };
// const defaultCurrencyExchange = () => {};

// const CurrencyDropdownLayout = ({
//   currencyExchange = defaultCurrencyExchange,
//   currencyExchangeData = defaultCurrencyExchangeData
// }) => {
//   const handleCurrentCurrency = ({ target: { value } }) => {
//     const newCurrencyExchange = findAvailableCurrencyByName(value);
//     currencyExchange({
//       from: currencyExchangeData.to.name,
//       to: newCurrencyExchange.name
//     });
//     GTM.tagManagerDataLayer("CLICK_ON_DROPDOWN_CURRENCY", newCurrencyExchange);
//   };

//   const currentCurrency = findAvailableCurrencyByName(currencyExchangeData.to);

//   return (
//     <div className="CurrencyDropdownLayout">
//       <svg
//         data-v-19e79a88=""
//         xmlns="http://www.w3.org/2000/svg"
//         width="100"
//         height="24"
//         viewBox="0 0 24 24"
//       >
//         <path
//           data-v-19e79a88=""
//           d="M16.293 9.293L12 13.586 7.707 9.293 6.293 10.707 12 16.414 17.707 10.707z"
//         />
//       </svg>
//       <img src={currentCurrency.flag} alt={currentCurrency.label} />
//       <select
//         className="font-weight-bold"
//         value={currentCurrency.name}
//         onChange={handleCurrentCurrency}
//       >
//         {AVAILABLE_CURRENCIES.map((item, index) => {
//           return (
//             <option key={index} value={item.name}>
//               {item.name}
//             </option>
//           );
//         })}
//       </select>
//     </div>
//   );
// };

const _CurrencyDropdownLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyDropdownLayout);

export { _CurrencyDropdownLayout as CurrencyDropdownLayout };
