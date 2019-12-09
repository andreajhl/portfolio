import React, {Component} from 'react';
import "./styles.scss";
import {PaymentMethodsSectionLayout} from "../../layouts/payment-methods-section";
import {ContractCheckoutSummaryLayout} from "../../layouts/contract-checkout-summary";
import {paymentsOperations} from "../../../state/ducks/payments";
import {connect} from "react-redux";


class CheckoutSectionForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            paymentMethod: {},
            paymentType: {}
        };

        this.onSelectPaymentMethod = this.onSelectPaymentMethod.bind(this);
        this.onSelectPaymentType = this.onSelectPaymentType.bind(this);
        this.onPay = this.onPay.bind(this);
    }

    onSelectPaymentMethod(paymentMethod) {
        this.setState({
            paymentMethod
        })
    }

    onSelectPaymentType(paymentType) {
        this.setState({
            paymentType
        })
    }

    onPay(totalPrice) {
        console.log("totalPrice:", totalPrice);
        // Create payment
        this.props.createContractPayment({
            country: this.props.currencyExchangeData.to,
            payment_method_id: this.state.paymentMethod.identifier,
            contract_reference: this.props.contractData.reference
        })
    }

    render() {
        return (
            <div className="CheckoutSectionForm">
                <div className="row checkout-section mx-auto justify-content-center">
                    <div className="col-lg-7 payment-methods">
                        <PaymentMethodsSectionLayout
                            onSelectPaymentType={this.onSelectPaymentType}
                            onSelectPaymentMethod={this.onSelectPaymentMethod}
                        />
                    </div>
                    <div className="col-lg-5 contract-summary">
                        <ContractCheckoutSummaryLayout
                            paymentMethod={this.state.paymentMethod}
                            paymentType={this.state.paymentType}
                            contractData={this.props.contractData}
                            onPay={this.onPay}
                        />
                    </div>
                </div>
            </div>
        );
    };

}

// Set propTypes
CheckoutSectionForm.propTypes = {};

// Set defaultProps
CheckoutSectionForm.defaultProps = {
    contractData: {}
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.payments.createContractPaymentReducer.loading,
    isCompleted: state.payments.createContractPaymentReducer.completed,
    contractPayment: state.payments.createContractPaymentReducer.data,
});

// mapStateToProps
const mapDispatchToProps = {
    createContractPayment: paymentsOperations.createContractPayment,
};

// Export Class
const _CheckoutSectionForm = connect(mapStateToProps, mapDispatchToProps)(CheckoutSectionForm);
export {_CheckoutSectionForm as CheckoutSectionForm};
