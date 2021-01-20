import React, {Component} from "react";
import {connect} from "react-redux";
import "./styles.scss";
import Moment from 'moment';
import moment from "moment";
import {getDiscountCouponBanner} from "../../../state/ducks/discount_coupons/actions";

class BannerPromoLayout extends Component {
    constructor() {
        super();
        let dateFinish = moment(new Moment().add(10, "minutes"), "YYYY-MM-DD HH:mm:ss");
        if (localStorage.getItem('new_user') != null) {
            if (localStorage.getItem("discount_coupon_banner") != null) {
                dateFinish = moment(localStorage.getItem("discount_coupon_banner"));
            } else {
                localStorage.setItem("discount_coupon_banner", dateFinish);
            }
        }else {
            dateFinish = moment(new Moment().subtract(10, "minutes"), "YYYY-MM-DD HH:mm:ss");
        }

        this.state = {
            showDiv: true,
            diffTime: null,
            coupon: "",
            discount: 0,
            dateFinish: dateFinish,
        };
        this.calculateDiff();
    }

    componentDidMount(): void {
        this.runTimer();
        getDiscountCouponBanner().then(res => {
            this.setState({
                coupon: res['couponCode'],
                discount: parseFloat(res['discount_amount']) * 100,
            });
        });
    }

    calculateDiff() {
        this.setState({diffTime: moment.utc(moment(this.state.dateFinish, "YYYY-MM-DD HH:mm:ss").diff(moment(new Moment(), "YYYY-MM-DD HH:mm:ss"))).format("HH:mm:ss")});
    }

    runTimer() {

        this.timerId = setInterval(() => {
            this.calculateDiff();
            if (this.state.dateFinish.diff(new Moment()) <= 0) {
                clearInterval(this.timerId);
                this.setState({showDiv: true});
            } else {
                this.setState({showDiv: false});
            }
        }, 1000);
    }

    render() {
        return (
            <>
                <div className={this.state.showDiv ? "display-none" : ""}>
                    <div
                        className="ContentBanner row mx-auto p-0 text-center align-items-center justify-content-center">
                        <div className="col-md-2 text-style text-center">Usa el código: {this.state.coupon}</div>
                        <div className="col-md-2 text-style high-text text-center">{this.state.discount}% de descuento
                        </div>
                        <div className="col-md-3 text-center align-items-center justify-content-center">
                            <div className="row text-style text-center align-items-center justify-content-center mb-1">
                                Termina en
                                <div className="time-style">
                                    {this.state.diffTime != null ? moment(this.state.diffTime, "hh:mm:ss").hours() : 0}
                                </div>
                                H
                                <div className="">
                                    <div className="time-style">
                                        {this.state.diffTime != null ? moment(this.state.diffTime, "hh:mm:ss").minutes() : 0}
                                    </div>
                                </div>
                                M
                                <div className="">
                                    <div className="time-style">
                                        {this.state.diffTime != null ? moment(this.state.diffTime, "hh:mm:ss").seconds() : 0}
                                    </div>
                                </div>
                                S
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const _BannerPromoLayout = connect()(BannerPromoLayout);
export {_BannerPromoLayout as BannerPromoLayout};
