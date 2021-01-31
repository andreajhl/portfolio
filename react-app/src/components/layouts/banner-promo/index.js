import React, { useState, useEffect } from "react";
import moment from "moment";
import { getDiscountCouponBanner } from "../../../state/ducks/discount_coupons/actions";
import { DISCOUNT_COUPON_BANNER_FINISH_TIME } from "../../../constants/localStorageKeys";
import "./styles.scss";
import calculateDateDifference from "../../../utils/calculateDateDifference";

const BannerPromoLayout = ({ showCouponBanner, setShowCouponBanner }) => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [dateFinish, setDateFinish] = useState(null);
  const [timeDifference, setTimeDifference] = useState(null);

  useEffect(() => {
    getDiscountCouponBanner().then((response) => {
      if (!response) return setShowCouponBanner(false);
      setCoupon(response.couponCode);
      setDiscount(parseFloat(response.discount_amount || 0) * 100);

      let dateFinish = moment(
        moment().add(response.bannerTime, "minutes"),
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
    });
  }, [setShowCouponBanner]);

  useEffect(() => {
    if (!dateFinish) return;
    const timer = setTimeout(() => {
      const hasTimeDifference = dateFinish.diff(moment()) > 0;
      setShowCouponBanner(hasTimeDifference);
      if (!hasTimeDifference) return;
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
  }, [dateFinish, timeDifference, setShowCouponBanner]);

  const dateDifferenceMoment = moment(timeDifference, "hh:mm:ss");

  return (
    <div className={!showCouponBanner ? "d-none" : ""}>
      <div className="ContentBanner row mx-auto p-0 text-center align-items-center justify-content-center">
        <div className="col-md-3 text-style text-center">
          Usa el código: {coupon}
        </div>
        <div className="col-md-2 text-style high-text text-center">
          {discount}% de descuento
        </div>
        <div className="col-md-3 text-center align-items-center justify-content-center">
          <div className="row text-style text-center align-items-center justify-content-center mb-1">
            Termina en
            <div className="time-style">
              {dateDifferenceMoment.hours() || 0}
            </div>
            H
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

export { BannerPromoLayout };
