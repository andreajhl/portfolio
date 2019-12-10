import React, {Component} from 'react';
import "./styles.scss";
import {paymentsOperations} from "../../../state/ducks/payments";
import {connect} from "react-redux";

class ContractCurrencyPayment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currency: "USD"
        };

        this.handleCurrency = this.handleCurrency.bind(this)
    }

    componentDidMount(): void {
        this.props.listPaymentGateways(this.state.currency);
    }

    handleCurrency(event) {
        this.setState({
            currency: event.target.value
        }, () => {
            this.props.listPaymentGateways(this.state.currency);
            this.props.onSelectCurrency(this.state.currency)
        });
    }

    render() {
        return (
            <div className="ContractCurrencyPayment">
                <h6 className="title font-weight-bold">
                    1. ¿En qué moneda quieres pagar?
                    <small className="ml-1 text-danger">*</small>
                </h6>
                <select className="form-control" value={this.state.currency} onChange={this.handleCurrency}>
                    <option value="USD">USD - Dólares</option>
                    <option value="COP">COP - Pesos Colombianos</option>
                </select>
            </div>
        );
    };

}

// Set propTypes
ContractCurrencyPayment.propTypes = {};

// Set defaultProps
ContractCurrencyPayment.defaultProps = {
    onSelectCurrency: () => {

    }
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.payments.fetchPaymentGatewaysReducer.loading,
    paymentGateways: state.payments.fetchPaymentGatewaysReducer.data.gateways,
});

// mapStateToProps
const mapDispatchToProps = {
    listPaymentGateways: paymentsOperations.listPaymentGateways,
};

// Export Class
const _ContractCurrencyPayment = connect(mapStateToProps, mapDispatchToProps)(ContractCurrencyPayment);
export {_ContractCurrencyPayment as ContractCurrencyPayment};

