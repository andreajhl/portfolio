import React, {Component} from 'react';
import "./styles.scss";
import {paymentsOperations} from "../../../state/ducks/payments";
import {connect} from "react-redux";
import NumberFormat from 'react-number-format';


class ContractCheckoutSummary extends Component {


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
            if (this.props.currencyExchangeData.to !== "USD" && this.props.transactionFee) {
                const price = this.props.contractData.price * this.props.currencyExchangeData.rate;
                return price + (price * this.props.transactionFee);
            } else if (this.props.currencyExchangeData.to) {
                return this.props.contractData.price * this.props.currencyExchangeData.rate;
            } else {
                return this.props.contractData.price
            }
        }else{
            return 0
        }
    }

    onPay() {
        this.props.onPay()
    }

    render() {
        return (
            <div className="ContractCheckoutSummary f-rounded">
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
                        {
                            this.props.showError
                            &&
                            <div className="text-center">
                                {this.props.error}
                            </div>
                        }
                        <div classNgame="contract-button mt-4 mx-auto text-center">
                            <button
                                onClick={this.onPay}
                                className={"contract-button mx-auto hover cursor-pointer p-2 border bg-active "}
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
ContractCheckoutSummary.propTypes = {};

// Set defaultProps
ContractCheckoutSummary.defaultProps = {
    showError: false,
    error: "",
    buttonPayDisabled: false,
    transactionFee: 0,
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
const _ContractCheckoutSummary = connect(mapStateToProps, mapDispatchToProps)(ContractCheckoutSummary);
export {_ContractCheckoutSummary as ContractCheckoutSummary};
