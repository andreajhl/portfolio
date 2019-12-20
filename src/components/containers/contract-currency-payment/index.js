import React, {Component} from "react";
import "./styles.scss";
import {paymentsOperations} from "../../../state/ducks/payments";
import {connect} from "react-redux";
import {AVAILABLE_CURRENCIES} from "../../layouts/currency-dropdown/constants";

class ContractCurrencyPayment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currency: this.props.currencyExchangeData.to
        };

        this.handleCurrency = this.handleCurrency.bind(this)
    }

    handleCurrency(event) {
        this.changeCurrency(event.target.value)
    }

    componentDidMount(): void {
        this.changeCurrency(this.state.currency);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        console.log("prevProps:", prevProps)
    }

    changeCurrency(value) {
        this.setState(
            {
                currency: value
            },
            () => {
                this.props.listPaymentGateways(this.state.currency);
                this.props.onSelectCurrency(this.state.currency);
            }
        );
    }

    handleCurrency(event) {
        this.changeCurrency(event.target.value);
    }

    loopAvailableCurrencies() {
        return (
            AVAILABLE_CURRENCIES.filter(x => x.implemented_by_dlocal === true).map((c, index) => {
                return(
                    <option value={c.name} key={index}>{c.name} - {c.label}</option>
                )
            })
        )
    }

    render() {
        return (
            <div className="ContractCurrencyPayment">
                <h6 className="title font-weight-bold">
                    1. ¿En qué moneda quieres pagar?
                    <small className="ml-1 text-danger">*</small>
                </h6>
                <select
                    className="form-control"
                    value={this.state.currency}
                    onChange={this.handleCurrency}
                >
                    <option value={"USD"}>USD - Dólares</option>
                    {this.loopAvailableCurrencies()}
                </select>
            </div>
        );
    }
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
    currencyExchangeData: state.payments.currencyExchangeReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
    listPaymentGateways: paymentsOperations.listPaymentGateways,
    currencyExchange: paymentsOperations.currencyExchange
};

// Export Class
const _ContractCurrencyPayment = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractCurrencyPayment);
export {_ContractCurrencyPayment as ContractCurrencyPayment};
