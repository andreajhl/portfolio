import React, { Component } from "react";
import { paymentsOperations } from "../../../state/ducks/payments";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";

import { AVAILABLE_CURRENCIES } from "../currency-dropdown/constants";
import { FormattedMessage } from "react-intl";
import Maybe from "../../common/helpers/maybe";

class ContractPriceLayout extends Component {
  returnDiscountAmount() {
    if (!this.props.couponData.data.isPercentageDiscount)
      return this.props.availableDiscount.discountAmount;

    const discount =
      Math.floor(
        this.props.availableDiscount.discountAmount *
          this.props.availableDiscount.initialPrice *
          100
      ) / 100;

    if (
      this.props.couponData.data.isPercentageDiscount &&
      discount > this.props.couponData.data.maxDiscountAmount
    ) {
      return this.props.couponData.data.maxDiscountAmount;
    } else {
      return discount;
    }
  }

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

    const convertedPrice = price * (this.props.currencyExchangeData.rate || 1);

    return convertedPrice;
  }

  getPriceFormat() {
    const price = this.getConvertedPrice(this.props.price);
    return (
      <NumberFormat
        value={price || 0}
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={0}
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
        decimalScale={0}
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
              <FormattedMessage
                defaultMessage="El valor en {currency} es aproximado"
                values={{
                  currency: this.props.currencyExchangeData.to
                }}
              />
              <br />
              <FormattedMessage defaultMessage="El cobro que se hará en dólares es:" />{" "}
              <span>
                {this.getFormattedPrice(this.props.price, this.props.currency)}
              </span>
            </span>
          ) : null}
        </span>
        {this.getPriceFormat()}
      </div>
    );

    const originalPrice =
      this.props.availableDiscount || hasCelebrityDiscount ? (
        <div className="d-flex  justify-content-between ">
          <span>
            <FormattedMessage defaultMessage="Precio original:" />
          </span>
          <span
            className={`text-${hasCelebrityDiscount ? "danger" : "dark"}`}
            style={
              hasCelebrityDiscount
                ? {
                    textDecoration: "line-through",
                    marginLeft: "auto",
                    marginRight: "0.4em"
                  }
                : null
            }
          >
            {this.props.currencyExchangeData.to !== this.props.currency ? (
              this.getFormattedPrice(
                this.getConvertedPrice(
                  hasCelebrityDiscount
                    ? this.props.originalPrice
                    : this.props.availableDiscount.initialPrice
                ),
                this.props.currencyExchangeData.to
              )
            ) : (
              <>
                {this.getFormattedPrice(
                  hasCelebrityDiscount
                    ? this.props.originalPrice
                    : this.props.availableDiscount.initialPrice,
                  this.props.currency
                )}
              </>
            )}
          </span>{" "}
          <Maybe it={hasCelebrityDiscount}>
            {this.props.currencyExchangeData.to !== this.props.currency
              ? this.getFormattedPrice(
                  this.getConvertedPrice(this.props.contractPrice),
                  this.props.currencyExchangeData.to
                )
              : this.getFormattedPrice(
                  this.props.contractPrice,
                  this.props.currency
                )}
          </Maybe>
        </div>
      ) : null;
    const discountValue = this.props.availableDiscount ? (
      <div className="d-flex justify-content-between ">
        <span className="float-left">
          <FormattedMessage defaultMessage="Descuento:" />
        </span>
        <span className="text-danger font-weight-bold">
          {this.props.availableDiscount.isPercentageDiscount ? (
            <>
              -{(this.props.availableDiscount.discountAmount * 100).toFixed(2)}%
              |{" "}
              {this.getFormattedPrice(
                this.getConvertedPrice(this.returnDiscountAmount()),
                this.props.currencyExchangeData.to
              )}
            </>
          ) : (
            this.getFormattedPrice(
              this.getConvertedPrice(this.returnDiscountAmount()),
              this.props.currencyExchangeData.to
            )
          )}
        </span>
      </div>
    ) : null;
    return (
      <div style={{ width: "100%" }}>
        {originalPrice}
        {discountValue}
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
  couponData: state.payments.fetchDiscountCouponReducer
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
