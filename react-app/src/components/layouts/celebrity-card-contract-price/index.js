import React, { Component } from "react";
import { paymentsOperations } from "../../../state/ducks/payments";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
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

  renderText(value) {
    if (this.props.availableDiscount) {
      return (
        <div>
          <span className={this.props.classes}>
            {" "}
            Precio original:{" "}
            <span className="text-dark">
              {this.props.availableDiscount.initialPrice} {this.props.currency}
            </span>
          </span>{" "}
          <br></br>
          <span className={this.props.classes}>
            Descuento:{" "}
            <span className="text-danger">
              {this.props.availableDiscount.isPercentageDiscount
                ? ` ${this.props.availableDiscount.discountAmount}% | ${(
                    (this.props.availableDiscount.discountAmount / 100) *
                    this.props.price
                  ).toFixed(2)} ${this.props.currency}`
                : ` ${this.props.availableDiscount.discountAmount} ${this.props.currency}`}{" "}
            </span>
          </span>
          <br></br>
          <span className={this.props.classes}>
            Precio total: {value} {this.props.currency}
          </span>
          <br></br>
        </div>
      );
    } else {
      return (
        <span className={this.props.classes}>
          {" "}
          {value} {this.props.currency}
        </span>
      );
    }
  }

  render() {
    return (
      <NumberFormat
        value={
          this.props.price
            ? this.props.rounding
              ? this.rounding()
              : this.props.price
            : 0
        }
        displayType={"text"}
        thousandSeparator={true}
        decimalScale={2}
        prefix={
          AVAILABLE_CURRENCIES.find(
            (item) => item.name === this.props.currency
          )["symbol"]
        }
        renderText={(value) => this.renderText(value)}
      />
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
const mapStateToProps = (state: any) => ({
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
