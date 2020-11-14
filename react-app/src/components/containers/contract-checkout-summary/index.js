import React, {Component} from "react";
import "./styles.scss";
import {ContractPriceLayout} from "../../layouts/checkout-contract-price";
import DiscountCouponForm from '../discount-coupon-form';
import {paymentsOperations} from "../../../state/ducks/payments";

import {connect} from "react-redux";


class ContractCheckoutSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.props.clearCouponData();
    }

    applyDiscount() {
        let discountTotal= 0;
        if(this.props.couponData.data.isPercentageDiscount){
            discountTotal = this.props.couponData.data.discount_amount * this.props.price;
            if (discountTotal > this.props.couponData.data.maxDiscountAmount){
                discountTotal = this.props.couponData.data.maxDiscountAmount;
            }
        }else{
            discountTotal = this.props.couponData.data.discount_amount;
        }
        return ( this.props.price - discountTotal);
    }

    render() {
        return (
            <div className="ContractCheckoutSummary">
                <div className="row contract-summary col-lg-12 justify-content-center">
                    <div className="col-lg-12 custom-card-title f-rounded">
                        <h6 className="text-white">Resumen de la contratación</h6>
                    </div>
                    <div className="col-lg-12 contract-details mx-auto" style={{maxWidth: "500px"}}>
                        <div className={"row"}>
                            <div className="col-3 col-lg-2">
                                <img
                                    className="rounded-circle mx-auto"
                                    src={this.props.celebrityAvatar || "/assets/img/avatar-blank.png"}
                                    width={"60px"}
                                    alt={"avatar"}
                                />
                            </div>
                            <div className={"col-8 col-lg-6"}>
                                <h6 className="mt-2 font-weight-bold">Video personalizado de {this.props.celebrityFullName}</h6>
                            </div>
                        </div>
                        <div className="from-to mt-4">
                            {
                                this.props.deliveryTo
                                &&
                                <>
                                    <div className="col-12 ml-0 pl-0 mb-3">
                                        <h6 className="text-colored">
                                            Para:&nbsp;
                                            <span className="font-weight-bold">
                                                {this.props.deliveryTo}
                                            </span>
                                        </h6>
                                    </div>
                                </>
                            }
                            {
                                this.props.deliveryFrom
                                &&
                                <>
                                    <div className="col-12 ml-0 pl-0">
                                        <h6 className="text-colored">
                                            De:&nbsp;
                                            <span className="font-weight-bold">
                                                {this.props.deliveryFrom}
                                            </span>
                                        </h6>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="instructions mt-4 text-justify">
                            <small>{this.props.instructions}</small>
                        </div>
                        {
                            this.props.price
                                ?
                                <div className="mt-4 f-rounded">
                                   <DiscountCouponForm/>
                                    <div className="text-right w-100">
                                        <ContractPriceLayout
                                            classes={"text-black font-weight-bold"}
                                            availableDiscount = {this.props.couponData.completed ? {
                                                initialPrice: this.props.price,
                                                isPercentageDiscount : this.props.couponData.data.isPercentageDiscount,
                                                discountAmount: this.props.couponData.data.discount_amount,
                                            } : false}
                                            price={this.props.couponData.completed ? this.applyDiscount() : this.props.price}
                                            currency={"USD"}
                                            rounding={false}
                                        />
                                    </div>
                                </div>
                                : <div></div>
                        }
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
    celebrityAvatar: "",
    celebrityFullName: "",
    deliveryFrom: "",
    deliveryTo: "",
    instructions: "",
    price: 0,
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    couponData: state.payments.fetchDiscountCouponReducer
});
// mapStateToProps
const mapDispatchToProps = {
    clearCouponData: paymentsOperations.clearCouponData,
};

// Export Class
const _ContractCheckoutSummary = connect(mapStateToProps,mapDispatchToProps)(ContractCheckoutSummary);
export {_ContractCheckoutSummary as ContractCheckoutSummary};