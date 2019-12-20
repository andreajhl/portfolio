import React, {Component} from "react";
import "./styles.scss";
import {paymentsOperations} from "../../../state/ducks/payments";
import {connect} from "react-redux";
import {ContractPriceLayout} from "../../layouts/contract-price";
import {AVAILABLE_CURRENCIES} from "../../layouts/currency-dropdown/constants";


class ContractCheckoutSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onPay = this.onPay.bind(this);
        this.onFinish = this.onFinish.bind(this);
    }

    onPay() {
        if (!this.props.buttonPayLoading) {
            this.props.onPay();
        }
    }

    onFinish() {
        if (!this.props.buttonFinishLoading) {
            this.props.onFinish();
        }
    }

    returnActionButton() {
        if (this.props.showPayButton) {
            return (
                <button
                    onClick={this.onPay}
                    className={
                        "contract-button mx-auto hover cursor-pointer p-2 border bg-active "
                    }
                >
                    {
                        this.props.buttonPayLoading
                            ?
                            <span
                                className="spinner-grow spinner-grow-sm"
                                role="status"
                                aria-hidden="true"
                            />
                            :
                            <span className="text-white">
                              Pagar
                            </span>
                    }
                </button>
            );
        } else {
            return (
                <button
                    onClick={this.onFinish}
                    className={"contract-button mx-auto hover cursor-pointer p-2 border bg-active "}
                >
                    {
                        this.props.buttonFinishLoading
                            ?
                            <span
                                className="spinner-grow spinner-grow-sm"
                                role="status"
                                aria-hidden="true"
                            />
                            :
                            <span className="text-white">
                              Finalizar
                            </span>
                    }
                </button>
            );
        }

    }

    returnAproxLabel() {
        return !!AVAILABLE_CURRENCIES.find(
            x => x.implemented_by_dlocal === false && x.name === this.props.currencyExchangeData.to
        )
    }

    returnContractPrice(){
        if(this.props.currencyExchangeData.rate > 0){
            return (this.props.contractData.price * this.props.currencyExchangeData.rate) + this.props.contractData.price
        }else{
            return this.props.contractData.price
        }
    }

    render() {
        return (
            <div className="ContractCheckoutSummary f-rounded">
                <div className="row contract-summary col-lg-12 justify-content-center f-shadow f-rounded">
                    <div className="col-lg-12 custom-card-title f-rounded">
                        <h6 className="text-white">Resumen de la contratación</h6>
                    </div>
                    <div className="col-lg-12 contract-details">
                        <div className="celebrity-name text-center">
                            <img
                                className="rounded-circle mx-auto"
                                src={
                                    !this.props.contractData.celebrity
                                        ? "/assets/img/avatar-blank.png"
                                        : this.props.contractData.celebrity.avatar
                                }
                                width={"60px"}
                                alt={"avatar"}
                            />
                        </div>
                        <div className="from-to mt-4">
                            <h6>
                                {
                                    this.props.contractData.delivery_to
                                    &&
                                    <>
                                        <div className="col-12 ml-0 pl-0 mb-3">
                                            <span className="text-colored">
                                              Para:{" "}
                                                <span className="font-weight-bold">
                                                {this.props.contractData.delivery_to}
                                              </span>{" "}
                                            </span>
                                        </div>
                                    </>
                                }
                                {
                                    this.props.contractData.delivery_from
                                    &&
                                    <>
                                        <div className="col-12 ml-0 pl-0">
                                            <span className="text-colored">
                                              De:{" "}
                                                <span className="font-weight-bold">
                                                {this.props.contractData.delivery_from}
                                              </span>{" "}
                                            </span>
                                        </div>
                                    </>
                                }
                            </h6>
                        </div>
                        <div className="instructions mt-4 text-justify">
                            <small>{this.props.contractData.instructions}</small>
                        </div>
                        <hr/>
                        <div className="total mt-4">
                            {
                                this.props.currencyExchangeData.to !== "USD" && this.returnAproxLabel()
                                &&
                                <div className="clearfix ">
                                    <h6 className=" float-left">Total en Dólares:</h6>
                                    <h6 className=" text-right float-right">
                                        <ContractPriceLayout
                                            classes={"text-black "}
                                            price={this.returnContractPrice()}
                                            currency={this.props.currencyExchangeData.to}
                                            rounding={false}
                                        />
                                    </h6>
                                </div>
                            }
                            <div className="clearfix ">
                                <h5 className="font-weight-bold float-left">Total:</h5>
                                <h5 className="font-weight-bold text-right float-right">
                                    <ContractPriceLayout
                                        classes={"text-black font-weight-bold"}
                                        price={this.returnContractPrice()}
                                        currency={this.props.currencyExchangeData.to}
                                        rounding={false}
                                    />
                                    {
                                        this.props.currencyExchangeData.to !== "USD" && !this.props.isLoading
                                        &&
                                        <>
                                            <br/>
                                            <small className={"text-right mx-auto"}
                                                   style={{fontSize: "10px"}}>
                                                {
                                                    this.returnAproxLabel()
                                                    &&
                                                    <>
                                                        (Aproximado)
                                                    </>
                                                }
                                            </small>
                                        </>
                                    }
                                </h5>
                            </div>
                        </div>
                        {this.props.showError && (
                            <div className="text-justify text-danger"
                                 style={{fontSize: "12px"}}>{this.props.error}
                            </div>
                        )}
                        <div className="contract-button mt-4 mx-auto buttonContractCustom">
                            {this.returnActionButton()}
                        </div>
                        <div className="mt-4 mx-auto text-center">
                            <img width="150px" src={"/assets/img/pago-seguro.png"} alt={"pago-seguro"}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Set propTypes
ContractCheckoutSummary.propTypes = {};

// Set defaultProps
ContractCheckoutSummary.defaultProps = {
    showError: false,
    error: "",
    buttonPayLoading: false,
    buttonFinishLoading: false,
    transactionFee: 0,
    contractData: {},
    showPayButton: true,
    buttonPayDisabled: false,
    payPalCheckoutStatus: false,
    onPay: () => {
    },
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.payments.currencyExchangeReducer.loading,
    currencyExchangeData: state.payments.currencyExchangeReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
    currencyExchange: paymentsOperations.currencyExchange
};

// Export Class
const _ContractCheckoutSummary = connect(mapStateToProps, mapDispatchToProps)(ContractCheckoutSummary);

export {_ContractCheckoutSummary as ContractCheckoutSummary};
