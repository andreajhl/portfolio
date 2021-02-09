import React, { Component } from "react";
import { PageContainer } from "../../layouts";
import { connect } from "react-redux";

import { paymentsOperations } from "../../../state/ducks/payments";
import * as GTM from "../../../state/utils/gtm";
import { StripeProvider } from "react-stripe-elements";
import { PaymentMethodsSection } from "../../containers/payment-methods-section";
import * as PATHS from "../../../routing/Paths";

class PaymentMethodsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getContractToPay(this.props.match.params.contract_reference);
    GTM.tagManagerDataLayer("PAYMENT_METHODS_PAGE_VIEW", this.props.match);
  }

  render() {
    return (
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
        <PageContainer
          applyFetchCelebrities={false}
          showSearch={false}
          showNavbarButtons={false}
          showSearchWeb={false}
          showInputSearchSm={false}
          showLogin={false}
          showFooter={false}
          hideControls={true}
          showBotMakerFrame
        >
          <PaymentMethodsSection contractData={this.props.contract} />
        </PageContainer>
      </StripeProvider>
    );
  }
}

// Set propTypes
PaymentMethodsPage.propTypes = {};

// Set defaultProps
PaymentMethodsPage.defaultProps = {
  contract: {}
};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.payments.getContractToPayReducer.loading,
  isCompleted: state.payments.getContractToPayReducer.completed,
  contract: state.payments.getContractToPayReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
  getContractToPay: paymentsOperations.getContractToPay
};

// Export Class
const _PaymentMethodsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMethodsPage);
export { _PaymentMethodsPage as PaymentMethodsPage };
