import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  getDiscountCouponBanner,
  setTimeDifference
} from "../../../state/ducks/discount-coupons/actions";
import { DISCOUNT_COUPON_BANNER_FINISH_TIME } from "../../../constants/localStorageKeys";
import "./styles.scss";
import calculateDateDifference from "../../../utils/calculateDateDifference";

const BannerPromoLayout = ({
  showCouponBanner,
  setShowCouponBanner,
  getDiscountCouponBanner,
  bannerTime,
  discount,
  coupon,
  shouldFetchCoupon,
  setTimeDifference,
  timeDifference
}) => {
  const [dateFinish, setDateFinish] = useState(null);

  useEffect(() => {
    if (!shouldFetchCoupon) return;
    getDiscountCouponBanner();
  }, [getDiscountCouponBanner, shouldFetchCoupon]);

  useEffect(() => {
    if (!bannerTime) return;
    let dateFinish = moment(
      moment().add(bannerTime, "minutes"),
      "YYYY-MM-DD HH:mm:ss"
    );

    const storeDateFinish = localStorage.getItem(
      DISCOUNT_COUPON_BANNER_FINISH_TIME
    );

    if (storeDateFinish != null) {
      dateFinish = moment(storeDateFinish);
    } else {
      localStorage.setItem(DISCOUNT_COUPON_BANNER_FINISH_TIME, dateFinish);
    }
    setDateFinish(dateFinish);
  }, [bannerTime]);

  useEffect(() => {
    if (!dateFinish) return;
    const timer = setTimeout(() => {
      const hasTimeDifference = dateFinish.diff(moment()) > 0;
      setShowCouponBanner(hasTimeDifference);
      if (!hasTimeDifference) return setTimeDifference(null);
      const timeDifference = calculateDateDifference(
        moment(),
        dateFinish,
        "YYYY-MM-DD HH:mm:ss",
        "HH:mm:ss"
      );
      setTimeDifference(timeDifference);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [dateFinish, timeDifference, setShowCouponBanner, setTimeDifference]);

  const dateDifferenceMoment = moment(timeDifference, "hh:mm:ss");

  return (
    <div className={`BannerPromoLayout ${!showCouponBanner ? "d-none" : ""}`}>
      <div className="ContentBanner container h-100 row mx-auto p-0 align-items-center justify-content-center">
        <div className="col text-style">
          {discount}% de descuento en tu compra. <br className="d-lg-none" />{" "}
          Usa el código: {coupon}
        </div>
        <div className="col-lg-3 col-md-auto text-center align-items-center justify-content-center">
          <div className="row text-style justify-content-center justify-content-lg-end mb-1">
            Termina en
            <div>
              <div className="time-style">
                {dateDifferenceMoment.minutes() || 0}
              </div>
            </div>
            M
            <div>
              <div className="time-style">
                {dateDifferenceMoment.seconds() || 0}
              </div>
            </div>
            S
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ discountCoupons }) => {
  const timeDifference = discountCoupons.timeDifferenceReducer;
  const { data, completed } = discountCoupons.getDiscountCouponBannerReducer;
  const { bannerTime, couponCode: coupon, discount_amount } = data;
  return {
    bannerTime,
    coupon,
    discount: parseFloat(discount_amount || 0) * 100,
    shouldFetchCoupon: !completed && !coupon,
    timeDifference
  };
};
const mapDispatchToProps = { getDiscountCouponBanner, setTimeDifference };

const _BannerPromoLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerPromoLayout);

export { _BannerPromoLayout as BannerPromoLayout };
