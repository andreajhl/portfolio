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
          <h5 className={this.props.classes}>
            {" "}
            {value} {this.props.currency}
          </h5>
        )}
      />
    );
  }

  render() {
    const finalPrice = (
      <div>
        <h5 className="font-weight-bold float-left">Total:</h5>
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
