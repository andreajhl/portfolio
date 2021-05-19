import React, { useState } from "react";
import { connect } from "react-redux";
import { AVAILABLE_CURRENCIES } from "./constants";
import { currencyExchange } from "../../../state/ducks/payments/actions";
import findAvailableCurrencyByName from "../../../utils/findAvailableCurrencyByName";
import { CurrencyIcon } from "../../common/icons";
import styles from "./styles.module.scss";
import classes from "classnames";
import { Button, Modal } from "react-bootstrap";
import { LoaderLayout } from "../loader";
import * as GTM from "../../../state/utils/gtm";

const mapStateToProps = ({ payments: { currencyExchangeReducer } }) => ({
  currencyExchangeLoading: currencyExchangeReducer.loading,
  currencyExchangeData: currencyExchangeReducer.data,
});

const mapDispatchToProps = { currencyExchange };

const defaultCurrencyExchangeData = { to: "USD" };
const defaultCurrencyExchange = (params) => {};

const AVAILABLE_CURRENCIES_SORT = AVAILABLE_CURRENCIES.sort(function (a, b) {
  return a.label.localeCompare(b.label);
});

function CurrencyDropdownLayout({
  currencyExchange = defaultCurrencyExchange,
  currencyExchangeData = defaultCurrencyExchangeData,
  currencyExchangeLoading,
}) {
  const handleCurrentCurrency = (value) => {
    const newCurrencyExchange = findAvailableCurrencyByName(value);
    currencyExchange({
      from: currencyExchangeData?.from || "USD",
      to: newCurrencyExchange.name,
    });
    GTM.tagManagerDataLayer("CLICK_ON_DROPDOWN_CURRENCY", newCurrencyExchange);
  };
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className={classes("btn btn-outline", styles.ButtonDropdown)}
      >
        <CurrencyIcon />
      </button>
      <Modal
        show={open}
        onHide={closeModal}
        className="ModalSelect__modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Cambiar moneda
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className={`options-list pl-2 mb-0`}>
            {AVAILABLE_CURRENCIES_SORT.map((option) => {
              const optionKey = `${option.name}-${option.label}`;
              return (
                <li className="options-list__item" key={optionKey}>
                  <div
                    className={`custom-control form-control-lg custom-radio`}
                  >
                    <input
                      type="radio"
                      className="custom-control-input"
                      id={optionKey}
                      name={optionKey}
                      value={option.value}
                      disabled={currencyExchangeLoading}
                      onChange={() => handleCurrentCurrency(option.name)}
                      checked={currencyExchangeData?.to === option.name}
                    />
                    <label className="custom-control-label" htmlFor={optionKey}>
                      <span className="options-list__label">
                        {option.label}
                      </span>
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          {currencyExchangeLoading ? (
            <LoaderLayout></LoaderLayout>
          ) : (
            <Button onClick={closeModal}>Cerrar</Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

const _CurrencyDropdownLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyDropdownLayout);

export { _CurrencyDropdownLayout as CurrencyDropdownLayout };
