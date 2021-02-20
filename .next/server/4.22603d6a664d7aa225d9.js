exports.ids = [4];
exports.modules = {

/***/ "4q9T":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlashDeliveryBadgeLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const FlashDeliveryBadgeLayout = ({
  className,
  color,
  showTitle,
  showTime
}) => {
  return __jsx("span", {
    className: `FlashDeliveryLayout ${className} ${showTitle || showTime ? "" : "FlashDeliveryLayout--without-text"} FlashDeliveryLayout--color-${color}`
  }, showTitle ? __jsx("span", {
    className: "FlashDeliveryLayout__title"
  }, "Entrega Flash") : null, showTime ? __jsx("span", {
    className: "FlashDeliveryLayout__time"
  }, "24 hrs.") : null, __jsx("i", {
    className: "FlashDeliveryLayout__icon fa fa-bolt text-warning"
  }));
};

FlashDeliveryBadgeLayout.defaultProps = {
  className: "",
  color: "white",
  showTime: false,
  showTitle: false
};


/***/ }),

/***/ "BFjd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _CountryFlag; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_limitString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cKot");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const CountryFlag = ({
  className = "",
  width = "24px",
  countries = [],
  countryCode = "USA"
}) => {
  const {
    0: celebrityCountry,
    1: setCelebrityCountry
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    var _countries$find;

    setCelebrityCountry(countries === null || countries === void 0 ? void 0 : (_countries$find = countries.find) === null || _countries$find === void 0 ? void 0 : _countries$find.call(countries, country => country.alpha3Code === countryCode));
  }, [countries, countryCode]);
  return celebrityCountry ? __jsx("img", {
    src: `https://flagcdn.com/w20/${celebrityCountry.alpha2Code.toLowerCase()}.webp`,
    alt: Object(_utils_limitString__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(celebrityCountry.name, 10),
    className: className,
    width: width
  }) : __jsx("span", {
    className: `${className} text-primary spinner-grow spinner-grow-sm`,
    role: "status",
    "aria-hidden": "true"
  });
};

const mapStateToProps = state => ({
  countries: state.restCountries.fetchCountriesReducer.data
});

const _CountryFlag = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(CountryFlag);



/***/ }),

/***/ "LeEe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

const Maybe = ({
  it,
  children,
  orElse = null
}) => __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, it ? children : orElse);

/* harmony default export */ __webpack_exports__["a"] = (Maybe);

/***/ }),

/***/ "N39Q":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _ContractPriceLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _state_ducks_payments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("lgZ/");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_number_format__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("uM63");
/* harmony import */ var react_number_format__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_number_format__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _currency_dropdown_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("/u0D");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






class ContractPriceLayout extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  rounding() {
    const res = _currency_dropdown_constants__WEBPACK_IMPORTED_MODULE_4__[/* AVAILABLE_CURRENCIES */ "a"].find(item => item.name === this.props.currency);

    if (this.props.price < res.round) {
      return res.round;
    } else {
      return Math.round(this.props.price / res.round) * res.round;
    }
  }

  render() {
    return __jsx(react_number_format__WEBPACK_IMPORTED_MODULE_3___default.a, {
      value: this.props.price ? this.props.rounding ? this.rounding() : this.props.price : 0,
      displayType: "text",
      thousandSeparator: true,
      decimalScale: 2,
      prefix: _currency_dropdown_constants__WEBPACK_IMPORTED_MODULE_4__[/* AVAILABLE_CURRENCIES */ "a"].find(item => item.name === this.props.currency)["symbol"],
      renderText: value => __jsx("span", {
        className: this.props.classes
      }, " ", value, " ", this.props.currency)
    });
  }

} // Set propTypes


// Set defaultProps
ContractPriceLayout.defaultProps = {
  classes: "",
  price: 0,
  currency: "USD",
  rounding: false
}; // mapStateToProps

const mapStateToProps = state => ({
  currencyExchangeLoading: state.payments.currencyExchangeReducer.loading,
  currencyExchangeData: state.payments.currencyExchangeReducer.data
}); // mapStateToProps


const mapDispatchToProps = {
  currencyExchange: _state_ducks_payments__WEBPACK_IMPORTED_MODULE_1__[/* paymentsOperations */ "b"].currencyExchange
}; // Export Class

const _ContractPriceLayout = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ContractPriceLayout);



/***/ }),

/***/ "TosQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _CelebrityFavoriteButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("68Dr");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _routing_Paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("c5JF");
/* harmony import */ var _state_ducks_celebrity_likes_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("+6uz");
/* harmony import */ var _state_utils_session__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("hVVe");
/* harmony import */ var _state_utils_gtm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("HkHs");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;








const preventRedirectFromParent = event => {
  if (event.stopPropagation) {
    event.stopPropagation();
    event.preventDefault();
  }
};

const mapStateToProps = ({
  celebrityLikes
}) => {
  return {
    userCelebrityLikes: celebrityLikes.fetchUserCelebrityLikesReducer.data.data
  };
};

const CelebrityFavoriteButton = ({
  celebrityId,
  className,
  userCelebrityLikes,
  filledImageSource,
  outlinedImageSource,
  width,
  height = width,
  history,
  location
}) => {
  const {
    0: isFavorite,
    1: setIsFavorite
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    0: isHovering,
    1: setIsHovering
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const analyticsData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => ({
    celebrityId,
    path: location.pathname,
    widget: "CelebrityFavoriteButton"
  }), [celebrityId, location.pathname]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!userCelebrityLikes) return;
    setIsFavorite(Boolean(userCelebrityLikes.find(likeCelebrityId => likeCelebrityId === celebrityId)));
  }, [userCelebrityLikes]);

  const toggleFavorite = async event => {
    preventRedirectFromParent(event);
    const session = new _state_utils_session__WEBPACK_IMPORTED_MODULE_5__[/* Session */ "a"]().getSession();

    if (session) {
      const response = await Object(_state_ducks_celebrity_likes_actions__WEBPACK_IMPORTED_MODULE_4__[/* addOrRemoveLike */ "a"])(celebrityId);

      if (response.status === "OK") {
        _state_utils_gtm__WEBPACK_IMPORTED_MODULE_6__[/* tagManagerDataLayer */ "b"](`CLICK_${!isFavorite ? "" : "UN"}LIKE_CELEBRITY`, analyticsData);
        setIsFavorite(isFavorite => !isFavorite);
      }
    } else {
      _state_utils_gtm__WEBPACK_IMPORTED_MODULE_6__[/* tagManagerDataLayer */ "b"](`CLICK_LIKE_CELEBRITY_UNAUTHENTICATED`, analyticsData);
      localStorage.setItem("finalRedirect", window.location.pathname);
      history.push(_routing_Paths__WEBPACK_IMPORTED_MODULE_3__[/* SIGN_IN_WITH_SPECIFIC_FORM_PATH */ "A"].replace(":form", "email-form"));
    }
  };

  const addIsHovering = () => {
    _state_utils_gtm__WEBPACK_IMPORTED_MODULE_6__[/* tagManagerDataLayer */ "b"](`HOVER_LIKE_CELEBRITY`, analyticsData);
    setIsHovering(true);
  };

  const removeIsHovering = () => {
    setIsHovering(false);
  };

  const alternativeText = `${isFavorite ? "No me" : "Me"} gusta`;
  return __jsx("img", {
    src: isFavorite !== isHovering ? filledImageSource : outlinedImageSource,
    className: `like-icon cursor-pointer ${className}`,
    style: {
      width,
      height
    },
    onMouseOver: addIsHovering,
    onMouseLeave: removeIsHovering,
    onClick: toggleFavorite,
    alt: alternativeText,
    title: alternativeText
  });
};

CelebrityFavoriteButton.defaultProps = {
  className: "",
  userCelebrityLikes: [],
  filledImageSource: "/assets/img/filled-heart.svg",
  outlinedImageSource: "/assets/img/outlined-heart.svg",
  width: "1rem"
};

const _CelebrityFavoriteButton = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps)(Object(_common_routing__WEBPACK_IMPORTED_MODULE_1__[/* withRouter */ "c"])(CelebrityFavoriteButton));



/***/ }),

/***/ "cKot":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const limitString = (string, limit = 17) => {
  const newString = [];
  if (string.length < limit) return string;
  let characterCount = 0;
  const words = string.split(" ");

  for (let index = 0; index < words.length; index += 1) {
    const word = words[index];
    const isInLimit = characterCount + word.length <= limit;

    if (!isInLimit) {
      break;
    }

    newString.push(word);
    characterCount += word.length;
  }

  return `${newString.join(" ")} ...`;
};

/* harmony default export */ __webpack_exports__["a"] = (limitString);

/***/ }),

/***/ "i/n7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "CelebrityDetails", function() { return /* binding */ CelebrityDetails; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__("IZS3");

// EXTERNAL MODULE: external "react-bootstrap/Image"
var Image_ = __webpack_require__("REKQ");
var Image_default = /*#__PURE__*/__webpack_require__.n(Image_);

// EXTERNAL MODULE: ./react-app/src/components/common/helpers/maybe/index.tsx
var maybe = __webpack_require__("LeEe");

// CONCATENATED MODULE: ./react-app/src/components/layouts/profile-picture/index.js
var __jsx = external_react_default.a.createElement;




const ProfilePicture = ({
  avatar,
  roundedCircle,
  width,
  imageStyles
}) => {
  const {
    0: imageIsLoaded,
    1: setImageIsLoaded
  } = Object(external_react_["useState"])(false);

  const changeImageIsLoaded = event => setImageIsLoaded(true);

  return __jsx("figure", {
    className: "mb-0",
    style: {
      width,
      height: width
    }
  }, __jsx(Image_default.a, {
    className: "position-absolute",
    roundedCircle: roundedCircle,
    width: width,
    src: avatar,
    onLoad: changeImageIsLoaded,
    alt: "Imagen de perfil",
    style: imageStyles
  }), __jsx(maybe["a" /* default */], {
    it: !imageIsLoaded
  }, __jsx(Image_default.a, {
    roundedCircle: roundedCircle,
    width: width,
    src: "assets/img/avatar-blank.png",
    style: imageStyles
  })));
};

ProfilePicture.defaultProps = {
  roundedCircle: true,
  width: "100px",
  imageStyles: null
};

// EXTERNAL MODULE: ./react-app/src/components/layouts/hire-this-celebrity-button/index.js + 2 modules
var hire_this_celebrity_button = __webpack_require__("RFYS");

// EXTERNAL MODULE: ./react-app/src/components/common/routing/index.js + 3 modules
var routing = __webpack_require__("68Dr");

// EXTERNAL MODULE: ./react-app/src/routing/Paths.js
var Paths = __webpack_require__("c5JF");

// EXTERNAL MODULE: ./react-app/src/state/utils/gtm.js
var gtm = __webpack_require__("HkHs");

// EXTERNAL MODULE: external "parse-full-name"
var external_parse_full_name_ = __webpack_require__("y9n4");

// EXTERNAL MODULE: ./react-app/src/components/layouts/call-to-action-button/index.js
var call_to_action_button = __webpack_require__("iWI7");

// CONCATENATED MODULE: ./react-app/src/components/layouts/subscribe-to-this-celebrity-button/index.js
var subscribe_to_this_celebrity_button_jsx = external_react_default.a.createElement;







const SubscribeToThisCelebrityButton = ({
  className,
  text,
  celebrityFullName,
  celebrityUsername,
  fontSize,
  width
}) => {
  // PARA REMOVER TEMPORALMENTE ESTE COMPONENTE.
  return null;

  const registerSubscribeToThisCelebrityButtonEvent = eventName => {
    gtm["b" /* tagManagerDataLayer */](eventName + "_SUBSCRIBE_TO_THIS_CELEBRITY_BUTTON", {
      path: window.location.pathname,
      widget: "SubscribeToThisCelebrityButton",
      text,
      celebrityFullName,
      celebrityUsername
    });
  };

  const parsedFullName = Object(external_parse_full_name_["parseFullName"])(celebrityFullName, "all", true, false, true);
  const fullNameWords = celebrityFullName.split(" ");
  const displayName = parsedFullName.first === "Papá" ? `${fullNameWords[0]} ${fullNameWords[1]}` : parsedFullName.first || parsedFullName.last;
  return subscribe_to_this_celebrity_button_jsx(routing["a" /* NavLink */], {
    to: Paths["F" /* SUBSCRIPTION */].replace(":celebrity_username", celebrityUsername),
    onClick: () => registerSubscribeToThisCelebrityButtonEvent("CLICK"),
    onMouseOver: () => registerSubscribeToThisCelebrityButtonEvent("HOVER")
  }, subscribe_to_this_celebrity_button_jsx(call_to_action_button["a" /* CallToActionButton */], {
    fontSize: fontSize,
    width: width,
    className: className
  }, text, celebrityFullName ? " " + displayName : ""));
};


// EXTERNAL MODULE: external "lodash.debounce"
var external_lodash_debounce_ = __webpack_require__("Q4dm");
var external_lodash_debounce_default = /*#__PURE__*/__webpack_require__.n(external_lodash_debounce_);

// CONCATENATED MODULE: ./react-app/src/utils/getElementTotalCharacterByLine.js
const getElementCharacterWidth = element => parseFloat(getComputedStyle(element).fontSize.replace(/\D/g, "")) / 2;

const getElementTotalCharacterByLine = element => {
  const elementWidth = element.offsetWidth;
  const elementCharacterWidth = getElementCharacterWidth(element);
  return Math.floor(elementWidth / elementCharacterWidth);
};

/* harmony default export */ var utils_getElementTotalCharacterByLine = (getElementTotalCharacterByLine);
// EXTERNAL MODULE: ./react-app/src/utils/getWindow.js
var getWindow = __webpack_require__("V08N");

// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrities-profile-description/index.js
var celebrities_profile_description_jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const TotalCharactersInThreeLinesOnSmallBreakpoint = 135;

const CelebritiesProfileDescription = ({
  descriptionText,
  totalDesiredLinesOfDescriptionText
}) => {
  const {
    0: totalCharacterLengthToCollapse,
    1: setTotalCharacterLengthToCollapse
  } = Object(external_react_["useState"])(TotalCharactersInThreeLinesOnSmallBreakpoint);
  const descriptionTextRef = Object(external_react_["useRef"])();
  const {
    0: showMore,
    1: setShowMore
  } = Object(external_react_["useState"])(false);
  const analyticsData = {
    widget: "CelebritiesProfileDescription",
    path: Object(getWindow["a" /* default */])().location.pathname,
    descriptionText
  };

  const toggleShowMore = () => {
    setShowMore(previousShowMore => !previousShowMore);
    gtm["b" /* tagManagerDataLayer */]("TOGGLE_CELEBRITY_PROFILE_DESCRIPTION_SHOW_MORE", _objectSpread(_objectSpread({}, analyticsData), {}, {
      showMore: !showMore
    }));
  };

  Object(external_react_["useEffect"])(() => {
    const descriptionTextSpanElement = descriptionTextRef.current;

    const updateTotalCharacterLengthToCollapse = () => {
      const totalCharacterByLine = utils_getElementTotalCharacterByLine(descriptionTextSpanElement);
      setTotalCharacterLengthToCollapse(totalCharacterByLine * totalDesiredLinesOfDescriptionText);
    };

    updateTotalCharacterLengthToCollapse();
    window.addEventListener("resize", external_lodash_debounce_default()(updateTotalCharacterLengthToCollapse, 500));
  }, []);

  const descriptionTextSpan = celebrities_profile_description_jsx("span", {
    className: "container-celebrities-profile__text-span",
    ref: descriptionTextRef
  }, descriptionText);

  return celebrities_profile_description_jsx("div", {
    className: `container-celebrities-profile-description`
  }, descriptionText.length >= totalCharacterLengthToCollapse ? celebrities_profile_description_jsx(external_react_default.a.Fragment, null, celebrities_profile_description_jsx(external_react_bootstrap_["Collapse"], {
    className: `container-celebrities-profile-description__collapse`,
    in: showMore
  }, celebrities_profile_description_jsx("div", null, descriptionTextSpan)), celebrities_profile_description_jsx("div", {
    className: "container-celebrities-profile-description__toggle-description"
  }, celebrities_profile_description_jsx("button", {
    type: "button",
    onClick: toggleShowMore,
    className: "btn btn-light container-celebrities-profile-description__toggle-button"
  }, celebrities_profile_description_jsx("i", {
    className: `fas fa-angle-${showMore ? "up" : "down"}`
  })))) : celebrities_profile_description_jsx("div", null, descriptionTextSpan));
};

CelebritiesProfileDescription.defaultProps = {
  descriptionText: "",
  totalDesiredLinesOfDescriptionText: 3
};

// EXTERNAL MODULE: ./react-app/src/components/layouts/flash-delivery-badge/index.js
var flash_delivery_badge = __webpack_require__("4q9T");

// EXTERNAL MODULE: ./react-app/src/components/containers/celebrity-country-flag/index.js
var celebrity_country_flag = __webpack_require__("BFjd");

// EXTERNAL MODULE: ./react-app/src/components/layouts/celebrity-favorite-button/index.js
var celebrity_favorite_button = __webpack_require__("TosQ");

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./react-app/src/components/layouts/contract-price/index.js
var contract_price = __webpack_require__("N39Q");

// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrity-contract-price/index.js
var celebrity_contract_price_jsx = external_react_default.a.createElement;




const getContractPrice = (contractTypes, currencyExchangeData) => {
  const videoMessageContract = contractTypes.find(({
    contractType
  }) => contractType === 1);
  let videoMessagePrice = 0;

  if (videoMessageContract) {
    videoMessagePrice = videoMessageContract.price;
  }

  if (currencyExchangeData.rate) {
    return videoMessagePrice * currencyExchangeData.rate;
  } else {
    return videoMessagePrice;
  }
};

const CelebrityContractPrice = ({
  className,
  contractTypes,
  currencyExchangeData
}) => {
  const price = Object(external_react_["useMemo"])(() => getContractPrice(contractTypes, currencyExchangeData), [contractTypes, currencyExchangeData]);
  return celebrity_contract_price_jsx(contract_price["a" /* ContractPriceLayout */], {
    classes: `text-black font-weight-bold ${className}`,
    price: price,
    currency: currencyExchangeData.to,
    rounding: true
  });
};

CelebrityContractPrice.defaultProps = {
  className: "",
  contractTypes: [],
  currencyExchangeData: {
    rate: 1
  }
};

const mapStateToProps = ({
  payments
}) => ({
  currencyExchangeData: payments.currencyExchangeReducer.data
});

const _CelebrityContractPrice = Object(external_react_redux_["connect"])(mapStateToProps)(CelebrityContractPrice);


// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrities-response-time/index.js
var celebrities_response_time_jsx = external_react_default.a.createElement;


const getTurnAroundText = turnAroundTime => {
  if (turnAroundTime < 1) {
    return "Pocas horas";
  } else if (turnAroundTime === 1) {
    return `${turnAroundTime} día`;
  } else {
    return `${turnAroundTime} días`;
  }
};

const CelebritiesResponseTime = ({
  turnAroundTime,
  availableForFlashDeliveries
}) => {
  return celebrities_response_time_jsx("span", {
    className: "CelebritiesResponseTime"
  }, "Respuesta promedio:", " ", celebrities_response_time_jsx("br", {
    className: `CelebritiesResponseTime__line-break ${availableForFlashDeliveries ? "isAvailableForFlashDeliveries" : ""}`
  }), " ", celebrities_response_time_jsx("span", null, availableForFlashDeliveries ? "Entrega flash (< de 24 hrs)" : getTurnAroundText(parseInt(turnAroundTime))));
};


// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrity-info/index.js
var celebrity_info_jsx = external_react_default.a.createElement;





const CelebrityInfo = ({
  fullName,
  countryCode,
  categoryTitle,
  celebrityId,
  contractTypes,
  turnAround,
  availableForFlashDeliveries,
  variant
}) => {
  switch (variant) {
    case "1":
    default:
      return celebrity_info_jsx(external_react_default.a.Fragment, null, celebrity_info_jsx("h4", {
        className: "CelebrityInfo__full-name"
      }, fullName), celebrity_info_jsx("div", {
        className: "d-flex align-items-center mb-2"
      }, celebrity_info_jsx(celebrity_country_flag["a" /* CountryFlag */], {
        countryCode: countryCode
      }), celebrity_info_jsx("span", {
        className: "ml-3 CelebrityInfo__category"
      }, categoryTitle), celebrity_info_jsx(celebrity_favorite_button["a" /* CelebrityFavoriteButton */], {
        className: "d-none d-md-block CelebrityInfo__fav-button-desktop",
        celebrityId: celebrityId,
        outlinedImageSource: "assets/img/heart-regular-outlined.svg",
        width: "2.5rem"
      })), celebrity_info_jsx("div", {
        className: "d-flex justify-content-between align-items-center"
      }, celebrity_info_jsx(_CelebrityContractPrice, {
        contractTypes: contractTypes,
        className: "CelebrityInfo__contract-price"
      }), celebrity_info_jsx(celebrity_favorite_button["a" /* CelebrityFavoriteButton */], {
        className: "d-md-none",
        celebrityId: celebrityId,
        outlinedImageSource: "assets/img/heart-regular-outlined.svg",
        width: "1.5rem"
      })), celebrity_info_jsx("div", {
        className: "mt-md-2 mb-md-4"
      }, celebrity_info_jsx(CelebritiesResponseTime, {
        turnAroundTime: turnAround,
        availableForFlashDeliveries: availableForFlashDeliveries
      })));

    case "1.1":
      return celebrity_info_jsx(external_react_default.a.Fragment, null, celebrity_info_jsx(celebrity_favorite_button["a" /* CelebrityFavoriteButton */], {
        className: "mb-3",
        celebrityId: celebrityId,
        outlinedImageSource: "assets/img/heart-regular-outlined.svg",
        width: "1.25rem"
      }), celebrity_info_jsx("h4", {
        className: "CelebrityInfo__full-name"
      }, fullName), celebrity_info_jsx("div", {
        className: "d-flex align-items-center mb-2 mb-md-3"
      }, celebrity_info_jsx(celebrity_country_flag["a" /* CountryFlag */], {
        countryCode: countryCode
      }), celebrity_info_jsx("span", {
        className: "ml-3 CelebrityInfo__category"
      }, categoryTitle)));

    case "2":
      return celebrity_info_jsx(external_react_default.a.Fragment, null, celebrity_info_jsx("div", {
        className: "text-right mb-2"
      }, celebrity_info_jsx(celebrity_favorite_button["a" /* CelebrityFavoriteButton */], {
        className: "d-md-none",
        celebrityId: celebrityId,
        outlinedImageSource: "assets/img/heart-regular-outlined.svg",
        width: "1.25rem"
      })), celebrity_info_jsx("h4", {
        className: "CelebrityInfo__full-name"
      }, fullName), celebrity_info_jsx("div", {
        className: "d-flex align-items-center mb-2"
      }, celebrity_info_jsx(celebrity_country_flag["a" /* CountryFlag */], {
        countryCode: countryCode
      }), celebrity_info_jsx("span", {
        className: "ml-3 CelebrityInfo__category"
      }, categoryTitle), celebrity_info_jsx(celebrity_favorite_button["a" /* CelebrityFavoriteButton */], {
        className: "d-none d-md-inline ml-auto",
        celebrityId: celebrityId,
        outlinedImageSource: "assets/img/heart-regular-outlined.svg",
        width: "2.5rem"
      })), celebrity_info_jsx("div", {
        className: "d-flex justify-content-between align-items-center"
      }, celebrity_info_jsx(_CelebrityContractPrice, {
        contractTypes: contractTypes,
        className: "CelebrityInfo__contract-price"
      })), celebrity_info_jsx("div", {
        className: "mt-md-2 mb-md-4"
      }, celebrity_info_jsx(CelebritiesResponseTime, {
        turnAroundTime: turnAround,
        availableForFlashDeliveries: availableForFlashDeliveries,
        className: "CelebrityInfo__contract-price"
      })));
  }
};
// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrity-donor-alert/index.js
var celebrity_donor_alert_jsx = external_react_default.a.createElement;

const CelebrityDonorAlert = ({
  className = "",
  fullName,
  causeName
}) => {
  return celebrity_donor_alert_jsx("div", {
    className: `CelebrityDonorAlert d-flex align-items-center justify-content-center py-3 px-3 px-xl-5 ${className}`
  }, celebrity_donor_alert_jsx("div", {
    className: "CelebrityDonorAlert__image-side mr-3"
  }, celebrity_donor_alert_jsx("img", {
    src: "assets/img/charity-icon.svg",
    alt: "Caridad",
    className: "CelebrityDonorAlert__image"
  })), celebrity_donor_alert_jsx("div", {
    className: "text-center"
  }, celebrity_donor_alert_jsx("p", {
    className: "m-0 CelebrityDonorAlert__text"
  }, fullName, " dona de sus ingresos a: ", celebrity_donor_alert_jsx("br", null), " ", celebrity_donor_alert_jsx("span", {
    className: "CelebrityDonorAlert__cause-name text-with-ellipsis"
  }, causeName))));
};
// CONCATENATED MODULE: ./react-app/src/components/containers/emoji/emoji.tsx

var emoji_jsx = external_react_default.a.createElement;

const Emoji = ({
  label = "",
  symbol
}) => emoji_jsx("span", {
  className: "emoji",
  role: "img",
  "aria-label": label,
  "aria-hidden": !label
}, symbol);

/* harmony default export */ var emoji = (Emoji);
// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrity-details/index.js
var celebrity_details_jsx = external_react_default.a.createElement;











const CelebrityDetails = ({
  celebrity,
  variant
}) => {
  const {
    fullName,
    username,
    avatar,
    countryCode,
    categoryTitle,
    id: celebrityId,
    contractTypes,
    description,
    turnaround,
    availableForSubscriptions,
    availableForFlashDeliveries,
    isDonor,
    causeName,
    causeUrl
  } = celebrity;
  return celebrity_details_jsx(external_react_bootstrap_["Container"], {
    className: `mx-auto CelebrityDetails ${variant === "1" ? "mb-0" : ""} ${variant === "2" ? "mb-4 mt-0" : ""}`
  }, celebrity_details_jsx(external_react_bootstrap_["Row"], {
    className: "justify-content-md-center align-items-center my-3"
  }, celebrity_details_jsx(external_react_bootstrap_["Col"], {
    xs: "auto d-md-none",
    className: "text-center"
  }, celebrity_details_jsx(ProfilePicture, {
    avatar: avatar,
    width: "139px",
    imageStyles: availableForFlashDeliveries ? {
      marginBottom: "-2rem"
    } : null
  }), availableForFlashDeliveries ? celebrity_details_jsx(flash_delivery_badge["a" /* FlashDeliveryBadgeLayout */], {
    color: "dark",
    showTitle: true
  }) : null), celebrity_details_jsx(external_react_bootstrap_["Col"], {
    xs: "auto d-none d-md-block",
    className: "text-center"
  }, celebrity_details_jsx(ProfilePicture, {
    avatar: avatar,
    width: "200px",
    imageStyles: availableForFlashDeliveries ? {
      marginBottom: "-2.5rem"
    } : null
  }), availableForFlashDeliveries ? celebrity_details_jsx(flash_delivery_badge["a" /* FlashDeliveryBadgeLayout */], {
    className: "CelebrityDetails__flash-delivery-large",
    color: "dark",
    showTime: true,
    showTitle: true
  }) : null), celebrity_details_jsx(external_react_bootstrap_["Col"], null, celebrity_details_jsx(CelebrityInfo, {
    variant: variant,
    fullName: fullName,
    countryCode: countryCode,
    categoryTitle: categoryTitle,
    celebrityId: celebrityId,
    contractTypes: contractTypes,
    turnAround: turnaround,
    availableForFlashDeliveries: availableForFlashDeliveries
  }), celebrity_details_jsx(external_react_bootstrap_["Col"], {
    className: "d-none d-md-block mx-0 px-0"
  }, celebrity_details_jsx(hire_this_celebrity_button["HireThisCelebrityButton"], {
    showCelebrityName: false,
    celebrityFullName: fullName,
    celebrityUsername: username,
    text: celebrity_details_jsx(external_react_default.a.Fragment, null, celebrity_details_jsx(emoji, {
      label: "star-struck",
      symbol: "\uD83E\uDD29"
    }), celebrity_details_jsx("span", {
      style: {
        fontWeight: "bold",
        color: "white"
      }
    }, "\xA1Comprar video ahora!"), celebrity_details_jsx(emoji, {
      label: "star-struck",
      symbol: "\uD83E\uDD29"
    })),
    width: "100%",
    fontSize: "1.25em"
  }), availableForSubscriptions ? celebrity_details_jsx(SubscribeToThisCelebrityButton, {
    className: "mt-2",
    celebrityFullName: fullName,
    celebrityUsername: username,
    text: "Suscribirme a ",
    width: "100%",
    fontSize: "1.25em"
  }) : null, isDonor ? celebrity_details_jsx(CelebrityDonorAlert, {
    fullName: fullName,
    causeName: causeName,
    causeUrl: causeUrl,
    className: "mt-2"
  }) : null))), celebrity_details_jsx(external_react_bootstrap_["Row"], null, isDonor ? celebrity_details_jsx(external_react_bootstrap_["Col"], {
    xs: "12",
    className: "d-md-none"
  }, celebrity_details_jsx(CelebrityDonorAlert, {
    fullName: fullName,
    causeName: causeName,
    causeUrl: causeUrl
  })) : null, celebrity_details_jsx(external_react_bootstrap_["Col"], {
    className: "mx-3 my-3 px-0"
  }, celebrity_details_jsx(CelebritiesProfileDescription, {
    descriptionText: description
  }))), celebrity_details_jsx(external_react_bootstrap_["Row"], null, celebrity_details_jsx(external_react_bootstrap_["Col"], {
    className: "d-md-none"
  }, celebrity_details_jsx(hire_this_celebrity_button["HireThisCelebrityButton"], {
    showCelebrityName: false,
    className: "button-hire-this-celebrity",
    celebrityFullName: fullName,
    celebrityUsername: username,
    text: celebrity_details_jsx(external_react_default.a.Fragment, null, celebrity_details_jsx(emoji, {
      label: "star-struck",
      symbol: "\uD83E\uDD29"
    }), celebrity_details_jsx("span", {
      style: {
        fontWeight: "bold",
        color: "white"
      }
    }, "\xA1Comprar video ahora!"), celebrity_details_jsx(emoji, {
      label: "star-struck",
      symbol: "\uD83E\uDD29"
    })),
    width: "100%"
  }), availableForSubscriptions ? celebrity_details_jsx(SubscribeToThisCelebrityButton, {
    className: "mt-2",
    celebrityFullName: fullName,
    celebrityUsername: username,
    text: // variant.startsWith("1")

    /* ?  */
    "Suscribirme a " // : "Obtén un video de"
    ,
    width: "100%",
    fontSize: "1.25em"
  }) : null)));
};



/***/ })

};;