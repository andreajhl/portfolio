import React, {Component} from 'react';
import "./styles.scss";
import {paymentsOperations} from "../../../state/ducks/payments";
import {connect} from "react-redux";


class ContractPriceLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="ContractPriceLayout">
                <span className={this.props.textColor}>

                </span>
            </div>
        );
    };

}

// Set propTypes
ContractPriceLayout.propTypes = {};

// Set defaultProps
ContractPriceLayout.defaultProps = {
    textColor: "text-white",
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
const _ContractPriceLayout = connect(mapStateToProps, mapDispatchToProps)(ContractPriceLayout);
export {_ContractPriceLayout as ContractPriceLayout};
