import React, { Component } from "react";
import { paymentsOperations } from "../../../state/ducks/payments";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";

import { AVAILABLE_CURRENCIES } from "../currency-dropdown/constants";
import Maybe from "../../common/helpers/maybe";

class ContractPriceLayout extends Component {
  rounding() {
    const res = AVAILABLE_CURRENCIES.find(
      (item) => item.name === this.props.currency
    );

    if (this.props.price < res.round) {
      return res.round;
    } else {
      return Math.round(this.props.price / res.round) * res.round;
    }
  }

  getConvertedPrice(price) {
    if (this.props.currencyExchangeData.to === "USD") return price;

    const convertedPrice = Math.ceil(
      price * (this.props.currencyExchangeData.rate || 1)
    );

    const round = parseFloat(
      AVAILABLE_CURRENCIES.find(
        (item) => item.name === this.props.currencyExchangeData.to
      )?.round
    );

    return convertedPrice < round
      ? round
      : round + convertedPrice - (convertedPrice % round);
  }

  getPriceFormat() {
    const celebrityDiscountAmount =
      this.props.contractPrice * this.props.celebrityDiscountPercentage;
    const price = this.getConvertedPrice(
      this.props.price - celebrityDiscountAmount
    );

    return (
      <NumberFormat
        value={price ? (this.props.rounding ? this.rounding() : price) : 0}
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={2}
        prefix={
          AVAILABLE_CURRENCIES.find(
            (item) => item.name === this.props.currencyExchangeData.to
          )["symbol"]
        }
        renderText={(value) => (
          <h5 className="font-weight-bold">
            {value} {this.props.currencyExchangeData.to}
          </h5>
        )}
      />
    );
  }

  getFormattedPrice(price = 0, currencyName) {
    return (
      <NumberFormat
        value={price || 0}
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={2}
        prefix={
          AVAILABLE_CURRENCIES.find((item) => item.name === currencyName)?.[
            "symbol"
          ]
        }
        renderText={(value) => `${value} ${currencyName}`}
      />
    );
  }

  render() {
    const celebrityDiscountAmount =
      this.props.contractPrice * this.props.celebrityDiscountPercentage;

    const hasCelebrityDiscount = this.props.celebrityDiscountPercentage > 0;

    const finalPrice = (
      <div
        style={{ width: "100%" }}
        className="d-flex justify-content-between "
      >
        <span>
          Total:
          <br />
          {this.props.currencyExchangeData.to !== this.props.currency ? (
            <span style={{ fontSize: "10px", lineHeight: "1" }}>
              El valor en {this.props.currencyExchangeData.to} es aproximado{" "}
              <br />
              El cobro que se hará en dólares es:{" "}
              <span>
                {this.getFormattedPrice(
                  this.props.price - celebrityDiscountAmount,
                  this.props.currency
                )}
              </span>
            </span>
          ) : null}
        </span>
        {this.getPriceFormat()}
      </div>
    );
    const celebrityDiscountPercentage = (
      <Maybe it={hasCelebrityDiscount}>
        <div className="d-flex justify-content-between ">
          <span className="float-left">Descuento: </span>{" "}
          <span className="text-danger font-weight-bold">
            -{(this.props.celebrityDiscountPercentage * 100).toFixed()}% |{" "}
            {this.props.currencyExchangeData.to !== this.props.currency ? (
              this.getFormattedPrice(
                this.getConvertedPrice(
                  parseFloat(celebrityDiscountAmount).toFixed(2)
                ),
                this.props.currencyExchangeData.to
              )
            ) : (
              <>
                ${celebrityDiscountAmount.toFixed(2)} {this.props.currency}
              </>
            )}
          </span>
        </div>
      </Maybe>
    );
    const originalPrice =
      this.props.availableDiscount || hasCelebrityDiscount ? (
        <div className="d-flex  justify-content-between ">
          <span> Precio original: </span>
          <span className="text-dark">
            {this.props.currencyExchangeData.to !== this.props.currency
              ? this.getFormattedPrice(
                  this.getConvertedPrice(
                    this.props.availableDiscount.initialPrice ||
                      this.props.contractPrice
                  ),
                  this.props.currencyExchangeData.to
                )
              : `$${
                  this.props.availableDiscount.initialPrice ||
                  this.props.contractPrice
                } ${this.props.currency}`}
          </span>{" "}
        </div>
      ) : null;
    const discountValue = this.props.availableDiscount ? (
      <div className="d-flex justify-content-between ">
        <span className="float-left">
          {hasCelebrityDiscount ? "Cupón: " : "Descuento: "}
        </span>{" "}
        <span className="text-danger font-weight-bold">
          {this.props.availableDiscount.isPercentageDiscount ? (
            <>
              -{(this.props.availableDiscount.discountAmount * 100).toFixed()}%
              |{" "}
              {this.props.currencyExchangeData.to !== this.props.currency ? (
                this.getFormattedPrice(
                  this.getConvertedPrice(
                    parseFloat(
                      (
                        this.props.availableDiscount.discountAmount *
                        this.props.availableDiscount.initialPrice
                      ).toFixed(2)
                    )
                  ),
                  this.props.currencyExchangeData.to
                )
              ) : (
                <>
                  $
                  {(
                    this.props.availableDiscount.discountAmount *
                    this.props.availableDiscount.initialPrice
                  ).toFixed(2)}{" "}
                  {this.props.currency}
                </>
              )}
            </>
          ) : this.props.currencyExchangeData.to !== this.props.currency ? (
            this.getFormattedPrice(
              this.getConvertedPrice(
                this.props.availableDiscount.discountAmount
              ),
              this.props.currencyExchangeData.to
            )
          ) : (
            <>
              ${this.props.availableDiscount.discountAmount}{" "}
              {this.props.currency}
            </>
          )}
        </span>
      </div>
    ) : null;
    return (
      <div style={{ width: "100%" }}>
        {originalPrice}
        {discountValue}
        {celebrityDiscountPercentage}
        {finalPrice}
      </div>
    );
  }
}

// Set propTypes
ContractPriceLayout.propTypes = {};

// Set defaultProps
ContractPriceLayout.defaultProps = {
  classes: "",
  price: 0,
  currency: "USD",
  rounding: false
};

// mapStateToProps
const mapStateToProps = (state) => ({
  currencyExchangeLoading: state.payments.currencyExchangeReducer.loading,
  currencyExchangeData: state.payments.currencyExchangeReducer.data,
  couponData: state.payments.fetchDiscountCouponReducer,
  currencyExchangeData: state.payments.currencyExchangeReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
  currencyExchange: paymentsOperations.currencyExchange,
  clearCouponData: paymentsOperations.clearCouponData
};

// Export Class
const _ContractPriceLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractPriceLayout);
export { _ContractPriceLayout as ContractPriceLayout };
