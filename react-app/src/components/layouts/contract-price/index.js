import React, { Component } from "react";
import { paymentsOperations } from "../../../state/ducks/payments";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import { AVAILABLE_CURRENCIES } from "react-app/src/constants/availableCurrencies";

class ContractPriceLayout extends Component {
  rounding() {
    const res = AVAILABLE_CURRENCIES.find(
      (item) => item.name === this.props.currency
    );
    const round = parseFloat(res.round);
    if (this.props.price < round) {
      return round;
    } else {
      return round + this.props.price - (this.props.price % round);
      // return Math.round(this.props.price / res.round) * res.round;
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
        renderText={(value) => (
          <span className={this.props.classes}>
            {" "}
            {value} {this.props.currency}
          </span>
        )}
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
