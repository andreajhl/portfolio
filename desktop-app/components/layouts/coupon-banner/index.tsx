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
import { XIcon } from "desktop-app/components/common/icons";
import { HIDE_COUPON_BANNER } from "constants/keys";

import isBrowser from "react-app/src/utils/isBrowser";

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
  const userDidHideBanner = isBrowser()
    ? sessionStorage.getItem(HIDE_COUPON_BANNER)
    : null;
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

  const closeCouponBanner = () => {
    sessionStorage.setItem(HIDE_COUPON_BANNER, HIDE_COUPON_BANNER);
  };

  const dateDifferenceMoment = moment(timeDifference, "hh:mm:ss");
  return timeDifference && !userDidHideBanner ? (
    <div className={`${styles.CouponBanner}`}>
      <div>
        <span className={styles.CouponBannerInfo}>
          ¡{discount}% de descuento en tus videomensajes! Cupón: {coupon}
        </span>
      </div>
      <div className={styles.CouponBannerTimer}>
        <span>
          LA OFERTA FINALIZA EN{" "}
          <span className={styles.CouponBannerTimerCount}>
            {dateDifferenceMoment.minutes() || 0} m{" "}
            {dateDifferenceMoment.seconds() || 0} s
          </span>
        </span>
        <div onClick={closeCouponBanner} className={styles.CloseButton}>
          <XIcon></XIcon>
        </div>
      </div>
    </div>
  ) : null;
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
