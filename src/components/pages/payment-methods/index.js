import React, { Component } from "react";
import { PageContainer } from "../../layouts";
import { connect } from "react-redux";
import "./styles.scss";
import { paymentsOperations } from "../../../state/ducks/payments";
import { CheckoutSectionForm } from "../../containers/checkout-section-form";

class PaymentMethodsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {
        showContractPayedSection: this.props.contract.status >= 10
      }
    };
  }

  componentDidMount() {
    this.props.getContractToPay(this.props.match.params.contract_reference);
  }

  render() {
    return (
      <>
        <div className="PaymentMethodsPage">
          <PageContainer
            fetchCelebrities={false}
            showSearch={false}
            showNavbarButtons={false}
            showSearchWeb={false}
            showInputSearchSm={false}
            showLogin={false}
          >
            {this.state.showContractPayedSection ? (
              <>>= 10</>
            ) : (
              <CheckoutSectionForm contractData={this.props.contract} />
            )}
          </PageContainer>
        </div>
      </>
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
  contract: state.payments.getContractToPayReducer.data.contract
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
