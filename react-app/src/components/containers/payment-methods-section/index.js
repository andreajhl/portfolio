import React, { Component } from "react";
import { connect } from "react-redux";
import { ContractCheckoutSummary } from "../../containers/contract-checkout-summary";
import { AvailablePaymentMethods } from "../../containers/available-payment-methods";
import * as ROUTING_PATHS from "../../../routing/Paths";
import { FormattedMessage } from "react-intl";
import { CurrencyDropdownSelect } from "../../../components/currency-select-for-payment";
import { withRouter } from "next/router";
import { LoaderLayout } from "../../layouts/loader";
import { secure_payment_img } from "constants/external_assets_by_lang";
import { listPaymentGateways } from "../../../state/ducks/payments/operations";

class PaymentMethodsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCurrencySelected: this.props.currencyExchangeData.to
    };
  }

  handlerCurrencySelectedChange = (newCurrency) => {
    this.setState({
      ...this.state,
      currentCurrencySelected: newCurrency
    });
  };
  componentDidMount() {
    this.getPaymentsGatewaysMethods(this.props.currencyExchangeData.to);
  }
  getPaymentsGatewaysMethods = (currency) => {
    this.props.listPaymentGateways(currency);
  };

  render() {
    const isLoading = !this.props.contractData.reference;
    return (
      <div
        className="PaymentMethodsSection"
        style={
          isLoading
            ? {
                opacity: "0.3",
                pointerEvents: "none"
              }
            : null
        }
      >
        <div
          className={"row justify-content-center payment-methods-section-row"}
          style={{
            minHeight: "80vh"
          }}
        >
          <div
            className="col-12 col-md-8 p-0 mx-0 mb-4 mt-2 f-rounded f-shadow"
            style={{
              minHeight: "80vh"
            }}
          >
            {/* CONTRACT SUMMARY */}
            <div
              className="col-12 col-md-12 col-lg-8 col-xl-6 mx-auto mt-5"
              style={{
                maxWidth: "440px"
              }}
            >
              <ContractCheckoutSummary
                celebrityAvatar={this.props.contractData.celebrity_avatar}
                celebrityFullName={this.props.contractData.celebrity_full_name}
                deliveryFrom={this.props.contractData.delivery_from}
                deliveryTo={this.props.contractData.delivery_to}
                instructions={this.props.contractData.instructions}
                price={this.props.contractData.price}
                contractReference={this.props.contractData.reference}
                celebrityDiscountPercentage={
                  this.props.contractData.discount_percentage
                }
                originalPrice={this.props.contractData.original_price}
              />
            </div>
            {this.props.currencyExchangeLoading ? (
              <div
                style={{ minHeight: "10vh" }}
                className="d-flex justify-content-center align-items-center  "
              >
                <LoaderLayout></LoaderLayout>
              </div>
            ) : (
              <React.Fragment>
                {/* // PAYMENT METHODS */}
                <AvailablePaymentMethods
                  currentCurrencySelected={this.state.currentCurrencySelected}
                  contractReference={this.props.contractData.reference}
                  contractPrice={this.props.contractData.price}
                />
                {/* // TERMS */}
                <div className={"p-4 text-center"}>
                  <small
                    className={"text-muted text-center"}
                    style={{ color: "#838383" }}
                  >
                    <FormattedMessage
                      defaultMessage="Al continuar estás aceptando nuestros <linkTerms>  Términos y Condiciones </linkTerms>  y nuestra <linkPolicies> Política de Privacidad </linkPolicies> "
                      values={{
                        linkPolicies: (chunks) => (
                          <a
                            rel="noreferrer"
                            href={ROUTING_PATHS.POLICIES_PATH}
                            style={{
                              color: "#838383",
                              textDecorationLine: "underline"
                            }}
                            target={"_blank"}
                          >
                            {chunks}
                          </a>
                        ),
                        linkTerms: (chunks) => (
                          <a
                            rel="noreferrer"
                            target={"_blank"}
                            style={{
                              color: "#838383",
                              textDecorationLine: "underline"
                            }}
                            href={ROUTING_PATHS.TERMS_PATH}
                          >
                            {chunks}
                          </a>
                        )
                      }}
                    />
                  </small>
                  <div className="mt-2 mx-auto text-center">
                    <img
                      width="230px"
                      src={secure_payment_img[this.props.router?.locale]}
                      alt={"pago-seguro"}
                    />
                  </div>
                  <br />
                </div>
              </React.Fragment>
            )}

            {/* HELP */}
            {/*<div className={"mb-4 text-center"}>*/}
            {/*    <small className={"font-weight-light"}>¿Necesitas ayuda?</small>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    );
  }
}

// Set propTypes
PaymentMethodsSection.propTypes = {};

// Set defaultProps
PaymentMethodsSection.defaultProps = {
  contractData: {}
};
// mapStateToProps
const mapStateToProps = ({
  payments: { currencyExchangeReducer, fetchPaymentGatewaysReducer }
}) => ({
  currencyExchangeLoading: currencyExchangeReducer.loading,
  paymentGatewayLoading: fetchPaymentGatewaysReducer.loading,
  currencyExchangeData: currencyExchangeReducer.data
});

const _PaymentMethodsSection = connect(mapStateToProps, {
  listPaymentGateways
})(withRouter(PaymentMethodsSection));

// Export Class
export { _PaymentMethodsSection as PaymentMethodsSection };
