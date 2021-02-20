exports.ids = [60];
exports.modules = {

/***/ "UnJu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookiesConsent", function() { return CookiesConsent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_app_src_components_common_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("68Dr");
/* harmony import */ var react_app_src_constants_localStorageKeys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("gnON");
/* harmony import */ var react_app_src_utils_getWindow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("V08N");
/* harmony import */ var _common_helpers_maybe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("LeEe");
/* harmony import */ var _routing_Paths__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("c5JF");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







const CookiesConsent = () => {
  const {
    0: showBanner,
    1: setShowBanner
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: bannerIsHidden,
    1: setBannerIsHidden
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setShowBanner(localStorage.getItem(react_app_src_constants_localStorageKeys__WEBPACK_IMPORTED_MODULE_2__[/* HAS_ACCEPTED_COOKIES_CONSENT */ "c"]) !== "true");
  }, []);

  const hideBanner = () => {
    var _getWindow, _getWindow$localStora, _getWindow$localStora2;

    (_getWindow = Object(react_app_src_utils_getWindow__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])()) === null || _getWindow === void 0 ? void 0 : (_getWindow$localStora = _getWindow.localStorage) === null || _getWindow$localStora === void 0 ? void 0 : (_getWindow$localStora2 = _getWindow$localStora.setItem) === null || _getWindow$localStora2 === void 0 ? void 0 : _getWindow$localStora2.call(_getWindow$localStora, react_app_src_constants_localStorageKeys__WEBPACK_IMPORTED_MODULE_2__[/* HAS_ACCEPTED_COOKIES_CONSENT */ "c"], true);
    setBannerIsHidden(true);
  };

  const removeCookieConsent = ({
    propertyName
  }) => {
    if (propertyName === "opacity") {
      setShowBanner(false);
    }
  };

  return __jsx(_common_helpers_maybe__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    it: showBanner
  }, __jsx("div", {
    className: `cookies-consent ${bannerIsHidden ? "hidden" : ""}`,
    onTransitionEnd: removeCookieConsent
  }, __jsx("div", {
    className: "cookies-consent__text"
  }, "En nuestro sitio web utilizamos cookies propias y de terceros para mejorar la experiencia de usuario, rendimiento, an\xE1lisis y otro fines. Al hacer clic en aceptar o utilizar nuestro sitio, estar\xE1s aceptando el uso de estas cookies."), __jsx("div", {
    className: "cookies-consent__options"
  }, __jsx("button", {
    className: "cookies-consent__accept-button mr-3",
    onClick: hideBanner
  }, "Aceptar"), __jsx(react_app_src_components_common_routing__WEBPACK_IMPORTED_MODULE_1__[/* NavLink */ "a"], {
    to: _routing_Paths__WEBPACK_IMPORTED_MODULE_5__[/* POLICIES_PATH */ "w"],
    className: "cookies-consent__terms-link"
  }, "Ver las pol\xEDticas de privacidad"))));
};



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

/***/ })

};;