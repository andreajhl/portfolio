exports.ids = [57];
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

/***/ "8OQS":
/***/ (function(module, exports) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ "Aiso":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("dQHF")


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

/***/ "ZWtG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return memoizedCelebrityShimmerCardLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const CelebrityShimmerCardLayout = ({
  className
}) => {
  return __jsx("div", {
    className: `CelebrityShimmerCardLayout ${className}`
  }, __jsx("div", {
    className: "shimmer-card"
  }, __jsx("div", {
    className: "shimmerBG mr-0"
  }, __jsx("div", {
    className: "line price-line"
  })), __jsx("div", {
    className: "card-details"
  }, __jsx("div", {
    className: "celebrity-info mb-1"
  }, __jsx("div", {
    className: "line flag-line"
  }), __jsx("div", {
    className: "line w-25"
  }), __jsx("img", {
    src: "/assets/img/outlined-heart.svg",
    className: "heart-icon"
  })), __jsx("div", {
    className: "line w-100 celebrity-name"
  }))));
};

CelebrityShimmerCardLayout.defaultProps = {
  className: ""
};
const memoizedCelebrityShimmerCardLayout = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(CelebrityShimmerCardLayout);


/***/ }),

/***/ "bASm":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimilarCelebritiesCardsSectionLayout", function() { return _SimilarCelebritiesCardsSectionLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _celebrity_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("f1S7");
/* harmony import */ var _state_ducks_celebrities_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("rlcS");
/* harmony import */ var _carousel_with_buttons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("n87E");
/* harmony import */ var _celebrity_shimmer_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("ZWtG");
/* harmony import */ var _state_utils_gtm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("HkHs");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const SimilarCelebritiesCardsSectionLayout = ({
  celebrityUsername,
  isLoading,
  similarCelebrities,
  fetchSimilarCelebrities
}) => {
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    fetchSimilarCelebrities(celebrityUsername);
  }, [celebrityUsername, fetchSimilarCelebrities]);
  const analyticsData = {
    widget: "SimilarCelebritiesCardsSectionLayout",
    path: window.location.pathname,
    celebrityUsername
  };

  const registerListHover = () => {
    _state_utils_gtm__WEBPACK_IMPORTED_MODULE_6__[/* tagManagerDataLayer */ "b"]("HOVER_SIMILAR_CELEBRITIES_CARD_LIST", analyticsData);
  };

  const registerListScroll = hasReachedListEnd => {
    _state_utils_gtm__WEBPACK_IMPORTED_MODULE_6__[/* tagManagerDataLayer */ "b"]("SCROLL_SIMILAR_CELEBRITIES_CARD_LIST", _objectSpread(_objectSpread({}, analyticsData), {}, {
      hasReachedListEnd
    }));
  };

  const registerSimilarCelebritiesCardsScrollButtonClick = direction => {
    _state_utils_gtm__WEBPACK_IMPORTED_MODULE_6__[/* tagManagerDataLayer */ "b"]("CLICK_SIMILAR_CELEBRITIES_CARD_SECTION_SCROLL_BUTTON", _objectSpread(_objectSpread({}, analyticsData), {}, {
      direction
    }));
  };

  return __jsx("section", {
    className: "SimilarCelebritiesCardsSectionLayout mb-2 pt-2"
  }, __jsx(_carousel_with_buttons__WEBPACK_IMPORTED_MODULE_4__[/* Container */ "a"], {
    buttonsStyles: {
      top: "2.85rem"
    },
    onScrollTo: registerSimilarCelebritiesCardsScrollButtonClick,
    onListScroll: registerListScroll
  }, __jsx(_carousel_with_buttons__WEBPACK_IMPORTED_MODULE_4__[/* Header */ "b"], null, __jsx(_carousel_with_buttons__WEBPACK_IMPORTED_MODULE_4__[/* Title */ "d"], {
    className: "text-black text-center mb-4 w-100 font-weight-bold"
  }, "Famosos similares")), __jsx(_carousel_with_buttons__WEBPACK_IMPORTED_MODULE_4__[/* List */ "c"], null, __jsx("ul", {
    className: "SimilarCelebritiesCardsSectionLayout__list",
    onMouseOver: registerListHover
  }, !isLoading && similarCelebrities.length > 0 ? similarCelebrities.map(similarCelebrity => {
    const celebrity = _objectSpread(_objectSpread({}, similarCelebrity), {}, {
      username: similarCelebrity.celebrityUsername,
      avatar: similarCelebrity.celebrityAvatar,
      title: similarCelebrity.categoryTitle,
      id: similarCelebrity.celebrityId,
      fullName: similarCelebrity.celebrityFullName
    });

    return __jsx("li", {
      className: "mr-3",
      key: "similar-celebrities-" + celebrity.id
    }, __jsx(_celebrity_card__WEBPACK_IMPORTED_MODULE_2__[/* CelebrityCardLayout */ "a"], {
      celebrity: celebrity
    }));
  }) : Array(15).fill(null).map((item, index) => __jsx("li", {
    className: "mr-3",
    key: index
  }, __jsx(_celebrity_shimmer_card__WEBPACK_IMPORTED_MODULE_5__[/* CelebrityShimmerCardLayout */ "a"], null)))))));
}; // default props


SimilarCelebritiesCardsSectionLayout.defaultProps = {
  isLoading: false,
  similarCelebrities: []
};

const mapStateToProps = ({
  celebrities
}) => {
  return {
    isLoading: celebrities.fetchSimilarCelebritiesReducer.loading,
    similarCelebrities: celebrities.fetchSimilarCelebritiesReducer.data.results
  };
};

const mapDispatchToProps = {
  fetchSimilarCelebrities: _state_ducks_celebrities_actions__WEBPACK_IMPORTED_MODULE_3__[/* fetchSimilarCelebrities */ "d"]
};

const _SimilarCelebritiesCardsSectionLayout = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(SimilarCelebritiesCardsSectionLayout);



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

/***/ "dQHF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.default = Image;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__("8OQS"));

var _extends2 = _interopRequireDefault(__webpack_require__("pVnL"));

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _head = _interopRequireDefault(__webpack_require__("UlpK"));

var _toBase = __webpack_require__("7UUK");

var _imageConfig = __webpack_require__("ANQk");

var _useIntersection = __webpack_require__("vNVm");

if (true) {
  ;
  global.__NEXT_IMAGE_IMPORTED = true;
}

const VALID_LOADING_VALUES = ['lazy', 'eager', undefined];
const loaders = new Map([['imgix', imgixLoader], ['cloudinary', cloudinaryLoader], ['akamai', akamaiLoader], ['default', defaultLoader]]);
const VALID_LAYOUT_VALUES = ['fill', 'fixed', 'intrinsic', 'responsive', undefined];
const {
  deviceSizes: configDeviceSizes,
  imageSizes: configImageSizes,
  loader: configLoader,
  path: configPath,
  domains: configDomains
} = {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default"} || _imageConfig.imageConfigDefault; // sort smallest to largest

const allSizes = [...configDeviceSizes, ...configImageSizes];
configDeviceSizes.sort((a, b) => a - b);
allSizes.sort((a, b) => a - b);

function getWidths(width, layout) {
  if (typeof width !== 'number' || layout === 'fill' || layout === 'responsive') {
    return {
      widths: configDeviceSizes,
      kind: 'w'
    };
  }

  const widths = [...new Set( // > This means that most OLED screens that say they are 3x resolution,
  // > are actually 3x in the green color, but only 1.5x in the red and
  // > blue colors. Showing a 3x resolution image in the app vs a 2x
  // > resolution image will be visually the same, though the 3x image
  // > takes significantly more data. Even true 3x resolution screens are
  // > wasteful as the human eye cannot see that level of detail without
  // > something like a magnifying glass.
  // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
  [width, width * 2
  /*, width * 3*/
  ].map(w => allSizes.find(p => p >= w) || allSizes[allSizes.length - 1]))];
  return {
    widths,
    kind: 'x'
  };
}

function generateImgAttrs({
  src,
  unoptimized,
  layout,
  width,
  quality,
  sizes,
  loader
}) {
  if (unoptimized) {
    return {
      src,
      srcSet: undefined,
      sizes: undefined
    };
  }

  const {
    widths,
    kind
  } = getWidths(width, layout);
  const last = widths.length - 1;
  return {
    src: loader({
      src,
      quality,
      width: widths[last]
    }),
    sizes: !sizes && kind === 'w' ? '100vw' : sizes,
    srcSet: widths.map((w, i) => `${loader({
      src,
      quality,
      width: w
    })} ${kind === 'w' ? w : i + 1}${kind}`).join(', ')
  };
}

function getInt(x) {
  if (typeof x === 'number') {
    return x;
  }

  if (typeof x === 'string') {
    return parseInt(x, 10);
  }

  return undefined;
}

function defaultImageLoader(loaderProps) {
  const load = loaders.get(configLoader);

  if (load) {
    return load((0, _extends2.default)({
      root: configPath
    }, loaderProps));
  }

  throw new Error(`Unknown "loader" found in "next.config.js". Expected: ${_imageConfig.VALID_LOADERS.join(', ')}. Received: ${configLoader}`);
}

function Image(_ref) {
  let {
    src,
    sizes,
    unoptimized = false,
    priority = false,
    loading,
    className,
    quality,
    width,
    height,
    objectFit,
    objectPosition,
    loader = defaultImageLoader
  } = _ref,
      all = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["src", "sizes", "unoptimized", "priority", "loading", "className", "quality", "width", "height", "objectFit", "objectPosition", "loader"]);
  let rest = all;
  let layout = sizes ? 'responsive' : 'intrinsic';
  let unsized = false;

  if ('unsized' in rest) {
    unsized = Boolean(rest.unsized); // Remove property so it's not spread into image:

    delete rest['unsized'];
  } else if ('layout' in rest) {
    // Override default layout if the user specified one:
    if (rest.layout) layout = rest.layout; // Remove property so it's not spread into image:

    delete rest['layout'];
  }

  if (false) {}

  let isLazy = !priority && (loading === 'lazy' || typeof loading === 'undefined');

  if (src && src.startsWith('data:')) {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    unoptimized = true;
    isLazy = false;
  }

  const [setRef, isIntersected] = (0, _useIntersection.useIntersection)({
    rootMargin: '200px',
    disabled: !isLazy
  });
  const isVisible = !isLazy || isIntersected;
  const widthInt = getInt(width);
  const heightInt = getInt(height);
  const qualityInt = getInt(quality);
  let wrapperStyle;
  let sizerStyle;
  let sizerSvg;
  let imgStyle = {
    visibility: isVisible ? 'inherit' : 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    boxSizing: 'border-box',
    padding: 0,
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: 0,
    height: 0,
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit,
    objectPosition
  };

  if (typeof widthInt !== 'undefined' && typeof heightInt !== 'undefined' && layout !== 'fill') {
    // <Image src="i.png" width="100" height="100" />
    const quotient = heightInt / widthInt;
    const paddingTop = isNaN(quotient) ? '100%' : `${quotient * 100}%`;

    if (layout === 'responsive') {
      // <Image src="i.png" width="100" height="100" layout="responsive" />
      wrapperStyle = {
        display: 'block',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        display: 'block',
        boxSizing: 'border-box',
        paddingTop
      };
    } else if (layout === 'intrinsic') {
      // <Image src="i.png" width="100" height="100" layout="intrinsic" />
      wrapperStyle = {
        display: 'inline-block',
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        boxSizing: 'border-box',
        display: 'block',
        maxWidth: '100%'
      };
      sizerSvg = `<svg width="${widthInt}" height="${heightInt}" xmlns="http://www.w3.org/2000/svg" version="1.1"/>`;
    } else if (layout === 'fixed') {
      // <Image src="i.png" width="100" height="100" layout="fixed" />
      wrapperStyle = {
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'inline-block',
        position: 'relative',
        width: widthInt,
        height: heightInt
      };
    }
  } else if (typeof widthInt === 'undefined' && typeof heightInt === 'undefined' && layout === 'fill') {
    // <Image src="i.png" layout="fill" />
    wrapperStyle = {
      display: 'block',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      boxSizing: 'border-box',
      margin: 0
    };
  } else {
    // <Image src="i.png" />
    if (false) {}
  }

  let imgAttributes = {
    src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    srcSet: undefined,
    sizes: undefined
  };

  if (isVisible) {
    imgAttributes = generateImgAttrs({
      src,
      unoptimized,
      layout,
      width: widthInt,
      quality: qualityInt,
      sizes,
      loader
    });
  }

  if (unsized) {
    wrapperStyle = undefined;
    sizerStyle = undefined;
    imgStyle = undefined;
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    style: wrapperStyle
  }, sizerStyle ? /*#__PURE__*/_react.default.createElement("div", {
    style: sizerStyle
  }, sizerSvg ? /*#__PURE__*/_react.default.createElement("img", {
    style: {
      maxWidth: '100%',
      display: 'block',
      margin: 0,
      border: 'none',
      padding: 0
    },
    alt: "",
    "aria-hidden": true,
    role: "presentation",
    src: `data:image/svg+xml;base64,${(0, _toBase.toBase64)(sizerSvg)}`
  }) : null) : null, /*#__PURE__*/_react.default.createElement("img", Object.assign({}, rest, imgAttributes, {
    decoding: "async",
    className: className,
    ref: setRef,
    style: imgStyle
  })), priority ?
  /*#__PURE__*/
  // Note how we omit the `href` attribute, as it would only be relevant
  // for browsers that do not support `imagesrcset`, and in those cases
  // it would likely cause the incorrect image to be preloaded.
  //
  // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
  _react.default.createElement(_head.default, null, /*#__PURE__*/_react.default.createElement("link", {
    key: '__nimg-' + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes,
    rel: "preload",
    as: "image",
    href: imgAttributes.srcSet ? undefined : imgAttributes.src // @ts-ignore: imagesrcset is not yet in the link element type
    ,
    imagesrcset: imgAttributes.srcSet // @ts-ignore: imagesizes is not yet in the link element type
    ,
    imagesizes: imgAttributes.sizes
  })) : null);
} //BUILT IN LOADERS


function normalizeSrc(src) {
  return src[0] === '/' ? src.slice(1) : src;
}

function imgixLoader({
  root,
  src,
  width,
  quality
}) {
  // Demo: https://static.imgix.net/daisy.png?format=auto&fit=max&w=300
  const params = ['auto=format', 'fit=max', 'w=' + width];
  let paramsString = '';

  if (quality) {
    params.push('q=' + quality);
  }

  if (params.length) {
    paramsString = '?' + params.join('&');
  }

  return `${root}${normalizeSrc(src)}${paramsString}`;
}

function akamaiLoader({
  root,
  src,
  width
}) {
  return `${root}${normalizeSrc(src)}?imwidth=${width}`;
}

function cloudinaryLoader({
  root,
  src,
  width,
  quality
}) {
  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 'auto')];
  let paramsString = params.join(',') + '/';
  return `${root}${paramsString}${normalizeSrc(src)}`;
}

function defaultLoader({
  root,
  src,
  width,
  quality
}) {
  if (false) {}

  return `${root}?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}

/***/ }),

/***/ "f1S7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _CelebrityCardLayout; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./react-app/src/components/common/routing/index.js + 3 modules
var routing = __webpack_require__("68Dr");

// EXTERNAL MODULE: ./react-app/src/routing/Paths.js
var Paths = __webpack_require__("c5JF");

// EXTERNAL MODULE: ./react-app/src/state/utils/gtm.js
var gtm = __webpack_require__("HkHs");

// EXTERNAL MODULE: ./react-app/src/state/ducks/cursor-position/index.js + 4 modules
var cursor_position = __webpack_require__("LJ66");

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./react-app/src/state/ducks/payments/index.js + 2 modules
var payments = __webpack_require__("lgZ/");

// EXTERNAL MODULE: external "react-number-format"
var external_react_number_format_ = __webpack_require__("uM63");
var external_react_number_format_default = /*#__PURE__*/__webpack_require__.n(external_react_number_format_);

// EXTERNAL MODULE: ./react-app/src/components/layouts/currency-dropdown/constants.js
var constants = __webpack_require__("/u0D");

// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrity-card-contract-price/index.js
var __jsx = external_react_default.a.createElement;






class celebrity_card_contract_price_ContractPriceLayout extends external_react_["Component"] {
  rounding() {
    const res = constants["a" /* AVAILABLE_CURRENCIES */].find(item => item.name === this.props.currency);

    if (this.props.price < res.round) {
      return res.round;
    } else {
      return Math.round(this.props.price / res.round) * res.round;
    }
  }

  renderText(value) {
    if (this.props.availableDiscount) {
      return __jsx("div", null, __jsx("span", {
        className: this.props.classes
      }, " ", "Precio original:", " ", __jsx("span", {
        className: "text-dark"
      }, this.props.availableDiscount.initialPrice, " ", this.props.currency)), " ", __jsx("br", null), __jsx("span", {
        className: this.props.classes
      }, "Descuento:", " ", __jsx("span", {
        className: "text-danger"
      }, this.props.availableDiscount.isPercentageDiscount ? ` ${this.props.availableDiscount.discountAmount}% | ${(this.props.availableDiscount.discountAmount / 100 * this.props.price).toFixed(2)} ${this.props.currency}` : ` ${this.props.availableDiscount.discountAmount} ${this.props.currency}`, " ")), __jsx("br", null), __jsx("span", {
        className: this.props.classes
      }, "Precio total: ", value, " ", this.props.currency), __jsx("br", null));
    } else {
      return __jsx("span", {
        className: this.props.classes
      }, " ", value, " ", this.props.currency);
    }
  }

  render() {
    return __jsx(external_react_number_format_default.a, {
      value: this.props.price ? this.props.rounding ? this.rounding() : this.props.price : 0,
      displayType: "text",
      thousandSeparator: true,
      decimalScale: 2,
      prefix: constants["a" /* AVAILABLE_CURRENCIES */].find(item => item.name === this.props.currency)["symbol"],
      renderText: value => this.renderText(value)
    });
  }

} // Set propTypes


// Set defaultProps
celebrity_card_contract_price_ContractPriceLayout.defaultProps = {
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
  currencyExchange: payments["b" /* paymentsOperations */].currencyExchange
}; // Export Class

const _ContractPriceLayout = Object(external_react_redux_["connect"])(mapStateToProps, mapDispatchToProps)(celebrity_card_contract_price_ContractPriceLayout);


// EXTERNAL MODULE: ./react-app/src/components/layouts/celebrity-favorite-button/index.js
var celebrity_favorite_button = __webpack_require__("TosQ");

// EXTERNAL MODULE: ./react-app/src/components/layouts/flash-delivery-badge/index.js
var flash_delivery_badge = __webpack_require__("4q9T");

// EXTERNAL MODULE: ./react-app/src/components/containers/celebrity-country-flag/index.js
var celebrity_country_flag = __webpack_require__("BFjd");

// EXTERNAL MODULE: ./react-app/src/components/common/helpers/optimized-image/index.tsx
var optimized_image = __webpack_require__("wOzx");

// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrity-card/index.tsx
var celebrity_card_jsx = external_react_default.a.createElement;












const CelebrityCardLayout = ({
  celebrity,
  currencyExchangeData,
  celebrityCardLayout
}) => {
  const {
    0: contractPrice,
    1: setContractPrice
  } = Object(external_react_["useState"])(celebrity.videoMessagePrice);
  Object(external_react_["useEffect"])(() => {
    let convertedPrice = celebrity.videoMessagePrice;

    if (currencyExchangeData.rate) {
      convertedPrice = celebrity.videoMessagePrice * currencyExchangeData.rate;
    }

    setContractPrice(convertedPrice);
  }, [currencyExchangeData]);
  const profileUrl = Paths["e" /* CELEBRITY_PROFILE */].replace(":celebrity_username", celebrity.username);

  const registerClickOnCelebrity = () => gtm["b" /* tagManagerDataLayer */]("CLICK_ON_CELEBRITY_CARD", celebrity);

  const registerHoverOnCelebrity = () => gtm["b" /* tagManagerDataLayer */]("HOVER_ON_CELEBRITY_CARD", celebrity);

  return celebrity_card_jsx(routing["a" /* NavLink */], {
    to: profileUrl,
    onClick: registerClickOnCelebrity,
    onMouseOver: registerHoverOnCelebrity,
    className: "CelebrityCardLayout"
  }, celebrity_card_jsx("div", {
    className: "celebrity-card"
  }, celebrity_card_jsx("div", {
    className: "thumbnail"
  }, celebrity_card_jsx(optimized_image["a" /* default */], {
    alt: "avatar",
    className: "celebrity__profile-photo",
    src: celebrity.avatar,
    height: (celebrityCardLayout === null || celebrityCardLayout === void 0 ? void 0 : celebrityCardLayout.height) || 156,
    objectFit: "cover",
    width: (celebrityCardLayout === null || celebrityCardLayout === void 0 ? void 0 : celebrityCardLayout.width) || 156,
    placeholderSrc: "/assets/img/avatar-blank.png"
  }), celebrity.availableForFlashDeliveries ? celebrity_card_jsx(flash_delivery_badge["a" /* FlashDeliveryBadgeLayout */], {
    className: "celebrity__flash-delivery"
  }) : null, contractPrice > 0 ? celebrity_card_jsx("div", {
    className: "celebrity__price"
  }, celebrity_card_jsx(_ContractPriceLayout, {
    classes: "celebrity__price__text",
    price: contractPrice,
    currency: currencyExchangeData.to,
    rounding: true
  })) : null), celebrity_card_jsx("div", {
    className: "celebrity-details"
  }, celebrity_card_jsx("div", {
    className: "celebrity-info"
  }, celebrity_card_jsx(celebrity_country_flag["a" /* CountryFlag */], {
    className: "celebrity__country",
    countryCode: celebrity.countryCode,
    width: "20px"
  }), celebrity_card_jsx("span", {
    className: "celebrity__category"
  }, celebrity.title), celebrity_card_jsx(celebrity_favorite_button["a" /* CelebrityFavoriteButton */], {
    celebrityId: celebrity.id
  })), celebrity_card_jsx("h3", {
    className: "celebrity__full-name"
  }, celebrity.fullName))));
};

const celebrity_card_mapStateToProps = state => ({
  currencyExchangeData: state.payments.currencyExchangeReducer.data
});

const celebrity_card_mapDispatchToProps = {
  updateCursorPosition: cursor_position["a" /* cursorOperations */].saveCursorPosition
};

const _CelebrityCardLayout = Object(external_react_redux_["connect"])(celebrity_card_mapStateToProps, celebrity_card_mapDispatchToProps)(CelebrityCardLayout);

/* harmony default export */ var celebrity_card = (CelebrityCardLayout);


/***/ }),

/***/ "n87E":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Container; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Header; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Title; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return List; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Q4dm");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



const initialState = {
  showLeftScrollButton: false,
  showRightScrollButton: false
};

const Container = ({
  children,
  buttonsStyles,
  onScrollTo,
  onListScroll
}) => {
  const {
    0: showLeftScrollButton,
    1: setShowLeftScrollButton
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialState.showLeftScrollButton);
  const {
    0: showRightScrollButton,
    1: setShowRightScrollButton
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialState.showRightScrollButton);
  const childrenListRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);

  const scrollTo = direction => () => {
    const cardListElement = childrenListRef.current;
    const {
      offsetWidth
    } = cardListElement;
    cardListElement.scrollBy({
      left: direction === "right" ? offsetWidth : offsetWidth * -1,
      behavior: "smooth"
    });
    onScrollTo(direction);
  };

  const changeScrollButtonsVisibility = lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(() => {
    const {
      scrollLeft,
      offsetWidth,
      scrollWidth
    } = childrenListRef.current;
    setShowLeftScrollButton(scrollLeft > 0);
    setShowRightScrollButton(scrollLeft + offsetWidth < scrollWidth);
    onListScroll(scrollLeft + offsetWidth >= scrollWidth);
  }, 100);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const cardListElement = childrenListRef.current;
    setShowRightScrollButton(cardListElement.scrollWidth > cardListElement.offsetWidth);
  }, [children]);
  return __jsx("section", {
    className: "carousel-with-buttons-layout container pr-0"
  }, showLeftScrollButton ? __jsx("button", {
    className: "carousel-with-buttons-layout__scroll-to-button d-none d-md-block",
    onClick: scrollTo("left"),
    style: buttonsStyles
  }, __jsx("i", {
    className: "fa fa-chevron-left text-white"
  })) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.map(children, child => {
    const isListComponent = child.type === List;
    if (!isListComponent) return child;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(child, {
      className: "carousel-with-buttons-layout__list",
      ref: childrenListRef,
      onScroll: changeScrollButtonsVisibility
    });
  }), showRightScrollButton ? __jsx("button", {
    className: "carousel-with-buttons-layout__scroll-to-button scroll-to-right-button d-none d-md-block",
    onClick: scrollTo("right"),
    style: buttonsStyles
  }, __jsx("i", {
    className: "fa fa-chevron-right text-white"
  })) : null);
};

Container.defaultProps = {
  hasMoreResults: false,
  moreResultsPath: "#",
  onScrollTo: () => {},
  onListScroll: () => {}
};

const Header = ({
  children
}) => __jsx("header", {
  className: "carousel-with-buttons__header d-flex align-items-center justify-content-between"
}, children);

const Title = ({
  children,
  className
}) => __jsx("h2", {
  className: `carousel-with-buttons-layout__title ${className ? className : ""}`
}, children);

const List = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef((_ref, ref) => {
  let {
    children,
    className
  } = _ref,
      props = _objectWithoutProperties(_ref, ["children", "className"]);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(children, _objectSpread(_objectSpread({}, props), {}, {
    ref,
    className: `${className} ${children.props.className ? children.props.className : ""}`
  }));
});


/***/ }),

/***/ "pVnL":
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "wOzx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Aiso");
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




const OptimizedImage = (_ref) => {
  let {
    className,
    placeholderSrc,
    placeholderSize: backgroundSize = "cover"
  } = _ref,
      props = _objectWithoutProperties(_ref, ["className", "placeholderSrc", "placeholderSize"]);

  return __jsx("div", {
    style: {
      width: props.width,
      height: props.height,
      backgroundImage: placeholderSrc && `url(${placeholderSrc})`,
      backgroundPosition: "center",
      backgroundSize
    },
    className: className
  }, __jsx(next_image__WEBPACK_IMPORTED_MODULE_1___default.a, props));
};

/* harmony default export */ __webpack_exports__["a"] = (OptimizedImage);

/***/ })

};;