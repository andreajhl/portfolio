import React, { useState, useEffect } from "react";
import {
  getDiscountCouponBanner,
  setTimeDifference
} from "../../../../react-app/src/state/ducks/discount-coupons/actions";
import { connect } from "react-redux";
import styles from "./styles.module.scss";
import { DISCOUNT_COUPON_BANNER_FINISH_TIME } from "react-app/src/constants/localStorageKeys";
import calculateDateDifference from "react-app/src/utils/calculateDateDifference";
import moment from "moment";

const CouponBanner = ({
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
      localStorage.setItem(
        DISCOUNT_COUPON_BANNER_FINISH_TIME,
        dateFinish.toString()
      );
    }
    setDateFinish(dateFinish);
  }, [bannerTime]);

  useEffect(() => {
    if (!dateFinish) return;
    const timer = setTimeout(() => {
      const hasTimeDifference = dateFinish.diff(moment()) > 0;
      console.log(hasTimeDifference);
      // setShowCouponBanner(hasTimeDifference);
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
  }, [dateFinish, timeDifference, setTimeDifference]);

  const dateDifferenceMoment = moment(timeDifference, "hh:mm:ss");
  return (
    <div className={`${styles.CouponBanner}`}>
      <div>
        <span>
          ¡{discount}% de descuento en tus videomensajes! Cupón: {coupon}
        </span>
      </div>
      <div>
        <span>
          LA OFERTA FINALIZA EN {dateDifferenceMoment.minutes() || 0} M{" "}
          {dateDifferenceMoment.seconds() || 0} :
        </span>
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

const _CouponBanner = connect(
  mapStateToProps,
  mapDispatchToProps
)(CouponBanner);

export { _CouponBanner as CouponBanner };
