import { CurrencyIcon } from "desktop-app/components/common/icons";
import styles from "./styles.module.scss";
import { AVAILABLE_CURRENCIES } from "desktop-app/constants/availableCurrencies";
import { connect } from "react-redux";
import findAvailableCurrencyByName from "react-app/src/utils/findAvailableCurrencyByName";
import { currencyExchange } from "react-app/src/state/ducks/payments/actions";
import classes from "classnames";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import { analytics } from "react-app/src/state/utils/gtm";
import { CloseModalButton } from "desktop-app/components/common/button/close-modal-button";

const mapStateToProps = ({ payments: { currencyExchangeReducer } }) => ({
  currencyExchangeLoading: currencyExchangeReducer.loading,
  currencyExchangeData: currencyExchangeReducer.data,
});

const mapDispatchToProps = { currencyExchange };

const defaultCurrencyExchangeData = { to: "USD" };
const defaultCurrencyExchange = (params: any) => {};

const AVAILABLE_CURRENCIES_SORT = AVAILABLE_CURRENCIES.sort((a, b) =>
  a.label.localeCompare(b.label)
);

function CurrencyModal({
  currencyExchange = defaultCurrencyExchange,
  currencyExchangeData = defaultCurrencyExchangeData,
  currencyExchangeLoading,
}) {
  const handleCurrentCurrency = (value) => {
    const newCurrencyExchange = findAvailableCurrencyByName(value);
    currencyExchange({
      from: (currencyExchangeData.to as any)?.name || "USD",
      to: newCurrencyExchange.name,
    });
    analytics.track("CLICK_ON_DROPDOWN_CURRENCY", {
      previousCurrencyExchange: (currencyExchangeData.to as any).name || "USD",
      newCurrencyExchange,
    });
  };

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const toggleModal = () => setOpen((open) => !open);

  return (
    <>
      <button
        type="button"
        className={styles.ToggleButton}
        onClick={toggleModal}
      >
        <CurrencyIcon />
      </button>
      <Modal
        show={open}
        onHide={closeModal}
        className={classes("ModalSelect__modal", styles.CurrencyModal)}
        centered
      >
        <Modal.Header className={styles.ModalHeader}>
          <h3 className={styles.ModalTitle}>Cambiar moneda</h3>
          <CloseModalButton
            variant="light"
            className={styles.CurrencyDropdownCloseButton}
            onClick={closeModal}
            disabled={currencyExchangeLoading}
          />
        </Modal.Header>
        <Modal.Body>
          <ul
            className={classes(
              `options-list pl-2 mb-0 mt-1`,
              styles.OptionsLists
            )}
          >
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
                    <label
                      className={classes(
                        "custom-control-label",
                        styles.OptionsListsLabel
                      )}
                      htmlFor={optionKey}
                    >
                      <span
                        className={classes(
                          "options-list__label",
                          styles.OptionsListsLabelSpan
                        )}
                      >
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
          <Button
            className={styles.BottomCloseButton}
            onClick={closeModal}
            disabled={currencyExchangeLoading}
          >
            <SubmitText
              baseText="Cerrar"
              status={currencyExchangeLoading ? "loading" : "idle"}
            />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const _CurrencyModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyModal);

export { _CurrencyModal as CurrencyModal };
