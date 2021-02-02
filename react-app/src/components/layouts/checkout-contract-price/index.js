import React, { Component } from "react";
import { paymentsOperations } from "../../../state/ducks/payments";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import "./styles.scss";
import { AVAILABLE_CURRENCIES } from "../currency-dropdown/constants";

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

  getPriceFormat() {
    let price = this.props.price;

    if (this.props.currencyExchangeData.to !== "USD") {
      const convertedPrice = Math.ceil(
        this.props.price * (this.props.currencyExchangeData.rate || 1)
      );

      const round = parseFloat(
        AVAILABLE_CURRENCIES.find(
          (item) => item.name === this.props.currencyExchangeData.to
        )?.round
      );

      price =
        convertedPrice < round
          ? round
          : round + convertedPrice - (convertedPrice % round);
    }

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
          <h5 className={this.props.classes}>
            {value} {this.props.currencyExchangeData.to}
          </h5>
        )}
      />
    );
  }

  getInitialPriceFormat() {
    return (
      <NumberFormat
        value={this.props.price || 0}
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={2}
        prefix={
          AVAILABLE_CURRENCIES.find((item) => item.name === "USD")["symbol"]
        }
        renderText={(value) => `${value} USD`}
      />
    );
  }

  render() {
    const finalPrice = (
      <div>
        <h5 className="font-weight-bold float-left text-left">
          Total:
          <br />
          {this.props.currencyExchangeData.to !== "USD" ? (
            <span style={{ fontSize: "10px", lineHeight: "1" }}>
              El valor en {this.props.currencyExchangeData.to} es aproximado{" "}
              <br />
              El cobro que se hará en dólares es: {this.getInitialPriceFormat()}
            </span>
          ) : null}
        </h5>
        {this.getPriceFormat()}
      </div>
    );
    const originalPrice = this.props.availableDiscount ? (
      <div>
        <span className="float-left"> Precio original: </span>
        <span className="text-dark float-right">
          {this.props.availableDiscount.initialPrice} {this.props.currency}
        </span>{" "}
        <br></br>
      </div>
    ) : null;
    const discountValue = this.props.availableDiscount ? (
      <div>
        <span className="float-left">Descuento: </span>{" "}
        <span className="text-danger">
          {this.props.availableDiscount.isPercentageDiscount
            ? `${(
                this.props.availableDiscount.discountAmount * 100
              ).toFixed()}% | ${(
                this.props.availableDiscount.discountAmount *
                this.props.availableDiscount.initialPrice
              ).toFixed(2)} ${this.props.currency}`
            : ` ${this.props.availableDiscount.discountAmount} ${this.props.currency}`}{" "}
        </span>
      </div>
    ) : null;
    return (
      <div style={{ width: "100%" }}>
        {discountValue}
        {originalPrice}
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
  currencyExchangeData: state.payments.currencyExchangeReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
  currencyExchange: paymentsOperations.currencyExchange
};

// Export Class
const _ContractPriceLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractPriceLayout);
export { _ContractPriceLayout as ContractPriceLayout };
