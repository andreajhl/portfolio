import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { paymentsOperations } from "../../../state/ducks/payments";
import { ContractPriceLayout } from "../../layouts/contract-price";
import { injectIntl, defineMessage } from "react-intl";

const inputCouponPlaceholder = defineMessage({
  defaultMessage: "Ingrese el código aquí",
});

const mapStateToProps = ({ payments }) => ({
  contract: payments.getContractToPayReducer.data,
  couponData: payments.fetchDiscountCouponReducer,
  currencyExchangeData: payments.currencyExchangeReducer.data,
});
// mapStateToProps
const mapDispatchToProps = {
  checkoutDiscountCoupon: paymentsOperations.discountCouponsGateways,
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discountCoupon: "",
    };
  }

  handleErrorMessage = (message) => {
    const error = message.split(" ");
    if (error[0] === "MINIMUN_PURCHASE_ERROR") {
      const minimumPurchaseAmount = parseInt(error[1]);
      let contractPrice = minimumPurchaseAmount;
      if (this.props.currencyExchangeData.rate) {
        contractPrice =
          minimumPurchaseAmount * this.props.currencyExchangeData.rate;
      }
      return (
        <React.Fragment>
          Este cupón es válido para compras mayores o iguales a
          <ContractPriceLayout
            classes="font-weight-bold text-danger coupon-error"
            price={contractPrice}
            currency={this.props.currencyExchangeData.to}
            rounding={true}
          />
        </React.Fragment>
      );
    } else {
      return message;
    }
  };

  handleChange = (event) => {
    this.setState({ discountCoupon: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.checkoutDiscountCoupon(
      this.props.contract.reference,
      this.state.discountCoupon
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="coupon-container">
        <label htmlFor="coupon-input">
          <FormattedMessage defaultMessage="¿Tienes un cupón de descuento?" />
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={this.props.intl.formatMessage(inputCouponPlaceholder)}
            aria-label=""
            aria-describedby="basic-addon1"
            id="coupon-input"
            value={this.state.discountCoupon}
            onChange={(event) => this.handleChange(event)}
          />
          {this.props.couponData.completed ? (
            <div className="input-group-append">
              <span className="input-group-text text-success">
                <FormattedMessage defaultMessage="CUPÓN AGREGADO" />
              </span>
            </div>
          ) : (
            <div className="input-group-append">
              <button
                className="btn btn-primary button-discount-coupon-form"
                type="submit"
              >
                <FormattedMessage defaultMessage="Aplicar" />
              </button>
            </div>
          )}
        </div>
        <span className="font-weight-bold text-danger coupon-error">
          {this.props.couponData.error_data ? (
            <React.Fragment>
              <span className="font-weight-bold text-danger">
                <FormattedMessage defaultMessage="CUPÓN NO VALIDO:" />{" "}
              </span>
              {this.handleErrorMessage(this.props.couponData.error_data)}
            </React.Fragment>
          ) : null}
        </span>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(index));
