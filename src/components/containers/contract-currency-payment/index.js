import React, {Component} from 'react';
import "./styles.scss";
import {paymentsOperations} from "../../../state/ducks/payments";
import {connect} from "react-redux";


const USD_CURRENCIES = [
    "ARS",
    "BRL",
    "CLP",
    // "COP", // TODO COL IS AVAILABLE
    "DOP",
    "MXN",
    "PEN",
    "UYU",
    "USD",
    "EUR",
    "CAD",
];

class ContractCurrencyPayment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currency: USD_CURRENCIES.includes(this.props.currencyExchangeData.to) ? "USD" : this.props.currencyExchangeData.to
        };

        this.handleCurrency = this.handleCurrency.bind(this)
    }

    componentDidMount(): void {
        this.changeCurrency(this.state.currency);
    }

    changeCurrency(value) {
        this.setState({
            currency: value
        }, () => {
            this.props.listPaymentGateways(this.state.currency);
            this.props.onSelectCurrency(this.state.currency)
        });
    }

    handleCurrency(event) {
        this.changeCurrency(event.target.value)
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
                    <option value="ARS">ARS - Pesos Argentinos</option>
                    <option value="COP">COP - Pesos Colombianos</option>
                    <option value="MXN">MXN - Pesos Mexicanos</option>
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
    currencyExchangeLoading: state.payments.currencyExchangeReducer.loading,
    currencyExchangeData: state.payments.currencyExchangeReducer.data,
});

// mapStateToProps
const mapDispatchToProps = {
    listPaymentGateways: paymentsOperations.listPaymentGateways,
    currencyExchange: paymentsOperations.currencyExchange,
};

// Export Class
const _ContractCurrencyPayment = connect(mapStateToProps, mapDispatchToProps)(ContractCurrencyPayment);
export {_ContractCurrencyPayment as ContractCurrencyPayment};



