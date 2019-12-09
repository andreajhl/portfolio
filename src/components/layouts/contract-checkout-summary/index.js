import React, {Component} from 'react';
import "./styles.scss";
import {paymentsOperations} from "../../../state/ducks/payments";
import {connect} from "react-redux";
import NumberFormat from 'react-number-format';


class ContractCheckoutSummaryLayout extends Component {


    constructor(props) {
        super(props);

        this.state = {};

        this.contractPrice = this.contractPrice.bind(this);
        this.onPay = this.onPay.bind(this);
    }

    returnNumber(number) {
        return (
            <NumberFormat
                value={number}
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                renderText={value => <span>{value}</span>}
            />
        )
    }

    contractPrice() {
        if(this.props.contractData.price){
            if (this.props.currencyExchangeData.to !== "USD" && this.props.paymentMethod.fee) {
                const price = this.props.contractData.price * this.props.currencyExchangeData.rate;
                return price + (price*this.props.paymentMethod.fee);
            } else if (this.props.currencyExchangeData.to !== "USD") {
                return this.props.contractData.price * this.props.currencyExchangeData.rate;
            } else {
                return this.props.contractData.price
            }
        }else{
            return 0
        }
    }

    onPay() {
        this.props.onPay(this.contractPrice())
    }

    render() {
        return (
            <div className="ContractCheckoutSummaryLayout f-rounded">
                <div className="row contract-summary col-lg-12 justify-content-center f-shadow f-rounded">
                    <div className="col-lg-12 custom-card-title f-rounded bg-primary">
                        <h6 className="text-white">Resumen de la contratación</h6>
                    </div>
                    <div className="col-lg-12 contract-details">
                        <div className="celebrity-name text-center">
                            <img className="rounded-circle mx-auto"
                                 src={!this.props.contractData.celebrity ? "/assets/img/avatar-blank.png" : this.props.contractData.celebrity.avatar}
                                 width={"60px"}
                                 alt={"avatar"}/>
                        </div>
                        <div className="from-to mt-4">
                            <h6>
                                <span className="text-colored">Para: <span
                                    className="font-weight-bold">{this.props.contractData.delivery_to}</span> </span>
                                <span className="text-colored ml-3">De: <span
                                    className="font-weight-bold">{this.props.contractData.delivery_from}</span> </span>
                            </h6>
                        </div>
                        <div className="instructions mt-4 text-justify">
                            <small>{this.props.contractData.instructions}</small>
                        </div>
                        <div className="total mt-4">
                            <div className="clearfix ">
                                <h5 className="font-weight-bold float-left">Total:</h5>
                                <h5 className="font-weight-bold float-right">
                                    $ {this.returnNumber(this.contractPrice())} {this.props.currencyExchangeData.to ? this.props.currencyExchangeData.to : "USD"}
                                </h5>
                            </div>
                        </div>
                        <div className="contract-button mt-4 mx-auto text-center">
                            <button
                                onClick={this.onPay}
                                className={"contract-button mx-auto hover cursor-pointer p-2 border bg-active " + (!this.props.paymentMethod.identifier ? " disabled " : " ")}
                                disabled={!this.props.paymentMethod.identifier}
                            >
                                3. Pagar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}

// Set propTypes
ContractCheckoutSummaryLayout.propTypes = {};

// Set defaultProps
ContractCheckoutSummaryLayout.defaultProps = {
    paymentType: {},
    paymentMethod: {},
    contractData: {},
    onPay: () => {
    }
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.payments.currencyExchangeReducer.loading,
    currencyExchangeData: state.payments.currencyExchangeReducer.data,
});

// mapStateToProps
const mapDispatchToProps = {
    currencyExchange: paymentsOperations.currencyExchange,
};

// Export Class
const _ContractCheckoutSummaryLayout = connect(mapStateToProps, mapDispatchToProps)(ContractCheckoutSummaryLayout);
export {_ContractCheckoutSummaryLayout as ContractCheckoutSummaryLayout};
