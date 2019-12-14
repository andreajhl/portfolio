import React, {Component} from 'react';
import {paymentsOperations} from "../../../state/ducks/payments";
import {connect} from "react-redux";
import NumberFormat from "react-number-format";
import "./styles.scss";


class ContractPriceLayout extends Component {

    render() {
        return (
            <NumberFormat
                value={this.props.currencyExchangeData.to !== "USD" ? this.props.price * this.props.currencyExchangeData.rate : this.props.price}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                prefix={"$"}
                renderText={value => <span className={(this.props.classes)}>{value} {this.props.currencyExchangeData.to}</span>}
            />
        );
    };

}

// Set propTypes
ContractPriceLayout.propTypes = {};

// Set defaultProps
ContractPriceLayout.defaultProps = {
    classes: "",
    price: 0
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    currencyExchangeLoading: state.payments.currencyExchangeReducer.loading,
    currencyExchangeData: state.payments.currencyExchangeReducer.data,
});

// mapStateToProps
const mapDispatchToProps = {
    currencyExchange: paymentsOperations.currencyExchange,
};

// Export Class
const _ContractPriceLayout = connect(mapStateToProps, mapDispatchToProps)(ContractPriceLayout);
export {_ContractPriceLayout as ContractPriceLayout};
