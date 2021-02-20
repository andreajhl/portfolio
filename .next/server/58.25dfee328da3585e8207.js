exports.ids = [58];
exports.modules = {

/***/ "VwDk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "BannerPromoLayout", function() { return /* binding */ _BannerPromoLayout; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__("wy2R");
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// EXTERNAL MODULE: ./react-app/src/state/utils/apiService.js
var apiService = __webpack_require__("XruL");

// EXTERNAL MODULE: ./react-app/src/state/ducks/discount-coupons/types.js
var types = __webpack_require__("o3m8");

// CONCATENATED MODULE: ./react-app/src/state/ducks/discount-coupons/paths.js
const MODEL = `discount-coupon`;
const GET_DISCOUNT_COUPONS_BANNER = `custom-endpoints/${MODEL}/public-get-coupon/`;
// EXTERNAL MODULE: ./react-app/src/state/utils/index.js + 2 modules
var utils = __webpack_require__("7Nk7");

// CONCATENATED MODULE: ./react-app/src/state/ducks/discount-coupons/actions.js




const actions_getDiscountCouponBanner = () => dispatch => {
  const TYPE = types["a" /* GET_DISCOUNT_COUPONS_BANNER */];
  const FINAL_PATH = GET_DISCOUNT_COUPONS_BANNER;
  dispatch({
    type: TYPE
  });
  Object(apiService["a" /* default */])({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH
  }).then(res => {
    if ("status" in res.data && res.data.status === "ERROR") {
      Object(utils["b" /* handleApiResponseFailure */])(dispatch, TYPE, res);
    } else {
      Object(utils["c" /* handleApiResponseSuccess */])(dispatch, TYPE, res);
    }
  }).catch(err => {
    Object(utils["a" /* handleApiErrors */])(dispatch, TYPE, err);
  }).finally(() => {
    dispatch({
      type: `${TYPE}_COMPLETED`,
      payload: {}
    });
  });
};
const actions_setTimeDifference = payload => ({
  type: types["e" /* SET_TIME_DIFFERENCE */],
  payload
});
// EXTERNAL MODULE: ./react-app/src/constants/localStorageKeys.js
var localStorageKeys = __webpack_require__("gnON");

// CONCATENATED MODULE: ./react-app/src/utils/calculateDateDifference.js


const calculateDateDifference = (startDate, finishDate, inputFormat = "YYYY-MM-DD HH:mm:ss", outputFormat = inputFormat) => {
  if (!startDate) {
    throw new TypeError("The arg 'startDate' is required");
  }

  if (!finishDate) {
    throw new TypeError("The arg 'finishDate' is required");
  }

  return external_moment_default.a.utc(external_moment_default()(finishDate, inputFormat).diff(external_moment_default()(startDate || external_moment_default()(), inputFormat))).format(outputFormat);
};

/* harmony default export */ var utils_calculateDateDifference = (calculateDateDifference);
// CONCATENATED MODULE: ./react-app/src/components/layouts/banner-promo/index.js
var __jsx = external_react_default.a.createElement;







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
  const {
    0: dateFinish,
    1: setDateFinish
  } = Object(external_react_["useState"])(null);
  Object(external_react_["useEffect"])(() => {
    if (!shouldFetchCoupon) return;
    getDiscountCouponBanner();
  }, [getDiscountCouponBanner, shouldFetchCoupon]);
  Object(external_react_["useEffect"])(() => {
    if (!bannerTime) return;
    let dateFinish = external_moment_default()(external_moment_default()().add(bannerTime, "minutes"), "YYYY-MM-DD HH:mm:ss");
    const storeDateFinish = localStorage.getItem(localStorageKeys["b" /* DISCOUNT_COUPON_BANNER_FINISH_TIME */]);

    if (storeDateFinish != null) {
      dateFinish = external_moment_default()(storeDateFinish);
    } else {
      localStorage.setItem(localStorageKeys["b" /* DISCOUNT_COUPON_BANNER_FINISH_TIME */], dateFinish);
    }

    setDateFinish(dateFinish);
  }, [bannerTime]);
  Object(external_react_["useEffect"])(() => {
    if (!dateFinish) return;
    const timer = setTimeout(() => {
      const hasTimeDifference = dateFinish.diff(external_moment_default()()) > 0;
      setShowCouponBanner(hasTimeDifference);
      if (!hasTimeDifference) return setTimeDifference(null);
      const timeDifference = utils_calculateDateDifference(external_moment_default()(), dateFinish, "YYYY-MM-DD HH:mm:ss", "HH:mm:ss");
      setTimeDifference(timeDifference);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [dateFinish, timeDifference, setShowCouponBanner, setTimeDifference]);
  const dateDifferenceMoment = external_moment_default()(timeDifference, "hh:mm:ss");
  return __jsx("div", {
    className: `BannerPromoLayout ${!showCouponBanner ? "d-none" : ""}`
  }, __jsx("div", {
    className: "ContentBanner container h-100 row mx-auto p-0 align-items-center justify-content-center"
  }, __jsx("div", {
    className: "col text-style"
  }, discount, "% de descuento en tu compra. ", __jsx("br", {
    className: "d-lg-none"
  }), " ", "Usa el c\xF3digo: ", coupon), __jsx("div", {
    className: "col-lg-3 col-md-auto text-center align-items-center justify-content-center"
  }, __jsx("div", {
    className: "row text-style justify-content-center justify-content-lg-end mb-1"
  }, "Termina en", __jsx("div", null, __jsx("div", {
    className: "time-style"
  }, dateDifferenceMoment.minutes() || 0)), "M", __jsx("div", null, __jsx("div", {
    className: "time-style"
  }, dateDifferenceMoment.seconds() || 0)), "S"))));
};

const mapStateToProps = ({
  discountCoupons
}) => {
  const timeDifference = discountCoupons.timeDifferenceReducer;
  const {
    data,
    completed
  } = discountCoupons.getDiscountCouponBannerReducer;
  const {
    bannerTime,
    couponCode: coupon,
    discount_amount
  } = data;
  return {
    bannerTime,
    coupon,
    discount: parseFloat(discount_amount || 0) * 100,
    shouldFetchCoupon: !completed && !coupon,
    timeDifference
  };
};

const mapDispatchToProps = {
  getDiscountCouponBanner: actions_getDiscountCouponBanner,
  setTimeDifference: actions_setTimeDifference
};

const _BannerPromoLayout = Object(external_react_redux_["connect"])(mapStateToProps, mapDispatchToProps)(BannerPromoLayout);



/***/ }),

/***/ "gnON":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HIDE_VIDEO_CALLS_RESEARCH */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CELEBRITY_PROFILE_VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DISCOUNT_COUPON_BANNER_FINISH_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return HAS_ACCEPTED_COOKIES_CONSENT; });
const HIDE_VIDEO_CALLS_RESEARCH = "HIDE_VIDEO_CALLS_RESEARCH";
const CELEBRITY_PROFILE_VERSION = "CELEBRITY_PROFILE_VERSION";
const DISCOUNT_COUPON_BANNER_FINISH_TIME = "discount_coupon_banner";
const HAS_ACCEPTED_COOKIES_CONSENT = "hasAcceptedCookiesConsent";

/***/ }),

/***/ "o3m8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GET_DISCOUNT_COUPONS_BANNER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return GET_DISCOUNT_COUPONS_BANNER_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return GET_DISCOUNT_COUPONS_BANNER_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GET_DISCOUNT_COUPONS_BANNER_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SET_TIME_DIFFERENCE; });
const MODEL = "discount-coupons";
const GET_DISCOUNT_COUPONS_BANNER = `${MODEL}/GET_DISCOUNT_COUPONS_BANNER`;
const GET_DISCOUNT_COUPONS_BANNER_SUCCESS = `${MODEL}/GET_DISCOUNT_COUPONS_BANNER_SUCCESS`;
const GET_DISCOUNT_COUPONS_BANNER_FAILURE = `${MODEL}/GET_DISCOUNT_COUPONS_BANNER_FAILURE`;
const GET_DISCOUNT_COUPONS_BANNER_COMPLETED = `${MODEL}/GET_DISCOUNT_COUPONS_BANNER_COMPLETED`;
const SET_TIME_DIFFERENCE = MODEL + "/SET_TIME_DIFFERENCE";

/***/ })

};;