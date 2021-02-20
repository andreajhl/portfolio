module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		33: 0,
/******/ 		52: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("../" + ({}[chunkId]||chunkId) + "." + {"58":"25dfee328da3585e8207","60":"1d13d12be5659c9d48b5","63":"2fae11887abd19bd6639"}[chunkId] + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+6uz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fetchUserCelebrityLikes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fetchUserCelebrityLikesCleanUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addOrRemoveLike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return fetchUserCelebrityLikesWithOffset; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HoEe");
/* harmony import */ var _utils_apiService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("XruL");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7Nk7");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("RLh7");




const fetchUserCelebrityLikes = params => dispatch => {
  const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* FETCH_USER_CELEBRITY_LIKES */ "b"];
  const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* FETCH_USER_CELEBRITY_LIKES */ "b"];
  dispatch({
    type: TYPE
  });
  Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH,
    params
  }).then(res => {
    if ("status" in res.data && res.data.status === "ERROR") {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res);
    } else {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res);
      dispatch({
        type: `${TYPE}_COMPLETED`,
        payload: res
      });
    }
  }).catch(err => {
    Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
  });
};
const fetchUserCelebrityLikesCleanUp = () => ({
  type: _types__WEBPACK_IMPORTED_MODULE_0__[/* FETCH_USER_CELEBRITY_LIKES_CLEAN_UP */ "c"]
});
const addOrRemoveLike = async celebrityId => {
  const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* ADD_OR_REMOVE_LIKE */ "a"];
  const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* ADD_OR_REMOVE_LIKE */ "a"]; // dispatch({ type: TYPE });

  try {
    const response = await Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "POST",
      action: TYPE,
      path: FINAL_PATH.replace(":celebrity_id", celebrityId)
    });

    if ("status" in response.data && response.data.status === "ERROR") {// handleApiResponseFailure(dispatch, TYPE, response);
    } else {
      return response.data; // handleApiResponseSuccess(dispatch, TYPE, response);
      // dispatch({ type: `${TYPE}_COMPLETED`, payload: response });
    }
  } catch (error) {
    console.log(error); // handleApiErrors(dispatch, TYPE, error);
  }
};
const fetchUserCelebrityLikesWithOffset = params => dispatch => {
  const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET */ "g"];
  const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET */ "c"];
  dispatch({
    type: TYPE
  });
  Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH,
    params
  }).then(res => {
    if ("status" in res.data && res.data.status === "ERROR") {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res);
    } else {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res);
      dispatch({
        type: `${TYPE}_COMPLETED`,
        payload: res
      });
    }
  }).catch(err => {
    console.log(err);
    Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
  });
};

/***/ }),

/***/ "/T1H":
/***/ (function(module, exports) {

module.exports = require("next/dynamic");

/***/ }),

/***/ "/cLg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _getWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("V08N");


const getCookie = cookieName => {
  var _cookieArray$map$find, _cookieArray$map$find2, _cookieArray$map$find3;

  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(Object(_getWindow__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().document.cookie);
  const cookieArray = decodedCookie.split(";");
  return (_cookieArray$map$find = cookieArray.map(cookie => cookie.trim()).find(cookie => cookie.startsWith(name))) === null || _cookieArray$map$find === void 0 ? void 0 : (_cookieArray$map$find2 = _cookieArray$map$find.split) === null || _cookieArray$map$find2 === void 0 ? void 0 : (_cookieArray$map$find3 = _cookieArray$map$find2.call(_cookieArray$map$find, "=")) === null || _cookieArray$map$find3 === void 0 ? void 0 : _cookieArray$map$find3[1];
};

/* harmony default export */ __webpack_exports__["a"] = (getCookie);

/***/ }),

/***/ "/jkW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isDynamicRoute = isDynamicRoute; // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

/***/ }),

/***/ "/u0D":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AVAILABLE_CURRENCIES; });
const AVAILABLE_CURRENCIES = [{
  "name": "ARS",
  "label": "Pesos Argentinos",
  "symbol": "$",
  "implemented_by_dlocal": false,
  "flag": "https://restcountries.eu/data/arg.svg",
  "document_name": "DNI o CUIT",
  "decimal_separator": ",",
  "thousand_separator": ".",
  "round": "100"
}, {
  "name": "BRL",
  "label": "Real Brasileño",
  "symbol": "$",
  "implemented_by_dlocal": false,
  "flag": "https://restcountries.eu/data/bra.svg",
  "document_name": "CPF o CNPJ",
  "decimal_separator": ",",
  "thousand_separator": ".",
  "round": "5"
}, {
  "name": "CAD",
  "label": "Dólares Canadienses",
  "symbol": "$",
  "implemented_by_dlocal": false,
  "flag": "https://datosmacro.expansion.com/img/flag/CAg.png",
  "document_name": "SIN",
  "decimal_separator": ".",
  "thousand_separator": ",",
  "round": "1"
}, {
  "name": "CLP",
  "label": "Pesos Chilenos",
  "symbol": "$",
  "implemented_by_dlocal": false,
  "flag": "https://restcountries.eu/data/chl.svg",
  "document_name": "CI/RUT",
  "decimal_separator": ",",
  "thousand_separator": ".",
  "round": "1000"
}, {
  "name": "COP",
  "label": "Pesos Colombianos",
  "symbol": "$",
  "implemented_by_dlocal": false,
  "flag": "https://restcountries.eu/data/col.svg",
  "document_name": "CC",
  "decimal_separator": ",",
  "thousand_separator": ".",
  "round": "1000"
}, {
  "name": "EUR",
  "label": "Euros",
  "symbol": "€",
  "implemented_by_dlocal": false,
  "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1200px-Flag_of_Europe.svg.png",
  "document_name": "DNI",
  "decimal_separator": ",",
  "thousand_separator": ".",
  "round": "1"
}, {
  "name": "DOP",
  "label": "Pesos Dominicanos",
  "symbol": "$",
  "implemented_by_dlocal": false,
  "flag": "https://restcountries.eu/data/dom.svg",
  "document_name": "Cédula",
  "decimal_separator": ",",
  "thousand_separator": ".",
  "round": "50"
}, {
  "name": "MXN",
  "label": "Pesos Mexicanos",
  "symbol": "$",
  "implemented_by_dlocal": false,
  "flag": "https://restcountries.eu/data/mex.svg",
  "document_name": "CURP",
  "decimal_separator": ".",
  "thousand_separator": ",",
  "round": "5"
}, {
  "name": "PEN",
  "label": "Sol",
  "symbol": "$",
  "implemented_by_dlocal": false,
  "flag": "https://restcountries.eu/data/per.svg",
  "document_name": "DNI",
  "decimal_separator": ",",
  "thousand_separator": ".",
  "round": "5"
}, {
  "name": "PYG",
  "label": "Pesos Paraguayos",
  "symbol": "$",
  "implemented_by_dlocal": false,
  "flag": "https://restcountries.eu/data/pry.svg",
  "document_name": "CI",
  "decimal_separator": ",",
  "thousand_separator": ".",
  "round": "10000"
}, {
  "name": "USD",
  "label": "Dólares",
  "symbol": "$",
  "implemented_by_dlocal": false,
  "flag": "/assets/img/usa.svg",
  "document_name": "SSN",
  "decimal_separator": ".",
  "thousand_separator": ",",
  "round": "1"
}, {
  "name": "UYU",
  "label": "Pesos Uruaguayos",
  "symbol": "$",
  "implemented_by_dlocal": false,
  "flag": "https://restcountries.eu/data/ury.svg",
  "document_name": "CI",
  "decimal_separator": ",",
  "thousand_separator": ".",
  "round": "50"
}];

/***/ }),

/***/ "0Bsm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router = __webpack_require__("nOHt");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /*#__PURE__*/_react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (false) {}

  return WithRouterWrapper;
}

/***/ }),

/***/ "0G5g":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "23aj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "getServerSideProps", function() { return /* binding */ getServerSideProps; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./react-app/src/components/common/helpers/custom-head/index.tsx
var custom_head = __webpack_require__("qB8v");

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./react-app/src/components/layouts/celebrities-cards-section/index.js
var celebrities_cards_section = __webpack_require__("KC+L");

// EXTERNAL MODULE: ./react-app/src/components/layouts/celebrities-shimmer-cards-section/index.js
var celebrities_shimmer_cards_section = __webpack_require__("xDM4");

// EXTERNAL MODULE: ./react-app/src/components/layouts/loader/index.js
var loader = __webpack_require__("Gj3/");

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrity-sections/actions.js
var actions = __webpack_require__("xQtr");

// EXTERNAL MODULE: external "react-infinite-scroll-component"
var external_react_infinite_scroll_component_ = __webpack_require__("3SD1");
var external_react_infinite_scroll_component_default = /*#__PURE__*/__webpack_require__.n(external_react_infinite_scroll_component_);

// EXTERNAL MODULE: ./react-app/src/components/layouts/end-message/index.js
var end_message = __webpack_require__("q6S/");

// EXTERNAL MODULE: ./react-app/src/state/utils/gtm.js
var gtm = __webpack_require__("HkHs");

// EXTERNAL MODULE: ./react-app/src/utils/getCookie.ts
var getCookie = __webpack_require__("/cLg");

// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrities-sections/index.js
var __jsx = external_react_default.a.createElement;











const mapStateToProps = ({
  celebritySections
}) => {
  const {
    loading,
    data
  } = celebritySections.fetchCelebritySectionsReducer;
  return {
    loading,
    celebritiesSections: data.results,
    totalResults: data.totalResults
  };
};

const mapDispatchToProps = {
  fetchCelebritySections: actions["a" /* fetchCelebritySections */]
};
const offsetInitialValue = 0;
const resultsLimit = 4;
const heroSectionHeight = 184;

const CelebritiesSectionsLayout = ({
  loading,
  celebritiesSections,
  totalResults,
  fetchCelebritySections,
  landingId,
  isMobile
}) => {
  const {
    0: offset,
    1: setOffset
  } = Object(external_react_["useState"])(offsetInitialValue);
  Object(external_react_["useEffect"])(() => {
    if (offset === offsetInitialValue) return;
    fetchCelebritySections({
      offset,
      limit: resultsLimit,
      landingId,
      alpha2Code: Object(getCookie["a" /* default */])("userLocation")
    });
  }, [offset]);

  const fetchMoreData = () => {
    setOffset(offset => {
      const nextOffset = offset + resultsLimit;
      const newOffset = nextOffset < totalResults ? nextOffset : totalResults;
      gtm["b" /* tagManagerDataLayer */]("FETCH_MORE_CELEBRITY_SECTIONS", {
        widget: "CelebritiesSectionsLayout",
        path: window.location.pathname,
        newOffset,
        totalResults,
        hasReachedEnd: newOffset + resultsLimit >= totalResults
      });
      return newOffset;
    });
  };

  const registerGoBackButtonClick = () => gtm["b" /* tagManagerDataLayer */]("CLICK_CELEBRITY_SECTIONS_GO_UP_BUTTON", {
    widget: "CelebritiesSectionsLayout",
    path: window.location.pathname,
    celebritiesSectionsLength: celebritiesSections.length
  });

  return __jsx("div", {
    className: "CelebritiesSectionsLayout"
  }, loading && offset === 0 ? __jsx(celebrities_shimmer_cards_section["a" /* CelebritiesShimmerCardsSectionLayout */], null) : celebritiesSections.length > 0 ? __jsx(external_react_infinite_scroll_component_default.a, {
    dataLength: celebritiesSections.length,
    next: fetchMoreData,
    hasMore: celebritiesSections.length < totalResults,
    loader: __jsx(loader["a" /* LoaderLayout */], null),
    endMessage: __jsx(end_message["a" /* EndMessageLayout */], {
      offsetTop: heroSectionHeight,
      onClick: registerGoBackButtonClick
    })
  }, celebritiesSections.map((celebritiesSection, index) => __jsx(celebrities_cards_section["a" /* CelebritiesCardsSectionLayout */], {
    key: celebritiesSection.id,
    celebritiesSection: celebritiesSection,
    hasMoreResults: celebritiesSection.celebritySectionType === "CELEBRITY_CARD" && celebritiesSection.celebrities.length >= 10,
    isMobile: isMobile
  }))) : null);
};

CelebritiesSectionsLayout.defaultProps = {}; // Export Class

const _CelebritiesSectionsLayout = Object(external_react_redux_["connect"])(mapStateToProps, mapDispatchToProps)(CelebritiesSectionsLayout);


// EXTERNAL MODULE: ./react-app/src/components/layouts/page-container/index.js + 9 modules
var page_container = __webpack_require__("nivu");

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrities/index.js + 1 modules
var celebrities = __webpack_require__("wsp3");

// CONCATENATED MODULE: ./react-app/src/components/layouts/hero-section/index.js
var hero_section_jsx = external_react_default.a.createElement;


const HeroSectionLayout = () => {
  return hero_section_jsx("section", {
    className: "hero"
  }, hero_section_jsx("div", {
    className: "container hero__container"
  }, hero_section_jsx("h1", {
    className: "hero__title mb-3"
  }, "Videos Personalizados", hero_section_jsx("br", null), "de tus Famosos Favoritos"), hero_section_jsx("ol", {
    className: "hero__steps p-0"
  }, hero_section_jsx("li", {
    className: "hero__steps-item"
  }, hero_section_jsx("img", {
    className: "hero__steps-image",
    src: "/assets/img/paper-plain-pink.svg",
    alt: "Enviando"
  }), hero_section_jsx("p", {
    className: "hero__steps-text"
  }, "Elige a tu Famoso y solicita el mensaje.")), hero_section_jsx("li", {
    className: "hero__steps-item"
  }, hero_section_jsx("img", {
    className: "hero__steps-image",
    src: "/assets/img/credit-card-small-pink.svg",
    alt: "Pagando"
  }), hero_section_jsx("p", {
    className: "hero__steps-text"
  }, "Completa el ", hero_section_jsx("br", null), " proceso de pago.")), hero_section_jsx("li", {
    className: "hero__steps-item"
  }, hero_section_jsx("img", {
    className: "hero__steps-image",
    src: "/assets/img/play-pink.svg",
    alt: "Recibiendo"
  }), hero_section_jsx("p", {
    className: "hero__steps-text"
  }, "\xA1Recibe tu video personalizado!")))));
};


// EXTERNAL MODULE: ./react-app/src/components/layouts/filters-section/index.js + 4 modules
var filters_section = __webpack_require__("KKHI");

// EXTERNAL MODULE: ./react-app/src/state/utils/session.js + 1 modules
var session = __webpack_require__("hVVe");

// EXTERNAL MODULE: ./react-app/src/state/utils/apiService.js
var apiService = __webpack_require__("XruL");

// EXTERNAL MODULE: ./react-app/src/components/common/routing/index.js + 3 modules
var routing = __webpack_require__("68Dr");

// EXTERNAL MODULE: ./react-app/src/components/common/helpers/maybe/index.tsx
var maybe = __webpack_require__("LeEe");

// EXTERNAL MODULE: external "@auth0/auth0-react"
var auth0_react_ = __webpack_require__("UdXN");

// EXTERNAL MODULE: external "next/dynamic"
var dynamic_ = __webpack_require__("/T1H");
var dynamic_default = /*#__PURE__*/__webpack_require__.n(dynamic_);

// CONCATENATED MODULE: ./react-app/src/components/pages/celebrities/index.js
var celebrities_jsx = external_react_default.a.createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















const UserLikesSectionLayout = dynamic_default()(() => __webpack_require__.e(/* import() */ 63).then(__webpack_require__.bind(null, "HT8b")).then(mod => mod.UserLikesSectionLayout), {
  ssr: false,
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("HT8b")],
    modules: ["../../layouts/user-likes-section"]
  }
});

class celebrities_CelebritiesPage extends external_react_["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleDynamicHeader", () => {
      const scrollTopPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const positionToDisplayDynamicHeaderOnScrollDown = 354;
      const positionToDisplayDynamicHeaderOnScrollUp = 249;
      const isScrollingDown = scrollTopPosition >= this.state.previousScrollTopPosition;
      const showHeaderFiltersSection = isScrollingDown ? scrollTopPosition >= positionToDisplayDynamicHeaderOnScrollDown : scrollTopPosition >= positionToDisplayDynamicHeaderOnScrollUp;
      this.setState({
        showHeaderFiltersSection,
        previousScrollTopPosition: scrollTopPosition
      });
    });

    this.state = {
      session: new session["a" /* Session */]().getSession(),
      showInputSearchSm: false,
      showHeaderFiltersSection: false,
      previousScrollTopPosition: 0
    };
  }

  componentDidMount() {
    gtm["b" /* tagManagerDataLayer */]("CELEBRITIES_PAGE_VIEW", this.props.queryParams);
    window.addEventListener("scroll", this.toggleDynamicHeader);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.toggleDynamicHeader);
  }

  render() {
    var _queryStringToJSON;

    const {
      isAuthenticated
    } = this.props.auth0;
    return celebrities_jsx(external_react_default.a.Fragment, null, celebrities_jsx("div", {
      className: "CelebritiesPage "
    }, celebrities_jsx(page_container["PageContainer"], {
      showFooter: false,
      applyFetchUserCelebrityLikes: isAuthenticated,
      existPreviewResults: this.props.celebrities.length <= 1,
      applyFetchCelebrities: true,
      showFiltersSection: this.state.showHeaderFiltersSection,
      showVideoCallsResearch: true,
      shouldFetchCountryCode: true
    }, celebrities_jsx(HeroSectionLayout, null), celebrities_jsx(filters_section["a" /* FiltersSectionLayout */], null), celebrities_jsx(maybe["a" /* default */], {
      it: isAuthenticated
    }, celebrities_jsx(UserLikesSectionLayout, null)), celebrities_jsx(_CelebritiesSectionsLayout, {
      landingId: (_queryStringToJSON = Object(apiService["c" /* queryStringToJSON */])(this.props.location.search)) === null || _queryStringToJSON === void 0 ? void 0 : _queryStringToJSON.landingId,
      isMobile: this.props.isMobile
    }))));
  }

}

celebrities_CelebritiesPage.defaultProps = {
  celebrities: [],
  paginationData: {}
};

const celebrities_mapStateToProps = ({
  celebrities,
  restCountries,
  countries,
  filters,
  cursor
}) => ({
  isLoading: celebrities.fetchCelebritiesReducer.loading,
  isCompleted: celebrities.fetchCelebritiesReducer.completed,
  celebrities: celebrities.fetchCelebritiesReducer.data.results,
  paginationData: celebrities.fetchCelebritiesReducer.data.informationPage,
  queryParams: celebrities.queryParamsReducer,
  countries: countries.countriesReducer.results,
  restCountries: restCountries.fetchCountriesReducer.data,
  selectedCategory: filters.filtersReducer.selectedCategory,
  selectedCountry: filters.filtersReducer.selectedCountry,
  cursor: cursor.cursorReducer.Position
});

const celebrities_mapDispatchToProps = {
  fetchCelebrities: celebrities["a" /* celebrityOperations */].list,
  updateQueryParams: celebrities["a" /* celebrityOperations */].updateQueryParams
};

const _CelebritiesPage = Object(external_react_redux_["connect"])(celebrities_mapStateToProps, celebrities_mapDispatchToProps)(Object(routing["c" /* withRouter */])(Object(auth0_react_["withAuth0"])(celebrities_CelebritiesPage)));


// EXTERNAL MODULE: ./react-app/src/state/store.js + 14 modules
var state_store = __webpack_require__("C459");

// EXTERNAL MODULE: external "ua-parser-js"
var external_ua_parser_js_ = __webpack_require__("8rrE");
var external_ua_parser_js_default = /*#__PURE__*/__webpack_require__.n(external_ua_parser_js_);

// CONCATENATED MODULE: ./pages/index.tsx

var pages_jsx = external_react_default.a.createElement;
// import { useEffect } from "react";




 // import isBrowser from "react-app/src/utils/isBrowser";
// import auth0 from "../lib/auth0";

/* 
export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  async ({ store }) => {
    await fetchCelebritySections({ limit: 4, offset: 0 })(store.dispatch);
    const quarterHourInSeconds = 900;
    return { revalidate: quarterHourInSeconds };
  }
);
*/

const getServerSideProps = state_store["a" /* wrapper */].getServerSideProps(async ({
  req,
  store
}) => {
  await Object(actions["a" /* fetchCelebritySections */])({
    limit: 4,
    offset: 0
  })(store.dispatch);
  return {
    props: {
      isMobile: new external_ua_parser_js_default.a(req.headers["user-agent"]).getDevice().type === "mobile"
    }
  };
});

const Home = ({
  isMobile
}) => {
  // useEffect(() => {
  //   if (isBrowser && session) {
  //     if (session.idToken) {
  //       localStorage.setItem("_a0_", session.idToken);
  //     }
  //   }
  // }, []);
  return pages_jsx(external_react_default.a.Fragment, null, pages_jsx(custom_head["a" /* default */], null), pages_jsx(_CelebritiesPage, {
    isMobile: isMobile
  }));
}; // This gets called on every request
// export async function getServerSideProps({ req, res }) {
//   if (typeof window === "undefined") {
//     const session = await auth0.getSession(req);
//     if (session) {
//       if (session) {
//         return {
//           props: { session: session }
//         };
//       }
//     }
//   }
//   return { props: {} };
// }


/* harmony default export */ var pages = __webpack_exports__["default"] = (Home);

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("23aj");


/***/ }),

/***/ "284h":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("cDf5");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "3SD1":
/***/ (function(module, exports) {

module.exports = require("react-infinite-scroll-component");

/***/ }),

/***/ "3WeD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.searchParamsToUrlQuery = searchParamsToUrlQuery;
exports.urlQueryToSearchParams = urlQueryToSearchParams;
exports.assign = assign;

function searchParamsToUrlQuery(searchParams) {
  const query = {};
  searchParams.forEach((value, key) => {
    if (typeof query[key] === 'undefined') {
      query[key] = value;
    } else if (Array.isArray(query[key])) {
      ;
      query[key].push(value);
    } else {
      query[key] = [query[key], value];
    }
  });
  return query;
}

function stringifyUrlQueryParam(param) {
  if (typeof param === 'string' || typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
    return String(param);
  } else {
    return '';
  }
}

function urlQueryToSearchParams(urlQuery) {
  const result = new URLSearchParams();
  Object.entries(urlQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => result.append(key, stringifyUrlQueryParam(item)));
    } else {
      result.set(key, stringifyUrlQueryParam(value));
    }
  });
  return result;
}

function assign(target, ...searchParamsList) {
  searchParamsList.forEach(searchParams => {
    Array.from(searchParams.keys()).forEach(key => target.delete(key));
    searchParams.forEach((value, key) => target.append(key, value));
  });
  return target;
}

/***/ }),

/***/ "3wub":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.normalizeLocalePath = normalizeLocalePath;

function normalizeLocalePath(pathname, locales) {
  let detectedLocale; // first item will be empty string from splitting at first char

  const pathnameParts = pathname.split('/');
  (locales || []).some(locale => {
    if (pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
      detectedLocale = locale;
      pathnameParts.splice(1, 1);
      pathname = pathnameParts.join('/') || '/';
      return true;
    }

    return false;
  });
  return {
    pathname,
    detectedLocale
  };
}

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

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

/***/ "55Bo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getTotalColumns; });
const getTotalColumns = () => {
  try {
    // const div = document.querySelector(".scrolling-wrapper");
    const div = document.querySelector(".celebrities-results-layout__cards-list");
    const style = getComputedStyle(div);
    const split = style.gridTemplateColumns.split(" ");
    return split.length;
  } catch (e) {
    return 6;
  }
};

/***/ }),

/***/ "55jf":
/***/ (function(module, exports) {

module.exports = require("redux-batched-actions");

/***/ }),

/***/ "5NNn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FETCH_CELEBRITIES_SECTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FETCH_CELEBRITIES_SECTIONS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FETCH_CELEBRITIES_SECTIONS_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FETCH_CELEBRITIES_SECTIONS_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PLAY_VIDEO; });
const FETCH_CELEBRITIES_SECTIONS = "celebrity-sections/FETCH_CELEBRITIES_SECTIONS";
const FETCH_CELEBRITIES_SECTIONS_SUCCESS = "celebrity-sections/FETCH_CELEBRITIES_SECTIONS_SUCCESS";
const FETCH_CELEBRITIES_SECTIONS_FAILURE = "celebrity-sections/FETCH_CELEBRITIES_SECTIONS_FAILURE";
const FETCH_CELEBRITIES_SECTIONS_COMPLETED = "celebrity-sections/FETCH_CELEBRITIES_SECTIONS_COMPLETED";
const PLAY_VIDEO = "celebrity-sections/PLAY_VIDEO";

/***/ }),

/***/ "5dN8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FETCH_CELEBRITIES_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return FETCH_CELEBRITIES_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FETCH_CELEBRITIES_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FETCH_CELEBRITIES_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return FETCH_REVIEWS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return FETCH_REVIEWS_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return FETCH_REVIEWS_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return FETCH_REVIEWS_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return FETCH_PUBLIC_CONTRACTS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return FETCH_PUBLIC_CONTRACTS_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return FETCH_PUBLIC_CONTRACTS_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return FETCH_PUBLIC_CONTRACTS_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return GET_CELEBRITY_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return GET_CELEBRITY_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return GET_CELEBRITY_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return GET_CELEBRITY_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "O", function() { return UPDATE_QUERY_PARAMS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return FETCH_TRENDING_CONTRACTS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return FETCH_TRENDING_CONTRACTS_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return FETCH_TRENDING_CONTRACTS_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return FETCH_TRENDING_CONTRACTS_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return PLAY_VIDEO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return SET_PREVIOUS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return FETCH_SIMILAR_CELEBRITIES_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return FETCH_SIMILAR_CELEBRITIES_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return FETCH_SIMILAR_CELEBRITIES_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return FETCH_SIMILAR_CELEBRITIES_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CLEAN_PUBLIC_CONTRACTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return SET_CELEBRITY_PROFILE_VERSION; });
// CELEBRITIES
const FETCH_CELEBRITIES_REQUEST = "contracts/FETCH_CELEBRITIES_REQUEST";
const FETCH_CELEBRITIES_REQUEST_SUCCESS = "contracts/FETCH_CELEBRITIES_REQUEST_SUCCESS";
const FETCH_CELEBRITIES_REQUEST_FAILURE = "contracts/FETCH_CELEBRITIES_REQUEST_FAILURE";
const FETCH_CELEBRITIES_REQUEST_COMPLETED = "contracts/FETCH_CELEBRITIES_REQUEST_COMPLETED";
const FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST = "contracts/FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST";
const FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST_SUCCESS = "contracts/FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST_SUCCESS";
const FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST_FAILURE = "contracts/FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST_FAILURE";
const FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST_COMPLETED = "contracts/FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST_COMPLETED";
const FETCH_REVIEWS_REQUEST = "contracts/FETCH_REVIEWS_REQUEST";
const FETCH_REVIEWS_REQUEST_SUCCESS = "contracts/FETCH_REVIEWS_REQUEST_SUCCESS";
const FETCH_REVIEWS_REQUEST_FAILURE = "contracts/FETCH_REVIEWS_REQUEST_FAILURE";
const FETCH_REVIEWS_REQUEST_COMPLETED = "contracts/FETCH_REVIEWS_REQUEST_COMPLETED";
const FETCH_PUBLIC_CONTRACTS_REQUEST = "contracts/FETCH_PUBLIC_CONTRACTS_REQUEST";
const FETCH_PUBLIC_CONTRACTS_REQUEST_SUCCESS = "contracts/FETCH_PUBLIC_CONTRACTS_REQUEST_SUCCESS";
const FETCH_PUBLIC_CONTRACTS_REQUEST_FAILURE = "contracts/FETCH_PUBLIC_CONTRACTS_REQUEST_FAILURE";
const FETCH_PUBLIC_CONTRACTS_REQUEST_COMPLETED = "contracts/FETCH_PUBLIC_CONTRACTS_REQUEST_COMPLETED";
const GET_CELEBRITY_REQUEST = "contracts/GET_CELEBRITY_REQUEST";
const GET_CELEBRITY_REQUEST_SUCCESS = "contracts/GET_CELEBRITY_REQUEST_SUCCESS";
const GET_CELEBRITY_REQUEST_FAILURE = "contracts/GET_CELEBRITY_REQUEST_FAILURE";
const GET_CELEBRITY_REQUEST_COMPLETED = "contracts/GET_CELEBRITY_REQUEST_COMPLETED";
const UPDATE_QUERY_PARAMS = "contracts/UPDATE_QUERY_PARAMS";
const FETCH_TRENDING_CONTRACTS_REQUEST = "contracts/FETCH_TRENDING_CONTRACTS_REQUEST";
const FETCH_TRENDING_CONTRACTS_REQUEST_SUCCESS = "contracts/FETCH_TRENDING_CONTRACTS_REQUEST_SUCCESS";
const FETCH_TRENDING_CONTRACTS_REQUEST_FAILURE = "contracts/FETCH_TRENDING_CONTRACTS_REQUEST_FAILURE";
const FETCH_TRENDING_CONTRACTS_REQUEST_COMPLETED = "contracts/FETCH_TRENDING_CONTRACTS_REQUEST_COMPLETED";
const PLAY_VIDEO = "contracts/PLAY_VIDEO";
const SET_PREVIOUS_PATH = "contracts/SET_PREVIOUS_PATH";
const FETCH_SIMILAR_CELEBRITIES_REQUEST = "contracts/FETCH_SIMILAR_CELEBRITIES_REQUEST";
const FETCH_SIMILAR_CELEBRITIES_REQUEST_SUCCESS = "contracts/FETCH_SIMILAR_CELEBRITIES_REQUEST_SUCCESS";
const FETCH_SIMILAR_CELEBRITIES_REQUEST_FAILURE = "contracts/FETCH_SIMILAR_CELEBRITIES_REQUEST_FAILURE";
const FETCH_SIMILAR_CELEBRITIES_REQUEST_COMPLETED = "contracts/FETCH_SIMILAR_CELEBRITIES_REQUEST_COMPLETED";
const CLEAN_PUBLIC_CONTRACTS = "contracts/CLEAN_PUBLIC_CONTRACTS";
const FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST = "contracts/FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST";
const FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST_SUCCESS = "contracts/FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST_SUCCESS";
const FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST_FAILURE = "contracts/FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST_FAILURE";
const FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST_COMPLETED = "contracts/FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST_COMPLETED";
const FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST = "contracts/FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST";
const FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST_SUCCESS = "contracts/FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST_SUCCESS";
const FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST_FAILURE = "contracts/FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST_FAILURE";
const FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST_COMPLETED = "contracts/FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST_COMPLETED";
const SET_CELEBRITY_PROFILE_VERSION = "SET_CELEBRITY_PROFILE_VERSION";

/***/ }),

/***/ "68Dr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ NavLink; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* reexport */ withRouter; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ Redirect; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// CONCATENATED MODULE: ./react-app/src/components/common/routing/nav-link/index.tsx
var __jsx = external_react_default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





// Normalize and split paths into their segments
const getSegment = path => new URL(path, "https://localhost:3000").pathname.split("/").filter(Boolean);

const getIsActive = (asPath, as, exact) => {
  const currentPath = getSegment(asPath);
  const targetPath = getSegment(as); // The route is active if all of the following are true:
  //   1. There are at least as many segments in the current route as in the destination route
  //   2. The current route matches the destination route
  //   3. If we're in “exact" mode, there are no extra path segments at the end

  return currentPath.length >= targetPath.length && targetPath.every((segment, index) => currentPath[index] === segment) && (!exact || targetPath.length === currentPath.length);
};

const NavLink = (_ref) => {
  let {
    to: href,
    as = href,
    exact = false,
    activeClassName = "active",
    activeStyle = {},
    className: classes = "",
    children = null
  } = _ref,
      props = _objectWithoutProperties(_ref, ["to", "as", "exact", "activeClassName", "activeStyle", "className", "children"]);

  const {
    asPath
  } = Object(router_["useRouter"])(); // const isActive = pathToRegexp(as || href, [], {
  //   sensitive: true,
  //   end: Boolean(exact)
  // }).test(asPath);

  const isActive = getIsActive(asPath, as, exact);
  const className = (classes + " " + (isActive ? activeClassName : "")).trim();
  const style = isActive ? activeStyle : null;
  return __jsx(link_default.a, _extends({
    href: href,
    as: as
  }, props), __jsx("a", _extends({
    className: className
  }, props, {
    style: style
  }), children));
};


// CONCATENATED MODULE: ./react-app/src/components/common/routing/with-router/index.tsx

var with_router_jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const withRouter = Component => props => {
  const router = Object(router_["useRouter"])();
  const location = Object(external_react_["useMemo"])(() => ({
    pathname: router.asPath,
    search: router.asPath.replace(router.pathname, "")
  }), [router.asPath, router.pathname]);
  return with_router_jsx(Component, _objectSpread(_objectSpread({}, props), {}, {
    history: router,
    location,
    router
  }));
};


// CONCATENATED MODULE: ./react-app/src/components/common/routing/redirect/index.tsx



function Redirect({
  to,
  push = false
}) {
  const router = Object(router_["useRouter"])();
  const method = push ? router.push : router.replace;
  Object(external_react_["useEffect"])(() => {
    if (!to) throw new TypeError("The argument 'to' is required");
    method(to);
  }, [method, to]);
  return null;
}


// CONCATENATED MODULE: ./react-app/src/components/common/routing/index.js




/***/ }),

/***/ "6D7l":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.formatUrl = formatUrl;

var querystring = _interopRequireWildcard(__webpack_require__("3WeD"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
} // Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


const slashedProtocols = /https?|ftp|gopher|file/;

function formatUrl(urlObj) {
  let {
    auth,
    hostname
  } = urlObj;
  let protocol = urlObj.protocol || '';
  let pathname = urlObj.pathname || '';
  let hash = urlObj.hash || '';
  let query = urlObj.query || '';
  let host = false;
  auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';

  if (urlObj.host) {
    host = auth + urlObj.host;
  } else if (hostname) {
    host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);

    if (urlObj.port) {
      host += ':' + urlObj.port;
    }
  }

  if (query && typeof query === 'object') {
    query = String(querystring.urlQueryToSearchParams(query));
  }

  let search = urlObj.search || query && `?${query}` || '';
  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash[0] !== '#') hash = '#' + hash;
  if (search && search[0] !== '?') search = '?' + search;
  pathname = pathname.replace(/[?#]/g, encodeURIComponent);
  search = search.replace('#', '%23');
  return `${protocol}${host}${pathname}${search}${hash}`;
}

/***/ }),

/***/ "7Nk7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "c", function() { return /* reexport */ handleApiResponseSuccess; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ handleApiResponseFailure; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ handleApiErrors; });

// UNUSED EXPORTS: createReducer

// CONCATENATED MODULE: ./react-app/src/state/utils/createReducer.js
const createReducer = initialState => reducerMap => (state = initialState, action) => {
  const reducer = reducerMap[action.type];
  return reducer ? reducer(state, action) : state;
};

/* harmony default export */ var utils_createReducer = (createReducer);
// EXTERNAL MODULE: ./react-app/src/state/utils/session.js + 1 modules
var utils_session = __webpack_require__("hVVe");

// CONCATENATED MODULE: ./react-app/src/state/utils/apiResponse.js
// Handle Fetch Errors

function handleApiErrors(dispatch, type, error) {
  // CHECK SESSION
  const session = new utils_session["a" /* Session */]();
  session.tokenExpired();
  let payload = {}; // Error 😨

  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    if (error.response.data) {
      payload = {
        data: {
          api_error: error,
          error: error.response.data.error
        }
      };
    } else {
      payload = {
        data: {
          api_error: error,
          error: "The request was made but no response was received"
        }
      };
    }
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    payload = {
      data: {
        api_error: error,
        error: "The request was made but no response was received"
      }
    };
  } else {
    // Something happened in setting up the request and triggered an Error
    payload = {
      data: {
        api_error: error,
        error: "Something happened in setting up the request and triggered an Error"
      }
    };
  }

  return dispatch({
    type: `${type}_FAILURE`,
    payload: payload
  });
} // Handle Fetch Response

function handleApiResponseSuccess(dispatch, type, data) {
  const session = new utils_session["a" /* Session */]();
  session.tokenExpired();
  return dispatch({
    type: `${type}_SUCCESS`,
    payload: data
  });
} // Handle Fetch Response

function handleApiResponseFailure(dispatch, type, data) {
  const session = new utils_session["a" /* Session */]();
  session.tokenExpired();
  return dispatch({
    type: `${type}_FAILURE`,
    payload: data
  });
}
// CONCATENATED MODULE: ./react-app/src/state/utils/index.js



/***/ }),

/***/ "7UUK":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/to-base-64.js");

/***/ }),

/***/ "7ssJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoShimmerCardLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const VideoShimmerCardLayout = () => {
  return __jsx("div", {
    className: "VideoShimmerCardLayout"
  }, __jsx("div", {
    className: "video-shimmer-card"
  }, __jsx("header", {
    className: "text-right"
  }, __jsx("span", {
    className: "video-shimmer-card__category"
  }, __jsx("span", {
    className: "video-shimmer-card__category-icon"
  }))), __jsx("footer", {
    className: "d-flex align-items-center px-2"
  }, __jsx("div", {
    className: "video-shimmer-card__celebrity-photo"
  }), __jsx("div", {
    className: "video-shimmer-card__celebrity-full-name"
  }, __jsx("div", {
    className: "line mb-1 line-one"
  }), __jsx("div", {
    className: "line line-two"
  })), __jsx("img", {
    src: "/assets/img/outlined-heart.svg"
  }))));
};



/***/ }),

/***/ "808T":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MODEL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return LIST; });
/* unused harmony export POST */
/* unused harmony export UPDATE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return GET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return REVIEWS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PUBLIC_CONTRACTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return SIMILAR_CELEBRITIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FLASH_DELIVERY_CELEBRITIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CELEBRITY_SUBSCRIPTION_PLANS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return SUGGESTED_PUBLIC_LIST; });
const MODEL = `celebrities`;
const LIST = `custom-endpoints/${MODEL}/public-list`;
const POST = `crud/post/${MODEL}`;
const UPDATE = `crud/put/${MODEL}/`;
const GET = `custom-endpoints/${MODEL}/public-get/`;
const REVIEWS = `custom-endpoints/${MODEL}/public-contract-reviews/`;
const PUBLIC_CONTRACTS = `custom-endpoints/${MODEL}/public-contracts/`;
const SIMILAR_CELEBRITIES = `custom-endpoints/${MODEL}/similar-celebrities/`;
const FLASH_DELIVERY_CELEBRITIES = "flash_delivery_celebrities";
const CELEBRITY_SUBSCRIPTION_PLANS = "/custom-endpoints/celebrity-subscription-plans/:celebrity_username/list";
const SUGGESTED_PUBLIC_LIST = `custom-endpoints/${MODEL}/suggested-public-list`;

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

/***/ "8UX+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return postProcessSubscription; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fetchUserSubscriptionsList; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("STYJ");
/* harmony import */ var _utils_apiService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("XruL");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7Nk7");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("qkmH");
/* harmony import */ var _routing_History__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("u3u/");
/* harmony import */ var _routing_Paths__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("c5JF");






const postProcessSubscription = subscription_data => {
  const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* PROCESS_SUBSCRIPTION_REQUEST */ "e"];
  const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* PROCESS_SUBSCRIPTION_PATH */ "a"];
  return new Promise((resolutionFunc, rejectionFunc) => {
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: 'POST',
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      body: subscription_data
    }).then(res => {
      if (res.data.status === 'OK') {
        resolutionFunc(res.data.data);
      } else {
        rejectionFunc(res.data.error);
      }
    }).catch(err => {
      rejectionFunc(err);
    });
  });
};
const fetchUserSubscriptionsList = user_data => dispatch => {
  const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* FETCH_USER_SUBSCRIPTIONS_REQUEST */ "c"];
  const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* USER_SUBSCRIPTIONS_PATH */ "b"];
  dispatch({
    type: TYPE,
    payload: {}
  });
  Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH,
    async: true,
    body: null
  }).then(res => {
    if (res.data.status === "OK") {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res);
      dispatch({
        type: `${TYPE}_COMPLETED`,
        payload: res
      });
    } else {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res);
    }
  }).catch(err => {
    Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, {
      data: {
        api_error: err,
        error: "Server 500"
      }
    });
  });
};

/***/ }),

/***/ "8VMp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CONTRACT_MODEL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CREATE_CONTRACT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ACCOUNT_CONTRACTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return GET_CONTRACT_BY_REFERENCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return GET_CONTRACT_WITH_PAYMENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return GET_CONTRACT_LIKES_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return GET_CONTRACT_COMMENTS_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return GET_CONTRACT_COMMENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ADD_OR_REMOVE_CONTRACT_LIKE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return SAVE_CONTRACT_REVIEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ADD_CONTRACT_COMMENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return TRENDING_CONTRACTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return UPDATE_CONTRACT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return UPDATE_CONTRACT_IS_PUBLIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return SIMILAR_CONTRACTS; });
const CONTRACT_MODEL = `contracts`;
const CREATE_CONTRACT = `custom-endpoints/${CONTRACT_MODEL}/create-contract`;
const ACCOUNT_CONTRACTS = `custom-endpoints/${CONTRACT_MODEL}/user-contracts`;
const GET_CONTRACT_BY_REFERENCE = `custom-endpoints/${CONTRACT_MODEL}/get-contract-by-reference/`;
const GET_CONTRACT_WITH_PAYMENTS = `custom-endpoints/${CONTRACT_MODEL}/contract-with-payments/`;
const GET_CONTRACT_LIKES_DATA = `custom-endpoints/${CONTRACT_MODEL}/get-contract-likes-data/`;
const GET_CONTRACT_COMMENTS_DATA = `custom-endpoints/${CONTRACT_MODEL}/get-contract-comments-data/`;
const GET_CONTRACT_COMMENTS = `custom-endpoints/${CONTRACT_MODEL}/get-contract-comments/`;
const ADD_OR_REMOVE_CONTRACT_LIKE = `custom-endpoints/${CONTRACT_MODEL}/add-or-remove-contract-like/`;
const SAVE_CONTRACT_REVIEW = `custom-endpoints/${CONTRACT_MODEL}/add-or-update-contract-review/`;
const ADD_CONTRACT_COMMENTS = `custom-endpoints/${CONTRACT_MODEL}/add-contract-comment/`;
const TRENDING_CONTRACTS = `custom-endpoints/${CONTRACT_MODEL}/trending-contracts`;
const UPDATE_CONTRACT = `custom-endpoints/${CONTRACT_MODEL}/update-contract`;
const UPDATE_CONTRACT_IS_PUBLIC = `custom-endpoints/${CONTRACT_MODEL}/update-contract-is-public`;
const SIMILAR_CONTRACTS = `custom-endpoints/${CONTRACT_MODEL}/similar-contracts/`;

/***/ }),

/***/ "8rrE":
/***/ (function(module, exports) {

module.exports = require("ua-parser-js");

/***/ }),

/***/ "ANQk":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/server/image-config.js");

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

/***/ "C459":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ wrapper; });

// NAMESPACE OBJECT: ./react-app/src/state/ducks/index.js
var ducks_namespaceObject = {};
__webpack_require__.r(ducks_namespaceObject);
__webpack_require__.d(ducks_namespaceObject, "authentication", function() { return authentication["b" /* default */]; });
__webpack_require__.d(ducks_namespaceObject, "celebrities", function() { return celebrities["b" /* default */]; });
__webpack_require__.d(ducks_namespaceObject, "celebrityLikes", function() { return celebrity_likes["b" /* default */]; });
__webpack_require__.d(ducks_namespaceObject, "contracts", function() { return contracts["b" /* default */]; });
__webpack_require__.d(ducks_namespaceObject, "restCountries", function() { return rest_countries["a" /* default */]; });
__webpack_require__.d(ducks_namespaceObject, "restCelebrities", function() { return rest_celebrities["a" /* default */]; });
__webpack_require__.d(ducks_namespaceObject, "session", function() { return session["a" /* default */]; });
__webpack_require__.d(ducks_namespaceObject, "celebrityRequests", function() { return celebrity_requests["b" /* default */]; });
__webpack_require__.d(ducks_namespaceObject, "payments", function() { return payments["a" /* default */]; });
__webpack_require__.d(ducks_namespaceObject, "filters", function() { return filters; });
__webpack_require__.d(ducks_namespaceObject, "celebrityCategories", function() { return celebrity_categories["b" /* default */]; });
__webpack_require__.d(ducks_namespaceObject, "celebritySections", function() { return celebrity_sections; });
__webpack_require__.d(ducks_namespaceObject, "countries", function() { return ducks_countries["b" /* default */]; });
__webpack_require__.d(ducks_namespaceObject, "cursor", function() { return cursor_position["b" /* default */]; });
__webpack_require__.d(ducks_namespaceObject, "blog", function() { return blog["b" /* default */]; });
__webpack_require__.d(ducks_namespaceObject, "subscriptions", function() { return subscriptions["a" /* default */]; });
__webpack_require__.d(ducks_namespaceObject, "discountCoupons", function() { return discount_coupons; });

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// EXTERNAL MODULE: external "redux-thunk"
var external_redux_thunk_ = __webpack_require__("ZSx1");
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_);

// EXTERNAL MODULE: ./react-app/src/state/ducks/authentication/index.js + 5 modules
var authentication = __webpack_require__("x7jf");

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrities/index.js + 1 modules
var celebrities = __webpack_require__("wsp3");

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrity-likes/index.js + 2 modules
var celebrity_likes = __webpack_require__("bqfv");

// EXTERNAL MODULE: ./react-app/src/state/ducks/contracts/index.js + 2 modules
var contracts = __webpack_require__("bJxI");

// EXTERNAL MODULE: ./react-app/src/state/ducks/rest-countries/index.js + 5 modules
var rest_countries = __webpack_require__("Sa7d");

// EXTERNAL MODULE: ./react-app/src/state/ducks/rest-celebrities/index.js + 5 modules
var rest_celebrities = __webpack_require__("bIS6");

// EXTERNAL MODULE: ./react-app/src/state/ducks/session/index.js + 5 modules
var session = __webpack_require__("wpML");

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrity-requests/index.js + 5 modules
var celebrity_requests = __webpack_require__("vMIY");

// EXTERNAL MODULE: ./react-app/src/state/ducks/payments/index.js + 3 modules
var payments = __webpack_require__("lgZ/");

// CONCATENATED MODULE: ./react-app/src/state/ducks/filters/types.js
// SAVE FILTERS
const UPDATE_UPDATE_FLOW = "app/UPDATE_UPDATE_FLOW";
const UPDATE_SELECTED_CATEGORY = "app/UPDATE_SELECTED_CATEGORY";
const UPDATE_CATEGORIES = "app/UPDATE_CATEGORIES";
const UPDATE_SELECTED_COUNTRY = "app/UPDATE_SELECTED_COUNTRY";
const UPDATE_COUNTRIES = "app/UPDATE_COUNTRIES";
// CONCATENATED MODULE: ./react-app/src/state/ducks/filters/reducers.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const filtersInitialState = {
  flow: null,
  // allCountries -> categoriesUsedInCountry
  // allCategories -> countriesUsedInCategory
  selectedCountry: {},
  countries: [],
  selectedCategory: {},
  categories: []
};
function filtersReducer(state = filtersInitialState, action) {
  switch (action.type) {
    case UPDATE_UPDATE_FLOW:
      return _objectSpread(_objectSpread({}, state), {}, {
        flow: action.payload.flow
      });

    case UPDATE_SELECTED_COUNTRY:
      return _objectSpread(_objectSpread({}, state), {}, {
        selectedCountry: action.payload.selectedCountry
      });

    case UPDATE_COUNTRIES:
      return _objectSpread(_objectSpread({}, state), {}, {
        countries: action.payload.countries
      });

    case UPDATE_SELECTED_CATEGORY:
      return _objectSpread(_objectSpread({}, state), {}, {
        selectedCategory: action.payload.selectedCategory
      });

    case UPDATE_CATEGORIES:
      return _objectSpread(_objectSpread({}, state), {}, {
        categories: action.payload.categories
      });

    default:
      return state;
  }
}
/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  filtersReducer
}));
// CONCATENATED MODULE: ./react-app/src/state/ducks/filters/actions.js

const updateFlow = flow => {
  return dispatch => {
    dispatch({
      type: UPDATE_UPDATE_FLOW,
      payload: {
        flow
      }
    });
  };
};
const updateSelectedCountry = selectedCountry => {
  return dispatch => {
    dispatch({
      type: UPDATE_SELECTED_COUNTRY,
      payload: {
        selectedCountry
      }
    });
  };
};
const updateCountries = countries => {
  return dispatch => {
    dispatch({
      type: UPDATE_COUNTRIES,
      payload: {
        countries
      }
    });
  };
};
const updateSelectedCategory = selectedCategory => {
  return dispatch => {
    dispatch({
      type: UPDATE_SELECTED_CATEGORY,
      payload: {
        selectedCategory
      }
    });
  };
};
const updateCategories = categories => {
  return dispatch => {
    dispatch({
      type: UPDATE_CATEGORIES,
      payload: {
        categories
      }
    });
  };
};
// CONCATENATED MODULE: ./react-app/src/state/ducks/filters/operations.js


// CONCATENATED MODULE: ./react-app/src/state/ducks/filters/index.js



/* harmony default export */ var filters = (reducers);
// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrity-categories/index.js + 5 modules
var celebrity_categories = __webpack_require__("LSYO");

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrity-sections/types.js
var types = __webpack_require__("5NNn");

// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-sections/reducers.js
function reducers_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function reducers_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { reducers_ownKeys(Object(source), true).forEach(function (key) { reducers_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { reducers_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function reducers_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const fetchCelebritySectionsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    results: [],
    informationPage: {}
  }
};
const playVideoInitialState = {
  video_key: null
};
function fetchCelebritySectionsReducer(state = fetchCelebritySectionsInitialState, action) {
  switch (action.type) {
    case types["a" /* FETCH_CELEBRITIES_SECTIONS */]:
      return reducers_objectSpread(reducers_objectSpread({}, fetchCelebritySectionsInitialState), {}, {
        data: reducers_objectSpread({}, state.data),
        loading: true
      });

    case types["c" /* FETCH_CELEBRITIES_SECTIONS_FAILURE */]:
      return reducers_objectSpread(reducers_objectSpread({}, fetchCelebritySectionsInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["d" /* FETCH_CELEBRITIES_SECTIONS_SUCCESS */]:
      const results = [];
      if (action.payload.config.params.offset !== 0) results.push(...state.data.results);
      results.push(...action.payload.data.results);
      return reducers_objectSpread(reducers_objectSpread({}, fetchCelebritySectionsInitialState), {}, {
        data: reducers_objectSpread(reducers_objectSpread({}, action.payload.data), {}, {
          results
        })
      });

    case types["b" /* FETCH_CELEBRITIES_SECTIONS_COMPLETED */]:
      return reducers_objectSpread(reducers_objectSpread({}, fetchCelebritySectionsInitialState), {}, {
        data: reducers_objectSpread({}, state.data),
        completed: true
      });

    default:
      return state;
  }
}
function playVideoReducer(state = playVideoInitialState, action) {
  if (action.type === types["e" /* PLAY_VIDEO */]) {
    return action.payload;
  } else {
    return state;
  }
}
/* harmony default export */ var celebrity_sections_reducers = (Object(external_redux_["combineReducers"])({
  fetchCelebritySectionsReducer,
  playVideoReducer
}));
// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrity-sections/actions.js
var actions = __webpack_require__("xQtr");

// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-sections/operations.js

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrity-sections/paths.js
var paths = __webpack_require__("NiAU");

// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-sections/index.js




/* harmony default export */ var celebrity_sections = (celebrity_sections_reducers);
// EXTERNAL MODULE: ./react-app/src/state/ducks/countries/index.js + 5 modules
var ducks_countries = __webpack_require__("Qtd7");

// EXTERNAL MODULE: ./react-app/src/state/ducks/cursor-position/index.js + 4 modules
var cursor_position = __webpack_require__("LJ66");

// EXTERNAL MODULE: ./react-app/src/state/ducks/blog/index.js + 5 modules
var blog = __webpack_require__("UiVg");

// EXTERNAL MODULE: ./react-app/src/state/ducks/subscriptions/index.js + 2 modules
var subscriptions = __webpack_require__("Vcny");

// EXTERNAL MODULE: ./react-app/src/utils/pickPropertiesFromAObject.js
var pickPropertiesFromAObject = __webpack_require__("lS7v");

// EXTERNAL MODULE: ./react-app/src/state/ducks/discount-coupons/types.js
var discount_coupons_types = __webpack_require__("o3m8");

// CONCATENATED MODULE: ./react-app/src/state/ducks/discount-coupons/reducers.js
function discount_coupons_reducers_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function discount_coupons_reducers_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { discount_coupons_reducers_ownKeys(Object(source), true).forEach(function (key) { discount_coupons_reducers_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { discount_coupons_reducers_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function discount_coupons_reducers_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const getDiscountCouponBannerInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    couponCode: "",
    discount: 0,
    bannerTime: 0
  }
};
const timeDifferenceInitialState = null;
function timeDifferenceReducer(state = timeDifferenceInitialState, action) {
  if (action.type === discount_coupons_types["e" /* SET_TIME_DIFFERENCE */]) {
    return action.payload;
  }

  return state;
}
function getDiscountCouponBannerReducer(state = getDiscountCouponBannerInitialState, action) {
  switch (action.type) {
    case discount_coupons_types["a" /* GET_DISCOUNT_COUPONS_BANNER */]:
      return discount_coupons_reducers_objectSpread(discount_coupons_reducers_objectSpread({}, state), {}, {
        loading: true
      });

    case discount_coupons_types["c" /* GET_DISCOUNT_COUPONS_BANNER_FAILURE */]:
      return discount_coupons_reducers_objectSpread(discount_coupons_reducers_objectSpread({}, getDiscountCouponBannerInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case discount_coupons_types["d" /* GET_DISCOUNT_COUPONS_BANNER_SUCCESS */]:
      return discount_coupons_reducers_objectSpread(discount_coupons_reducers_objectSpread({}, getDiscountCouponBannerInitialState), {}, {
        data: Object(pickPropertiesFromAObject["a" /* default */])(action.payload.data.data, ["bannerTime", "couponCode", "discount_amount"])
      });

    case discount_coupons_types["b" /* GET_DISCOUNT_COUPONS_BANNER_COMPLETED */]:
      return discount_coupons_reducers_objectSpread(discount_coupons_reducers_objectSpread({}, state), {}, {
        completed: true
      });

    default:
      return state;
  }
}
/* harmony default export */ var discount_coupons_reducers = (Object(external_redux_["combineReducers"])({
  getDiscountCouponBannerReducer,
  timeDifferenceReducer
}));
// EXTERNAL MODULE: ./react-app/src/state/ducks/discount-coupons/operations.js
var operations = __webpack_require__("sXAn");

// CONCATENATED MODULE: ./react-app/src/state/ducks/discount-coupons/index.js



/* harmony default export */ var discount_coupons = (discount_coupons_reducers);
// CONCATENATED MODULE: ./react-app/src/state/ducks/index.js

 // export { default as celebritySocialNetworks } from "./celebrity-social-networks";














 // export { default as userLocation } from "./userLocation";


// EXTERNAL MODULE: external "redux-batched-actions"
var external_redux_batched_actions_ = __webpack_require__("55jf");

// CONCATENATED MODULE: ./react-app/src/state/middlewares/checkNext.js
const checkNext = () => next => action => {
  next(action); // console.log(action)
};

/* harmony default export */ var middlewares_checkNext = (checkNext);
// CONCATENATED MODULE: ./react-app/src/state/middlewares/index.js

// EXTERNAL MODULE: external "next-redux-wrapper"
var external_next_redux_wrapper_ = __webpack_require__("JMOJ");

// CONCATENATED MODULE: ./react-app/src/state/utils/getStateFromServer.js
function getStateFromServer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function getStateFromServer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { getStateFromServer_ownKeys(Object(source), true).forEach(function (key) { getStateFromServer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { getStateFromServer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getStateFromServer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getStateFromServer = (fromClient, fromServer) => {
  return getStateFromServer_objectSpread(getStateFromServer_objectSpread({}, fromClient), {}, {
    celebritySections: getStateFromServer_objectSpread(getStateFromServer_objectSpread({}, fromClient.celebritySections), {}, {
      fetchCelebritySectionsReducer: fromServer.celebritySections.fetchCelebritySectionsReducer
    }),
    celebrities: getStateFromServer_objectSpread(getStateFromServer_objectSpread({}, fromClient.celebrities), {}, {
      celebrityProfileVersionReducer: fromClient.celebrities.celebrityProfileVersionReducer || fromServer.celebrities.celebrityProfileVersionReducer,
      getCelebrityReducer: fromServer.celebrities.getCelebrityReducer,
      fetchPublicContractsReducer: fromServer.celebrities.fetchPublicContractsReducer
    })
  });
};
// CONCATENATED MODULE: ./react-app/src/state/store.js







const combinedReducers = Object(external_redux_["combineReducers"])(ducks_namespaceObject);

const rootReducer = (state, action) => {
  if (action.type === external_next_redux_wrapper_["HYDRATE"]) return getStateFromServer(state, action.payload);
  return combinedReducers(state, action);
}; // create a makeStore function


const makeStore = context => Object(external_redux_["createStore"])(rootReducer, {}, Object(external_redux_["applyMiddleware"])(external_redux_batched_actions_["batchDispatchMiddleware"], middlewares_checkNext, external_redux_thunk_default.a)); // export an assembled wrapper


const wrapper = Object(external_next_redux_wrapper_["createWrapper"])(makeStore, {
  debug: "qa" === "development"
});

/***/ }),

/***/ "DmEG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./react-app/src/constants/bootstrapBreakpoint.js
var bootstrapBreakpoint = __webpack_require__("baxW");

// CONCATENATED MODULE: ./react-app/src/constants/bootstrapContainerSize.js
const containerSmallSize = 508;
const containerMediumSize = 688;
const containerLargeSize = 960;
const containerExtraLargeSize = 1140;
// CONCATENATED MODULE: ./react-app/src/utils/getContainerWidthFromWindowWidth.js



const getContainerWidthFromWindowWidth = windowWidth => {
  if (windowWidth >= bootstrapBreakpoint["a" /* extraLargeBreakPoint */]) {
    return containerExtraLargeSize;
  } else if (windowWidth >= bootstrapBreakpoint["b" /* largeBreakPoint */]) {
    return containerLargeSize;
  } else if (windowWidth >= bootstrapBreakpoint["c" /* mediumBreakpoint */]) {
    return containerMediumSize;
  } else if (windowWidth >= bootstrapBreakpoint["d" /* smallBreakpoint */]) {
    return containerSmallSize;
  }

  return windowWidth;
};

/* harmony default export */ var utils_getContainerWidthFromWindowWidth = __webpack_exports__["a"] = (getContainerWidthFromWindowWidth);

/***/ }),

/***/ "ErMc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getMoreFrequentIds = (celebrities = [], propertyName) => {
  const idsCount = celebrities.reduce((idsCount, celebrity) => {
    const celebrityPropertyValue = celebrity[propertyName];

    if (idsCount[celebrityPropertyValue]) {
      return _objectSpread(_objectSpread({}, idsCount), {}, {
        [celebrityPropertyValue]: idsCount[celebrityPropertyValue] + 1
      });
    } else {
      return _objectSpread(_objectSpread({}, idsCount), {}, {
        [celebrityPropertyValue]: 1
      });
    }
  }, {});
  return Object.entries(idsCount).sort(([, firstEntry], [, secondEntry]) => secondEntry - firstEntry).slice(0, 3).map(([value]) => value).join(",");
};

/* harmony default export */ __webpack_exports__["a"] = (getMoreFrequentIds);

/***/ }),

/***/ "GXs3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = resolveRewrites;

function resolveRewrites() {}

/***/ }),

/***/ "Gj3/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoaderLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

const LoaderLayout = () => __jsx("div", {
  className: "loading-section mx-auto text-center"
}, __jsx("div", {
  className: "spinner-grow text-primary",
  role: "status"
}, __jsx("span", {
  className: "sr-only"
}, "Loading...")), __jsx("div", {
  className: "spinner-grow text-primary",
  role: "status"
}, __jsx("span", {
  className: "sr-only"
}, "Loading...")), __jsx("div", {
  className: "spinner-grow text-primary",
  role: "status"
}, __jsx("span", {
  className: "sr-only"
}, "Loading...")));

/***/ }),

/***/ "HkHs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return tagManagerDataLayer; });
/* harmony import */ var react_gtm_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("hI02");
/* harmony import */ var react_gtm_module__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_gtm_module__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // import { Mixpanel } from "./mixPanel";

const ENV = "qa";
const INITIALIZE_GTM_PROD_MODE = process.env.NEXT_PUBLIC_INITIALIZE_GTM_PROD_MODE === "true";
const initialize = () => {
  if (ENV === "production" || INITIALIZE_GTM_PROD_MODE) {
    react_gtm_module__WEBPACK_IMPORTED_MODULE_0___default.a.initialize({
      gtmId: "GTM-TCDSJ3Q"
    });
  } else {
    react_gtm_module__WEBPACK_IMPORTED_MODULE_0___default.a.initialize({
      gtmId: "GTM-NH95V75"
    });
  }
};
const tagManagerDataLayer = (event, dataLayer) => {
  try {
    var _window, _window$dataLayer, _window$dataLayer$pus;

    // MIX PANEL
    // Mixpanel.track(event, { ...dataLayer });
    // GTM NOTIFICATION
    (_window = window) === null || _window === void 0 ? void 0 : (_window$dataLayer = _window.dataLayer) === null || _window$dataLayer === void 0 ? void 0 : (_window$dataLayer$pus = _window$dataLayer.push) === null || _window$dataLayer$pus === void 0 ? void 0 : _window$dataLayer$pus.call(_window$dataLayer, _objectSpread(_objectSpread({}, dataLayer), {}, {
      event
    })); // Segment

    if (ENV !== "development") {
      window.analytics.track(event, _objectSpread(_objectSpread({}, dataLayer), {}, {
        ENVIRONMENT: ENV.toUpperCase()
      }));
    }
  } catch (e) {
    console.warn("tagManagerDataLayer Error:", e);
  }
};

/***/ }),

/***/ "HoEe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FETCH_USER_CELEBRITY_LIKES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return FETCH_USER_CELEBRITY_LIKES_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return FETCH_USER_CELEBRITY_LIKES_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FETCH_USER_CELEBRITY_LIKES_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FETCH_USER_CELEBRITY_LIKES_CLEAN_UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADD_OR_REMOVE_LIKE; });
/* unused harmony export ADD_OR_REMOVE_LIKE_SUCCESS */
/* unused harmony export ADD_OR_REMOVE_LIKE_FAILURE */
/* unused harmony export ADD_OR_REMOVE_LIKE_COMPLETED */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET_COMPLETED; });
const MODEL = "celebrity-sections";
const FETCH_USER_CELEBRITY_LIKES = `${MODEL}/FETCH_USER_CELEBRITY_LIKES`;
const FETCH_USER_CELEBRITY_LIKES_SUCCESS = `${MODEL}/FETCH_USER_CELEBRITY_LIKES_SUCCESS`;
const FETCH_USER_CELEBRITY_LIKES_FAILURE = `${MODEL}/FETCH_USER_CELEBRITY_LIKES_FAILURE`;
const FETCH_USER_CELEBRITY_LIKES_COMPLETED = `${MODEL}/FETCH_USER_CELEBRITY_LIKES_COMPLETED`;
const FETCH_USER_CELEBRITY_LIKES_CLEAN_UP = `${MODEL}/FETCH_USER_CELEBRITY_LIKES_CLEAN_UP`;
const ADD_OR_REMOVE_LIKE = `${MODEL}/ADD_OR_REMOVE_LIKE`;
const ADD_OR_REMOVE_LIKE_SUCCESS = `${MODEL}/ADD_OR_REMOVE_LIKE_SUCCESS`;
const ADD_OR_REMOVE_LIKE_FAILURE = `${MODEL}/ADD_OR_REMOVE_LIKE_FAILURE`;
const ADD_OR_REMOVE_LIKE_COMPLETED = `${MODEL}/ADD_OR_REMOVE_LIKE_COMPLETED`;
const FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET = `${MODEL}/FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET`;
const FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET_SUCCESS = `${MODEL}/FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET_SUCCESS`;
const FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET_FAILURE = `${MODEL}/FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET_FAILURE`;
const FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET_COMPLETED = `${MODEL}/FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET_COMPLETED`;

/***/ }),

/***/ "IZS3":
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),

/***/ "JMOJ":
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "KC+L":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CelebritiesCardsSectionLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Q4dm");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("oI26");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_window__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _celebrity_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("f1S7");
/* harmony import */ var _video_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("O5Gr");
/* harmony import */ var react_app_src_components_common_routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("68Dr");
/* harmony import */ var _routing_Paths__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("c5JF");
/* harmony import */ var _state_utils_apiService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("XruL");
/* harmony import */ var _state_utils_gtm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("HkHs");
/* harmony import */ var _utils_getMoreFrequentIds__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("ErMc");
/* harmony import */ var react_app_src_utils_getWindow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("V08N");
/* harmony import */ var _common_helpers_maybe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("LeEe");
/* harmony import */ var react_app_src_utils_useGetViewportWidthOnResize__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("SLhP");
/* harmony import */ var react_app_src_utils_getContainerWidthFromWindowWidth__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("DmEG");
/* harmony import */ var react_app_src_constants_bootstrapBreakpoint__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("baxW");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















const celebrityCardWidth = 150;
const videoCardWidth = 258;
const celebrityCardSectionHeight = 219;
const videoCardSectionHeight = 360;
const cardGap = 12;

const getColumn = (isVideoCardSection, celebritiesSectionId) => ({
  data,
  index,
  style
}) => {
  const celebrity = data[index];
  const isLastItem = index >= data.length - 1;
  return __jsx("div", {
    style: isLastItem ? _objectSpread(_objectSpread({}, style), {}, {
      width: style.width - cardGap
    }) : style
  }, __jsx(_common_helpers_maybe__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    it: isVideoCardSection,
    orElse: __jsx(_celebrity_card__WEBPACK_IMPORTED_MODULE_3__[/* CelebrityCardLayout */ "a"], {
      celebrity: celebrity
    })
  }, __jsx(_video_card__WEBPACK_IMPORTED_MODULE_4__[/* VideoCardLayout */ "a"], {
    celebrityId: celebrity.id,
    celebrityAvatar: celebrity.avatar,
    celebrityUsername: celebrity.username,
    celebrityFullName: celebrity.fullName,
    videoOccasion: celebrity.occasion,
    videoUrl: celebrity.videoUrl,
    videoPosterUrl: celebrity.videoPosterUrl,
    videoKey: `${celebritiesSectionId}-${celebrity.id}`
  })));
};

const initialState = {
  showLeftScrollButton: false,
  showRightScrollButton: false,
  mobileSectionWidth: 524,
  desktopSectionWidth: 1125
};

const getSectionWidth = windowWidth => {
  const containerWidth = Object(react_app_src_utils_getContainerWidthFromWindowWidth__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"])(windowWidth);

  if (windowWidth >= react_app_src_constants_bootstrapBreakpoint__WEBPACK_IMPORTED_MODULE_14__[/* largeBreakPoint */ "b"]) {
    return containerWidth - 15;
  } else if (windowWidth >= react_app_src_constants_bootstrapBreakpoint__WEBPACK_IMPORTED_MODULE_14__[/* smallBreakpoint */ "d"]) {
    return containerWidth + 16;
  }

  return containerWidth - 15;
};

const CelebritiesCardsSectionLayout = ({
  celebritiesSection,
  moreResultsPath,
  isMobile,
  isFavoriteSection
}) => {
  const {
    0: showLeftScrollButton,
    1: setShowLeftScrollButton
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialState.showLeftScrollButton);
  const {
    0: showRightScrollButton,
    1: setShowRightScrollButton
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialState.showRightScrollButton);
  const cardListRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const windowWidth = Object(react_app_src_utils_useGetViewportWidthOnResize__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])();
  const {
    0: sectionWidth,
    1: setSectionWidth
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(initialState[isMobile ? "mobileSectionWidth" : "desktopSectionWidth"]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setSectionWidth(getSectionWidth(windowWidth));
  }, [windowWidth]);
  const analyticsData = {
    widget: "CelebritiesCardsSectionLayout",
    path: Object(react_app_src_utils_getWindow__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])().location.pathname,
    title: celebritiesSection.title,
    id: celebritiesSection.id,
    celebritySectionType: celebritiesSection.celebritySectionType,
    position: celebritiesSection.position
  };

  const scrollTo = direction => () => {
    const cardListElement = cardListRef.current._outerRef;
    const {
      offsetWidth
    } = cardListElement;
    cardListElement.scrollBy({
      left: direction === "right" ? offsetWidth : offsetWidth * -1,
      behavior: "smooth"
    });
    _state_utils_gtm__WEBPACK_IMPORTED_MODULE_8__[/* tagManagerDataLayer */ "b"]("CLICK_CELEBRITY_SECTION_SCROLL_BUTTON", _objectSpread(_objectSpread({}, analyticsData), {}, {
      direction
    }));
  };

  const setScrollButtonsVisibility = lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(() => {
    const {
      scrollLeft,
      offsetWidth,
      scrollWidth
    } = cardListRef.current._outerRef;
    setShowLeftScrollButton(scrollLeft !== 0);
    setShowRightScrollButton(scrollLeft + offsetWidth !== scrollWidth);
    _state_utils_gtm__WEBPACK_IMPORTED_MODULE_8__[/* tagManagerDataLayer */ "b"]("SCROLL_CELEBRITY_SECTION_LIST", _objectSpread(_objectSpread({}, analyticsData), {}, {
      hasReachedListEnd: scrollLeft + offsetWidth >= scrollWidth
    }));
  }, 100);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const cardListElement = cardListRef.current._outerRef;
    setShowRightScrollButton(cardListElement.scrollWidth > cardListElement.offsetWidth);
  }, []);
  const {
    celebrities
  } = celebritiesSection;
  const searchMoreResultsPath = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!celebrities) return "#";
    return _routing_Paths__WEBPACK_IMPORTED_MODULE_6__[/* SEARCH_PATH */ "y"] + Object(_state_utils_apiService__WEBPACK_IMPORTED_MODULE_7__[/* jsonToQueryString */ "b"])({
      country_id: Object(_utils_getMoreFrequentIds__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(celebrities, "countryId"),
      category_id: Object(_utils_getMoreFrequentIds__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(celebrities, "categoryId"),
      limit: 20
    });
  }, [celebrities]);
  const hasMoreResults = celebritiesSection.celebritySectionType === "CELEBRITY_CARD" && celebritiesSection.celebrities.length >= 10;
  const shouldRenderMoreResultsButton = hasMoreResults && moreResultsPath;

  const registerCelebritySectionHover = () => _state_utils_gtm__WEBPACK_IMPORTED_MODULE_8__[/* tagManagerDataLayer */ "b"]("HOVER_CELEBRITY_SECTION", analyticsData);

  const registerSeeMoreResultsClick = () => _state_utils_gtm__WEBPACK_IMPORTED_MODULE_8__[/* tagManagerDataLayer */ "b"]("CLICK_CELEBRITY_SECTION_SEE_MORE_LINK", _objectSpread(_objectSpread({}, analyticsData), {}, {
    searchMoreResultsPath
  }));

  const {
    celebritySectionType
  } = celebritiesSection;
  const isVideoCardSection = celebritySectionType !== "CELEBRITY_CARD";
  const Column = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => getColumn(isVideoCardSection, celebritiesSection.id), []);
  return __jsx("section", {
    className: `celebrities-section-layout container overflow-hidden pr-0 ${celebritiesSection.celebritySectionType === "MAIN_VIDEO_1" ? "celebrities-sections-videos" : ""}`,
    onMouseEnter: registerCelebritySectionHover
  }, __jsx("header", {
    className: "celebrities-section__header d-flex justify-content-between"
  }, __jsx("h2", {
    className: `celebrities-section-layout__title`
  }, celebritiesSection.title), __jsx(_common_helpers_maybe__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    it: hasMoreResults
  }, __jsx(react_app_src_components_common_routing__WEBPACK_IMPORTED_MODULE_5__[/* NavLink */ "a"], {
    to: moreResultsPath || searchMoreResultsPath,
    className: "mb-1 font-weight-bold mr-3 mr-sm-0 flex-shrink-0",
    onClick: registerSeeMoreResultsClick
  }, "Ver m\xE1s"))), __jsx(_common_helpers_maybe__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    it: showLeftScrollButton
  }, __jsx("button", {
    className: "celebrities-section-layout__scroll-to-button d-none d-md-block",
    onClick: scrollTo("left")
  }, __jsx("i", {
    className: "fa fa-chevron-left text-white"
  }))), __jsx(react_window__WEBPACK_IMPORTED_MODULE_2__["FixedSizeList"], {
    height: isVideoCardSection ? videoCardSectionHeight : celebrityCardSectionHeight,
    ref: cardListRef,
    width: sectionWidth,
    layout: "horizontal",
    itemCount: celebrities.length,
    itemData: celebrities,
    onScroll: setScrollButtonsVisibility,
    className: "celebrities-section-layout__cards-list",
    itemSize: (isVideoCardSection ? videoCardWidth : celebrityCardWidth) + cardGap
  }, Column), __jsx(_common_helpers_maybe__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    it: showRightScrollButton
  }, __jsx("button", {
    className: "celebrities-section-layout__scroll-to-button scroll-to-right-button d-none d-md-block",
    onClick: scrollTo("right")
  }, __jsx("i", {
    className: "fa fa-chevron-right text-white"
  }))));
};

CelebritiesCardsSectionLayout.defaultProps = {
  hasMoreResults: false
};


/***/ }),

/***/ "KKHI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _FiltersSectionLayout; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: external "react-bootstrap/Modal"
var Modal_ = __webpack_require__("qqGZ");
var Modal_default = /*#__PURE__*/__webpack_require__.n(Modal_);

// EXTERNAL MODULE: external "react-bootstrap/Button"
var Button_ = __webpack_require__("vVTy");
var Button_default = /*#__PURE__*/__webpack_require__.n(Button_);

// CONCATENATED MODULE: ./react-app/src/components/layouts/search-input/index.js
var __jsx = external_react_default.a.createElement;


const SearchInputLayout = ({
  autoFocus,
  searchLabel,
  onSearchChange,
  initialValue
}) => {
  const {
    0: keyword,
    1: setKeyword
  } = Object(external_react_["useState"])(initialValue);

  const changeKeyword = ({
    target
  }) => {
    const inputValue = target.value;
    setKeyword(inputValue);
    onSearchChange(inputValue);
  };

  return __jsx("div", {
    className: "SearchInputLayout"
  }, __jsx("div", {
    className: "form-group"
  }, __jsx("div", {
    className: "input-group"
  }, __jsx("i", {
    className: "fa fa-search"
  }), __jsx("input", {
    autoFocus: autoFocus,
    id: "input-search",
    className: "form-control",
    type: "text",
    name: "search",
    value: keyword,
    onChange: changeKeyword,
    placeholder: searchLabel
  }))));
};

SearchInputLayout.defaultProps = {
  searchLabel: "Buscar",
  onSearchChange: () => {},
  autoFocus: false,
  initialValue: ""
}; // Export Class


// CONCATENATED MODULE: ./react-app/src/components/layouts/modal-select/index.js
var modal_select_jsx = external_react_default.a.createElement;





const ModalSelect = ({
  buttonLabel,
  modalTitle,
  showSearch,
  searchPlaceholder,
  onSearchChange,
  options,
  footerButtonLabel,
  footerButtonOnClick,
  onInputChange,
  isChecked,
  multipleSelection,
  onModalClose,
  onModalOpen
}) => {
  const {
    0: modalIsOpen,
    1: setModalIsOpen
  } = Object(external_react_["useState"])(false);

  const closeModal = () => {
    onModalClose();
    setModalIsOpen(false);
  };

  const openModal = () => {
    onModalOpen();
    setModalIsOpen(true);
  };

  const onClickFooterButton = () => {
    footerButtonOnClick();
    closeModal();
  };

  return modal_select_jsx(external_react_default.a.Fragment, null, modal_select_jsx(Button_default.a, {
    type: "button",
    variant: "light",
    className: "ModalSelect__btn",
    onClick: openModal
  }, modal_select_jsx("span", {
    className: "ModalSelect__btn-text"
  }, buttonLabel), modal_select_jsx("i", {
    className: "fa fa-sort-down ModalSelect__btn-icon"
  })), modal_select_jsx(Modal_default.a, {
    show: modalIsOpen,
    onHide: closeModal,
    className: "ModalSelect__modal",
    centered: true
  }, modal_select_jsx(Modal_default.a.Header, {
    closeButton: true
  }, modal_select_jsx(Modal_default.a.Title, {
    id: "contained-modal-title-vcenter"
  }, modalTitle)), modal_select_jsx(Modal_default.a.Body, null, showSearch ? modal_select_jsx(SearchInputLayout, {
    searchLabel: searchPlaceholder,
    onSearchChange: onSearchChange
  }) : null, modal_select_jsx("ul", {
    className: `options-list pl-2 mb-0 ${!showSearch ? "py-0" : ""}`
  }, options && options.map(option => {
    const optionKey = `${buttonLabel}-${option.label}-${option.value}`;
    const inputType = multipleSelection ? "checkbox" : "radio";
    return modal_select_jsx("li", {
      className: "options-list__item",
      key: optionKey
    }, modal_select_jsx("div", {
      className: `custom-control form-control-lg custom-${inputType}`
    }, modal_select_jsx("input", {
      type: inputType,
      className: "custom-control-input",
      id: optionKey,
      name: multipleSelection ? optionKey : buttonLabel,
      value: option.value,
      onChange: onInputChange,
      checked: isChecked(option.value)
    }), modal_select_jsx("label", {
      className: "custom-control-label",
      htmlFor: optionKey
    }, modal_select_jsx("span", {
      className: "options-list__label"
    }, option.label))));
  }))), modal_select_jsx(Modal_default.a.Footer, null, modal_select_jsx(Button_default.a, {
    onClick: onClickFooterButton
  }, footerButtonLabel))));
};

ModalSelect.defaultProps = {
  buttonLabel: "",
  modalTitle: "",
  showSearch: true,
  searchPlaceholder: "Buscar",
  onSearchChange: () => {},
  options: [],
  footerButtonLabel: "",
  footerButtonOnClick: () => {},
  onInputChange: () => {},
  isChecked: () => {},
  multipleSelection: false,
  onModalClose: () => {},
  onModalOpen: () => {}
};

// EXTERNAL MODULE: ./react-app/src/state/utils/gtm.js
var gtm = __webpack_require__("HkHs");

// EXTERNAL MODULE: ./react-app/src/utils/getWindow.js
var getWindow = __webpack_require__("V08N");

// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrities-filter/index.js
var celebrities_filter_jsx = external_react_default.a.createElement;





const CelebritiesFilter = ({
  buttonLabel,
  modalTitle,
  showSearch,
  searchPlaceholder,
  options,
  onApplyFilters,
  activeItems
}) => {
  var _getWindow$location;

  const {
    0: searchQuery,
    1: setSearchQuery
  } = Object(external_react_["useState"])("");
  const {
    0: checkedItems,
    1: setCheckedItems
  } = Object(external_react_["useState"])([]);

  const addCheckedItem = ({
    target
  }) => {
    if (target.checked) {
      setCheckedItems(checkedItems => [...checkedItems, target.value]);
    } else {
      setCheckedItems(checkedItems => checkedItems.filter(item => item !== target.value));
    }
  };

  const analyticsData = {
    widget: "CelebritiesFilter",
    path: (_getWindow$location = Object(getWindow["a" /* default */])().location) === null || _getWindow$location === void 0 ? void 0 : _getWindow$location.pathname,
    buttonLabel,
    activeItems
  };

  const onModalOpen = () => {
    gtm["b" /* tagManagerDataLayer */]("OPEN_CELEBRITIES_FILTER_MODAL", analyticsData);
    setCheckedItems(activeItems);
  };

  const onModalClose = () => {
    gtm["b" /* tagManagerDataLayer */]("CLOSE_CELEBRITIES_FILTER_MODAL", analyticsData);
    setSearchQuery("");
  };

  const applyFilters = () => {
    gtm["b" /* tagManagerDataLayer */]("APPLY_CELEBRITIES_FILTER", analyticsData);
    onApplyFilters(checkedItems);
  };

  Object(external_react_["useEffect"])(() => {
    setCheckedItems(activeItems);
  }, [activeItems]);

  const matchSearchQuery = ({
    label
  }) => new RegExp(searchQuery, "gi").test(label);

  const filteredOptions = searchQuery ? options.filter(matchSearchQuery) : options;
  return celebrities_filter_jsx(ModalSelect, {
    buttonLabel: `${buttonLabel} ${activeItems.length > 0 ? `(${activeItems.length})` : ""}`,
    modalTitle: modalTitle,
    footerButtonLabel: "Aplicar filtro",
    footerButtonOnClick: applyFilters,
    searchPlaceholder: searchPlaceholder,
    onModalOpen: onModalOpen,
    onModalClose: onModalClose,
    options: filteredOptions,
    showSearch: showSearch,
    onInputChange: addCheckedItem,
    onSearchChange: setSearchQuery,
    isChecked: optionValue => checkedItems.includes(String(optionValue)),
    multipleSelection: true
  });
};

CelebritiesFilter.defaultProps = {
  buttonLabel: "",
  modalTitle: "",
  activeItems: [],
  showSearch: true,
  searchPlaceholder: "Buscar",
  options: [],
  onApplyFilters: () => {}
};

// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrities-order-by/index.js
var celebrities_order_by_jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const PRICE = "price";
const ASC = "asc";
const DESC = "desc";
const orderByOptions = [{
  label: "Precio: De Menor a Mayor",
  value: `${PRICE} ${ASC}`
}, {
  label: "Precio: De Mayor a Menor",
  value: `${PRICE} ${DESC}`
}];

const getCheckItemLabel = activeValue => {
  var _orderByOptions$find;

  return ((_orderByOptions$find = orderByOptions.find(({
    value
  }) => value !== "" && value === activeValue)) === null || _orderByOptions$find === void 0 ? void 0 : _orderByOptions$find.label) || "";
};

const CelebritiesOrderBy = ({
  onApplyOrderBy,
  activeValue
}) => {
  const {
    0: checkedValue,
    1: setCheckedValue
  } = Object(external_react_["useState"])(null);
  const checkItemLabel = getCheckItemLabel(activeValue);
  Object(external_react_["useEffect"])(() => {
    setCheckedValue(activeValue);
  }, [activeValue]);
  const analyticsData = {
    widget: "CelebritiesOrderBy",
    path: Object(getWindow["a" /* default */])().location.pathname,
    checkItemLabel
  };

  const registerOrderByFilterOpen = () => gtm["b" /* tagManagerDataLayer */]("OPEN_ORDER_BY_FILTER_MODAL", analyticsData);

  const registerOrderByFilterClose = () => gtm["b" /* tagManagerDataLayer */]("CLOSE_ORDER_BY_FILTER_MODAL", analyticsData);

  const applyOrderBy = () => {
    gtm["b" /* tagManagerDataLayer */]("APPLY_ORDER_BY_FILTER", _objectSpread(_objectSpread({}, analyticsData), {}, {
      checkItemLabel: getCheckItemLabel(checkedValue)
    }));
    onApplyOrderBy(checkedValue);
  };

  return celebrities_order_by_jsx(ModalSelect, {
    buttonLabel: `Ordenar por: ${checkItemLabel}`,
    modalTitle: "Ordenar por",
    footerButtonLabel: "Ordenar",
    footerButtonOnClick: applyOrderBy,
    onModalOpen: registerOrderByFilterOpen,
    onModalClose: registerOrderByFilterClose,
    options: orderByOptions,
    showSearch: false,
    onInputChange: ({
      target
    }) => setCheckedValue(target.value),
    isChecked: optionValue => checkedValue === optionValue
  });
};

CelebritiesOrderBy.defaultProps = {
  activeValue: "",
  onApplyOrderBy: () => {}
};

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrities/actions.js
var actions = __webpack_require__("rlcS");

// EXTERNAL MODULE: ./react-app/src/state/ducks/rest-countries/index.js + 5 modules
var rest_countries = __webpack_require__("Sa7d");

// EXTERNAL MODULE: ./react-app/src/state/ducks/countries/index.js + 5 modules
var ducks_countries = __webpack_require__("Qtd7");

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrity-categories/index.js + 5 modules
var celebrity_categories = __webpack_require__("LSYO");

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrities/reducers.js
var reducers = __webpack_require__("aCqb");

// EXTERNAL MODULE: ./react-app/src/state/utils/apiService.js
var apiService = __webpack_require__("XruL");

// EXTERNAL MODULE: ./react-app/src/components/common/routing/index.js + 3 modules
var routing = __webpack_require__("68Dr");

// CONCATENATED MODULE: ./react-app/src/components/layouts/filters-section/index.js
var filters_section_jsx = external_react_default.a.createElement;

function filters_section_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function filters_section_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { filters_section_ownKeys(Object(source), true).forEach(function (key) { filters_section_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { filters_section_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function filters_section_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














const mapStateToProps = ({
  countries,
  celebrities,
  celebrityCategories
}) => {
  return {
    countries: countries.countriesReducer.data.results,
    celebrityCategories: celebrityCategories.fetchCelebrityCategoriesReducer.data.results
  };
};

const mapDispatchToProps = {
  updateQueryParams: actions["l" /* updateQueryParams */],
  listCountries: ducks_countries["a" /* countriesOperations */].list,
  listCelebrityCategories: celebrity_categories["a" /* celebrityCategoriesOperations */].list,
  listRestCountries: rest_countries["b" /* restCountriesOperations */].list
};

const removeParenthesis = string => string.replace(/\([^)]*\)/, "");

const initialState = {
  params: {
    offset: reducers["b" /* updateQueryParamsInitialState */].offset,
    limit: reducers["b" /* updateQueryParamsInitialState */].limit
  }
};

const FiltersSectionLayout = ({
  className = "",
  countries,
  celebrityCategories,
  updateQueryParams,
  listCountries,
  listCelebrityCategories,
  location,
  router
}) => {
  const {
    0: params,
    1: setParams
  } = Object(external_react_["useState"])(initialState.params);
  const queryParams = Object(apiService["c" /* queryStringToJSON */])(location.search);

  const setFilterParam = paramName => paramValues => setParams(params => filters_section_objectSpread(filters_section_objectSpread({}, params), {}, {
    [paramName]: paramValues.join(",")
  }));

  const setOrderByParam = orderBy => setParams(params => filters_section_objectSpread(filters_section_objectSpread({}, params), {}, {
    orderBy
  }));

  Object(external_react_["useEffect"])(() => {
    if (params === initialState.params) return;
    updateQueryParams(filters_section_objectSpread(filters_section_objectSpread(filters_section_objectSpread({}, queryParams), initialState.params), params), router);
  }, [params]);
  Object(external_react_["useEffect"])(() => {
    const shouldFetchFilterOptions = !countries.length && !celebrityCategories.length;
    if (!shouldFetchFilterOptions) return;
    listCountries({
      orderBy: "name asc"
    });
    listCelebrityCategories({
      orderBy: "title asc"
    });
  }, []);

  const cleanFilters = () => {
    gtm["b" /* tagManagerDataLayer */]("CLICK_CLEAN_FILTERS_BUTTON", {
      widget: "FiltersSectionLayout",
      path: window.location.pathname,
      queryParams
    });
    updateQueryParams(filters_section_objectSpread({}, reducers["b" /* updateQueryParamsInitialState */]), router);
  };

  const showCleanFiltersButton = (queryParams.orderBy || queryParams["country_id"] || queryParams["category_id"]) && !queryParams.search;
  const activeCountryItems = Object(external_react_["useMemo"])(() => queryParams.country_id ? queryParams.country_id.split(",") : [], [queryParams.country_id]);
  const activeCategoryItems = Object(external_react_["useMemo"])(() => queryParams.category_id ? queryParams.category_id.split(",") : [], [queryParams.category_id]);
  return filters_section_jsx("section", {
    className: `FiltersSectionLayout ${className}`
  }, filters_section_jsx("div", {
    className: "filters-section__container container pt-1"
  }, filters_section_jsx("h2", {
    className: "filters-section__title ml-2"
  }, "Filtrar por:"), filters_section_jsx("ul", {
    className: "filters-section__filters-list p-0"
  }, showCleanFiltersButton ? filters_section_jsx("li", {
    className: "filters-section__filters-item d-flex align-items-center"
  }, filters_section_jsx("button", {
    type: "button",
    className: "filters-section__back-btn btn btn-dark",
    onClick: cleanFilters
  }, filters_section_jsx("i", {
    className: "fa fa-times text-white"
  }))) : null, filters_section_jsx("li", {
    className: "filters-section__filters-item"
  }, filters_section_jsx(CelebritiesFilter, {
    buttonLabel: "Pa\xEDs",
    modalTitle: "Filtrar por pa\xEDs",
    searchPlaceholder: "Buscar pa\xEDs",
    activeItems: activeCountryItems,
    onApplyFilters: setFilterParam("country_id"),
    options: countries.map(country => ({
      label: removeParenthesis(country.name),
      value: country.id
    }))
  })), filters_section_jsx("li", {
    className: "filters-section__filters-item"
  }, filters_section_jsx(CelebritiesFilter, {
    buttonLabel: "Categor\xEDa",
    modalTitle: "Filtrar por categor\xEDa",
    searchPlaceholder: "Buscar categor\xEDa",
    activeItems: activeCategoryItems,
    onApplyFilters: setFilterParam("category_id"),
    options: celebrityCategories.map(category => ({
      label: category.title,
      value: category.id
    }))
  })), filters_section_jsx("li", {
    className: "filters-section__filters-item filters-section__order-by"
  }, filters_section_jsx(CelebritiesOrderBy, {
    onApplyOrderBy: setOrderByParam,
    activeValue: queryParams.orderBy
  })))));
};

FiltersSectionLayout.defaultProps = {
  queryParams: []
};

const _FiltersSectionLayout = Object(external_react_redux_["connect"])(mapStateToProps, mapDispatchToProps)(Object(routing["c" /* withRouter */])(FiltersSectionLayout));



/***/ }),

/***/ "LJ66":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ operations_namespaceObject; });

// NAMESPACE OBJECT: ./react-app/src/state/ducks/cursor-position/operations.js
var operations_namespaceObject = {};
__webpack_require__.r(operations_namespaceObject);
__webpack_require__.d(operations_namespaceObject, "saveCursorPosition", function() { return saveCursorPosition; });

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// CONCATENATED MODULE: ./react-app/src/state/ducks/cursor-position/types.js
const SAVE_CURSOR_POSITION = "SAVE_CURSOR_POSITION";
// CONCATENATED MODULE: ./react-app/src/state/ducks/cursor-position/reducers.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const filtersInitialState = {
  Position: 0
};
function cursorReducer(state = filtersInitialState, action) {
  switch (action.type) {
    case SAVE_CURSOR_POSITION:
      return _objectSpread(_objectSpread({}, state), {}, {
        Position: action.payload
      });

    default:
      return state;
  }
}
/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  cursorReducer
}));
// CONCATENATED MODULE: ./react-app/src/state/ducks/cursor-position/actions.js

const saveCursorPosition = currentPosition => {
  return dispatch => {
    dispatch({
      type: SAVE_CURSOR_POSITION,
      payload: currentPosition
    });
  };
};
// CONCATENATED MODULE: ./react-app/src/state/ducks/cursor-position/operations.js


// CONCATENATED MODULE: ./react-app/src/state/ducks/cursor-position/index.js



/* harmony default export */ var cursor_position = __webpack_exports__["b"] = (reducers);

/***/ }),

/***/ "LSYO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ operations_namespaceObject; });

// UNUSED EXPORTS: celebrityCategoriesEndpoints

// NAMESPACE OBJECT: ./react-app/src/state/ducks/celebrity-categories/operations.js
var operations_namespaceObject = {};
__webpack_require__.r(operations_namespaceObject);
__webpack_require__.d(operations_namespaceObject, "list", function() { return list; });

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-categories/types.js
// CELEBRITY_CATEGORIES
const FETCH_CELEBRITY_CATEGORIES_REQUEST = "celebrity-categories/FETCH_CELEBRITY_CATEGORIES_REQUEST";
const FETCH_CELEBRITY_CATEGORIES_REQUEST_SUCCESS = "celebrity-categories/FETCH_CELEBRITY_CATEGORIES_REQUEST_SUCCESS";
const FETCH_CELEBRITY_CATEGORIES_REQUEST_FAILURE = "celebrity-categories/FETCH_CELEBRITY_CATEGORIES_REQUEST_FAILURE";
const FETCH_CELEBRITY_CATEGORIES_REQUEST_COMPLETED = "celebrity-categories/FETCH_CELEBRITY_CATEGORIES_REQUEST_COMPLETED";
// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-categories/reducers.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const fetchCelebrityCategoriesInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    results: [],
    informationPage: {}
  }
};
function fetchCelebrityCategoriesReducer(state = fetchCelebrityCategoriesInitialState, action) {
  switch (action.type) {
    case FETCH_CELEBRITY_CATEGORIES_REQUEST:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case FETCH_CELEBRITY_CATEGORIES_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, fetchCelebrityCategoriesInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case FETCH_CELEBRITY_CATEGORIES_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, fetchCelebrityCategoriesInitialState), {}, {
        data: action.payload.data
      });

    case FETCH_CELEBRITY_CATEGORIES_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  fetchCelebrityCategoriesReducer
}));
// EXTERNAL MODULE: ./react-app/src/state/utils/apiService.js
var apiService = __webpack_require__("XruL");

// EXTERNAL MODULE: ./react-app/src/state/utils/index.js + 2 modules
var utils = __webpack_require__("7Nk7");

// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-categories/paths.js
const MODEL = `celebrity-categories`;
const PUBLIC_LIST = `custom-endpoints/${MODEL}/public-list`;
const PUBLIC_GET = `custom-endpoints/${MODEL}/public-get/`;
// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-categories/actions.js




const listAsync = async params => {
  const FINAL_PATH = PUBLIC_LIST;
  return Object(apiService["a" /* default */])({
    method: "GET",
    path: FINAL_PATH,
    async: true,
    params: params,
    body: null
  });
};
const getAsync = async id => {
  const FINAL_PATH = PUBLIC_GET + id;
  return Object(apiService["a" /* default */])({
    method: "GET",
    path: FINAL_PATH,
    async: true,
    body: null
  });
};
const list = params => {
  return dispatch => {
    const TYPE = FETCH_CELEBRITY_CATEGORIES_REQUEST;
    dispatch({
      type: TYPE,
      payload: {}
    });
    listAsync(params).then(res => {
      if (res.data.status === "OK") {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, TYPE, res); // Other actions

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      } else {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, TYPE, res); // Other actions
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, TYPE, err);
    });
  };
};
// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-categories/operations.js


// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-categories/index.js




/* harmony default export */ var celebrity_categories = __webpack_exports__["b"] = (reducers);

/***/ }),

/***/ "LeEe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

/**
 * For rendering a component conditionally.
 * Its purpose is to provide a useful monad around data which may or may not exist at runtime.
 *
 * More info coming soon...
 */
const Maybe = ({
  it,
  children,
  orElse = null
}) => __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, it ? children : orElse);

/* harmony default export */ __webpack_exports__["a"] = (Maybe);

/***/ }),

/***/ "Nh2W":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.markAssetError = markAssetError;
exports.isAssetError = isAssetError;
exports.getClientBuildManifest = getClientBuildManifest;
exports.default = void 0;

var _getAssetPathFromRoute = _interopRequireDefault(__webpack_require__("UhrY"));

var _requestIdleCallback = __webpack_require__("0G5g"); // 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.


const MS_MAX_IDLE_DELAY = 3800;

function withFuture(key, map, generator) {
  let entry = map.get(key);

  if (entry) {
    if ('future' in entry) {
      return entry.future;
    }

    return Promise.resolve(entry);
  }

  let resolver;
  const prom = new Promise(resolve => {
    resolver = resolve;
  });
  map.set(key, entry = {
    resolve: resolver,
    future: prom
  });
  return generator ? // eslint-disable-next-line no-sequences
  generator().then(value => (resolver(value), value)) : prom;
}

function hasPrefetch(link) {
  try {
    link = document.createElement('link');
    return (// detect IE11 since it supports prefetch but isn't detected
      // with relList.support
      !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports('prefetch')
    );
  } catch (_unused) {
    return false;
  }
}

const canPrefetch = hasPrefetch();

function prefetchViaDom(href, as, link) {
  return new Promise((res, rej) => {
    if (document.querySelector(`link[rel="prefetch"][href^="${href}"]`)) {
      return res();
    }

    link = document.createElement('link'); // The order of property assignment here is intentional:

    if (as) link.as = as;
    link.rel = `prefetch`;
    link.crossOrigin = undefined;
    link.onload = res;
    link.onerror = rej; // `href` should always be last:

    link.href = href;
    document.head.appendChild(link);
  });
}

const ASSET_LOAD_ERROR = Symbol('ASSET_LOAD_ERROR'); // TODO: unexport

function markAssetError(err) {
  return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}

function isAssetError(err) {
  return err && ASSET_LOAD_ERROR in err;
}

function appendScript(src, script) {
  return new Promise((resolve, reject) => {
    script = document.createElement('script'); // The order of property assignment here is intentional.
    // 1. Setup success/failure hooks in case the browser synchronously
    //    executes when `src` is set.

    script.onload = resolve;

    script.onerror = () => reject(markAssetError(new Error(`Failed to load script: ${src}`))); // 2. Configure the cross-origin attribute before setting `src` in case the
    //    browser begins to fetch.


    script.crossOrigin = undefined; // 3. Finally, set the source and inject into the DOM in case the child
    //    must be appended for fetching to start.

    script.src = src;
    document.body.appendChild(script);
  });
}

function idleTimeout(ms, err) {
  return new Promise((_resolve, reject) => (0, _requestIdleCallback.requestIdleCallback)(() => setTimeout(() => reject(err), ms)));
} // TODO: stop exporting or cache the failure
// It'd be best to stop exporting this. It's an implementation detail. We're
// only exporting it for backwards compatibilty with the `page-loader`.
// Only cache this response as a last resort if we cannot eliminate all other
// code branches that use the Build Manifest Callback and push them through
// the Route Loader interface.


function getClientBuildManifest() {
  if (self.__BUILD_MANIFEST) {
    return Promise.resolve(self.__BUILD_MANIFEST);
  }

  const onBuildManifest = new Promise(resolve => {
    // Mandatory because this is not concurrent safe:
    const cb = self.__BUILD_MANIFEST_CB;

    self.__BUILD_MANIFEST_CB = () => {
      resolve(self.__BUILD_MANIFEST);
      cb && cb();
    };
  });
  return Promise.race([onBuildManifest, idleTimeout(MS_MAX_IDLE_DELAY, markAssetError(new Error('Failed to load client build manifest')))]);
}

function getFilesForRoute(assetPrefix, route) {
  if (false) {}

  return getClientBuildManifest().then(manifest => {
    if (!(route in manifest)) {
      throw markAssetError(new Error(`Failed to lookup route: ${route}`));
    }

    const allFiles = manifest[route].map(entry => assetPrefix + '/_next/' + encodeURI(entry));
    return {
      scripts: allFiles.filter(v => v.endsWith('.js')),
      css: allFiles.filter(v => v.endsWith('.css'))
    };
  });
}

function createRouteLoader(assetPrefix) {
  const entrypoints = new Map();
  const loadedScripts = new Map();
  const styleSheets = new Map();
  const routes = new Map();

  function maybeExecuteScript(src) {
    let prom = loadedScripts.get(src);

    if (prom) {
      return prom;
    } // Skip executing script if it's already in the DOM:


    if (document.querySelector(`script[src^="${src}"]`)) {
      return Promise.resolve();
    }

    loadedScripts.set(src, prom = appendScript(src));
    return prom;
  }

  function fetchStyleSheet(href) {
    let prom = styleSheets.get(href);

    if (prom) {
      return prom;
    }

    styleSheets.set(href, prom = fetch(href).then(res => {
      if (!res.ok) {
        throw new Error(`Failed to load stylesheet: ${href}`);
      }

      return res.text().then(text => ({
        href: href,
        content: text
      }));
    }).catch(err => {
      throw markAssetError(err);
    }));
    return prom;
  }

  return {
    whenEntrypoint(route) {
      return withFuture(route, entrypoints);
    },

    onEntrypoint(route, execute) {
      Promise.resolve(execute).then(fn => fn()).then(exports => ({
        component: exports && exports.default || exports,
        exports: exports
      }), err => ({
        error: err
      })).then(input => {
        const old = entrypoints.get(route);
        entrypoints.set(route, input);
        if (old && 'resolve' in old) old.resolve(input);
      });
    },

    loadRoute(route) {
      return withFuture(route, routes, async () => {
        try {
          const {
            scripts,
            css
          } = await getFilesForRoute(assetPrefix, route);
          const [, styles] = await Promise.all([entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)), Promise.all(css.map(fetchStyleSheet))]);
          const entrypoint = await Promise.race([this.whenEntrypoint(route), idleTimeout(MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`)))]);
          const res = Object.assign({
            styles
          }, entrypoint);
          return 'error' in entrypoint ? entrypoint : res;
        } catch (err) {
          return {
            error: err
          };
        }
      });
    },

    prefetch(route) {
      // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
      // License: Apache 2.0
      let cn;

      if (cn = navigator.connection) {
        // Don't prefetch if using 2G or if Save-Data is enabled.
        if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
      }

      return getFilesForRoute(assetPrefix, route).then(output => Promise.all(canPrefetch ? output.scripts.map(script => prefetchViaDom(script, 'script')) : [])).then(() => {
        (0, _requestIdleCallback.requestIdleCallback)(() => this.loadRoute(route));
      }).catch( // swallow prefetch errors
      () => {});
    }

  };
}

var _default = createRouteLoader;
exports.default = _default;

/***/ }),

/***/ "NiAU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FETCH_CELEBRITY_SECTIONS; });
const CELEBRITY_SECTIONS_MODEL = "celebrity-sections";
const FETCH_CELEBRITY_SECTIONS = `custom-endpoints/${CELEBRITY_SECTIONS_MODEL}/public-list`;

/***/ }),

/***/ "Nox7":
/***/ (function(module, exports) {

module.exports = require("react-headroom");

/***/ }),

/***/ "NsVv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const isBrowser = () => false;

/* harmony default export */ __webpack_exports__["a"] = (isBrowser);

/***/ }),

/***/ "O5Gr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoCardLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_app_src_components_common_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("68Dr");
/* harmony import */ var _celebrity_favorite_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("TosQ");
/* harmony import */ var _state_utils_gtm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("HkHs");
/* harmony import */ var _utils_useVideoPlayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("zQG+");
/* harmony import */ var _utils_useLoad__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("au9z");
/* harmony import */ var _routing_Paths__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("c5JF");
/* harmony import */ var react_app_src_components_common_helpers_optimized_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("wOzx");
/* harmony import */ var react_app_src_components_common_helpers_maybe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("LeEe");
/* harmony import */ var react_app_src_utils_getWindow__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("V08N");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;











const VideoCardLayout = ({
  celebrityId,
  celebrityAvatar,
  celebrityUsername,
  celebrityFullName,
  videoOccasion,
  videoUrl,
  videoPosterUrl,
  videoKey,
  footerSection
}) => {
  const [videoIsLoaded, onVideoLoadedData] = Object(_utils_useLoad__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])();
  const {
    videoRef,
    videoIsPlaying,
    togglePlay
  } = Object(_utils_useVideoPlayer__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(videoKey, {
    onPlayVideo() {
      _state_utils_gtm__WEBPACK_IMPORTED_MODULE_3__[/* tagManagerDataLayer */ "b"]("PLAY_VIDEO_CARD", analyticsData);
    },

    onPauseVideo() {
      _state_utils_gtm__WEBPACK_IMPORTED_MODULE_3__[/* tagManagerDataLayer */ "b"]("PAUSE_VIDEO_CARD", analyticsData);
    }

  });
  const analyticsData = {
    widget: "VideoCardLayout",
    path: Object(react_app_src_utils_getWindow__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])().location.pathname,
    celebrityId,
    celebrityUsername,
    celebrityFullName,
    videoOccasion,
    videoUrl,
    videoPosterUrl,
    videoKey
  };

  const registerVideoCardHover = () => _state_utils_gtm__WEBPACK_IMPORTED_MODULE_3__[/* tagManagerDataLayer */ "b"]("HOVER_VIDEO_CARD", analyticsData);

  const registerCelebrityUsernameClick = () => _state_utils_gtm__WEBPACK_IMPORTED_MODULE_3__[/* tagManagerDataLayer */ "b"]("CLICK_VIDEO_CARD_CELEBRITY_NAME", analyticsData);

  const registerCelebrityUsernameHover = () => _state_utils_gtm__WEBPACK_IMPORTED_MODULE_3__[/* tagManagerDataLayer */ "b"]("HOVER_VIDEO_CARD_CELEBRITY_NAME", analyticsData);

  return __jsx("div", {
    className: "VideoCardLayout",
    onMouseOver: registerVideoCardHover
  }, __jsx("div", {
    className: "video-card"
  }, __jsx("section", {
    className: "video-card__media",
    onClick: togglePlay
  }, __jsx(react_app_src_components_common_helpers_maybe__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    it: !videoIsLoaded
  }, __jsx(react_app_src_components_common_helpers_optimized_image__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    src: videoPosterUrl,
    placeholderSrc: "/assets/img/avatar-blank.png",
    width: 258,
    height: 344,
    objectFit: "cover"
  })), __jsx("video", {
    className: "video-card__video",
    src: videoUrl,
    preload: "none",
    playsInline: true,
    onClick: togglePlay,
    onLoadedData: onVideoLoadedData,
    ref: videoRef
  })), __jsx("section", {
    className: "video-card__overlay"
  }, __jsx("header", {
    className: "d-flex justify-content-between align-items-center"
  }, __jsx("i", {
    className: `fa fa-2x text-white fa-${videoIsPlaying ? "pause" : "play"} ml-2 mt-2`,
    onClick: togglePlay
  }), __jsx(react_app_src_components_common_helpers_maybe__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    it: videoOccasion
  }, __jsx("span", {
    className: "video-card__category d-flex align-items-center"
  }, videoOccasion))), __jsx("footer", {
    className: "d-flex align-items-center px-2 video-card__footer"
  }, __jsx(react_app_src_components_common_routing__WEBPACK_IMPORTED_MODULE_1__[/* NavLink */ "a"], {
    className: "d-flex align-items-center video-card__celebrity-profile-link",
    to: _routing_Paths__WEBPACK_IMPORTED_MODULE_6__[/* CELEBRITY_PROFILE */ "e"].replace(":celebrity_username", celebrityUsername),
    onClick: registerCelebrityUsernameClick,
    onMouseOver: registerCelebrityUsernameHover
  }, __jsx(react_app_src_components_common_helpers_maybe__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    it: !footerSection,
    orElse: footerSection
  }, __jsx(react_app_src_components_common_helpers_optimized_image__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    width: 53.65,
    height: 53.65,
    className: "video-card__celebrity-photo",
    src: celebrityAvatar || "/assets/img/avatar-blank.png",
    alt: `Foto de Perfil de ${celebrityFullName || "famoso"}`,
    placeholderSrc: "/assets/img/avatar-blank.png"
  }), __jsx("h3", {
    className: "video-card__celebrity-full-name"
  }, celebrityFullName))), __jsx(_celebrity_favorite_button__WEBPACK_IMPORTED_MODULE_2__[/* CelebrityFavoriteButton */ "a"], {
    celebrityId: celebrityId,
    className: "ml-auto"
  })))));
};

VideoCardLayout.defaultProps = {
  celebrity: {},
  celebrityAvatar: null,
  videoOccasion: null,
  videoPosterUrl: null,
  linkPath: null
};


/***/ }),

/***/ "Osoz":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router-context.js");

/***/ }),

/***/ "Q4dm":
/***/ (function(module, exports) {

module.exports = require("lodash.debounce");

/***/ }),

/***/ "Qtd7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ operations_namespaceObject; });

// UNUSED EXPORTS: countriesEndpoints

// NAMESPACE OBJECT: ./react-app/src/state/ducks/countries/operations.js
var operations_namespaceObject = {};
__webpack_require__.r(operations_namespaceObject);
__webpack_require__.d(operations_namespaceObject, "list", function() { return list; });

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// CONCATENATED MODULE: ./react-app/src/state/ducks/countries/types.js
// COUNTRIES
const FETCH_COUNTRIES_REQUEST = "celebrity-categories/FETCH_COUNTRIES_REQUEST";
const FETCH_COUNTRIES_REQUEST_SUCCESS = "celebrity-categories/FETCH_COUNTRIES_REQUEST_SUCCESS";
const FETCH_COUNTRIES_REQUEST_FAILURE = "celebrity-categories/FETCH_COUNTRIES_REQUEST_FAILURE";
const FETCH_COUNTRIES_REQUEST_COMPLETED = "celebrity-categories/FETCH_COUNTRIES_REQUEST_COMPLETED"; // GET

const GET_REQUEST = "celebrity-categories/GET_REQUEST";
const GET_REQUEST_SUCCESS = "celebrity-categories/GET_REQUEST_SUCCESS";
const GET_REQUEST_FAILURE = "celebrity-categories/GET_REQUEST_FAILURE";
const GET_REQUEST_COMPLETED = "celebrity-categories/GET_REQUEST_COMPLETED";
// CONCATENATED MODULE: ./react-app/src/state/ducks/countries/reducers.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const countriesInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    results: [],
    informationPage: {}
  }
};
function countriesReducer(state = countriesInitialState, action) {
  switch (action.type) {
    case FETCH_COUNTRIES_REQUEST:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case FETCH_COUNTRIES_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, countriesInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case FETCH_COUNTRIES_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, countriesInitialState), {}, {
        data: action.payload.data
      });

    case FETCH_COUNTRIES_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  countriesReducer
}));
// EXTERNAL MODULE: ./react-app/src/state/utils/apiService.js
var apiService = __webpack_require__("XruL");

// EXTERNAL MODULE: ./react-app/src/state/utils/index.js + 2 modules
var utils = __webpack_require__("7Nk7");

// CONCATENATED MODULE: ./react-app/src/state/ducks/countries/paths.js
const MODEL = `countries`;
const PUBLIC_LIST = `custom-endpoints/${MODEL}/public-list`;
const PUBLIC_GET = `custom-endpoints/${MODEL}/public-get/`;
// CONCATENATED MODULE: ./react-app/src/state/ducks/countries/actions.js




const listAsync = async params => {
  const FINAL_PATH = PUBLIC_LIST;
  return Object(apiService["a" /* default */])({
    method: "GET",
    path: FINAL_PATH,
    async: true,
    params: params,
    body: null
  });
};
const getAsync = async id => {
  const FINAL_PATH = PUBLIC_GET + id;
  return Object(apiService["a" /* default */])({
    method: "GET",
    path: FINAL_PATH,
    async: true,
    body: null
  });
};
const list = params => {
  return dispatch => {
    const TYPE = FETCH_COUNTRIES_REQUEST;
    dispatch({
      type: TYPE,
      payload: {}
    });
    listAsync(params).then(res => {
      if (res.data.status === "OK") {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, TYPE, res); // Other actions

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      } else {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, TYPE, res); // Other actions
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, TYPE, err);
    });
  };
};
// CONCATENATED MODULE: ./react-app/src/state/ducks/countries/operations.js


// CONCATENATED MODULE: ./react-app/src/state/ducks/countries/index.js




/* harmony default export */ var countries = __webpack_exports__["b"] = (reducers);

/***/ }),

/***/ "RLh7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FETCH_USER_CELEBRITY_LIKES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADD_OR_REMOVE_LIKE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET; });
const CELEBRITY_LIKES_MODEL = "celebrity-likes";
const FETCH_USER_CELEBRITY_LIKES = `custom-endpoints/${CELEBRITY_LIKES_MODEL}/user-celebrity-likes`;
const ADD_OR_REMOVE_LIKE = `custom-endpoints/${CELEBRITY_LIKES_MODEL}/add-remove-celebrity-like/:celebrity_id`;
const FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET = `custom-endpoints/${CELEBRITY_LIKES_MODEL}/user-celebrity-likes-with-offset`;

/***/ }),

/***/ "SLhP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Q4dm");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _getWindow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("V08N");




const useGetViewportWidthOnResize = (updateTimeout = 500) => {
  const {
    0: windowWidth,
    1: setWindowWidth
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(Object(_getWindow__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])().innerWidth);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const updateSize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (!windowWidth) updateSize();
    const debouncedUpdateSize = lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(updateSize, updateTimeout);
    window.addEventListener("resize", debouncedUpdateSize);
    return () => {
      window.removeEventListener("resize", debouncedUpdateSize);
    };
  }, []);
  return windowWidth;
};

/* harmony default export */ __webpack_exports__["a"] = (useGetViewportWidthOnResize);

/***/ }),

/***/ "STYJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PROCESS_SUBSCRIPTION_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return PROCESS_SUBSCRIPTION_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return PROCESS_SUBSCRIPTION_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PROCESS_SUBSCRIPTION_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FETCH_USER_SUBSCRIPTIONS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FETCH_USER_SUBSCRIPTIONS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FETCH_USER_SUBSCRIPTIONS_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FETCH_USER_SUBSCRIPTIONS_COMPLETED; });
// SUBSCRIPTION
const PROCESS_SUBSCRIPTION_REQUEST = "user_subscriptions/PROCESS_SUBSCRIPTION_REQUEST";
const PROCESS_SUBSCRIPTION_REQUEST_SUCCESS = "user_subscriptions/PROCESS_SUBSCRIPTION_REQUEST_SUCCESS";
const PROCESS_SUBSCRIPTION_REQUEST_FAILURE = "user_subscriptions/PROCESS_SUBSCRIPTION_REQUEST_FAILURE";
const PROCESS_SUBSCRIPTION_REQUEST_COMPLETED = "user_subscriptions/PROCESS_SUBSCRIPTION_REQUEST_COMPLETED";
const FETCH_USER_SUBSCRIPTIONS_REQUEST = "user_subscriptions/FETCH_USER_SUBSCRIPTIONS";
const FETCH_USER_SUBSCRIPTIONS_SUCCESS = "user_subscriptions/FETCH_USER_SUBSCRIPTIONS_SUCCESS";
const FETCH_USER_SUBSCRIPTIONS_FAILURE = "user_subscriptions/FETCH_USER_SUBSCRIPTIONS_FAILURE";
const FETCH_USER_SUBSCRIPTIONS_COMPLETED = "user_subscriptions/FETCH_USER_SUBSCRIPTIONS_COMPLETED";

/***/ }),

/***/ "Sa7d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ operations_namespaceObject; });

// UNUSED EXPORTS: restCountriesEndpoints

// NAMESPACE OBJECT: ./react-app/src/state/ducks/rest-countries/operations.js
var operations_namespaceObject = {};
__webpack_require__.r(operations_namespaceObject);
__webpack_require__.d(operations_namespaceObject, "list", function() { return list; });

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// CONCATENATED MODULE: ./react-app/src/state/ducks/rest-countries/types.js
// COUNTRIES
const FETCH_COUNTRIES_REQUEST = "restCountries/FETCH_COUNTRIES_REQUEST";
const FETCH_COUNTRIES_REQUEST_SUCCESS = "restCountries/FETCH_COUNTRIES_REQUEST_SUCCESS";
const FETCH_COUNTRIES_REQUEST_FAILURE = "restCountries/FETCH_COUNTRIES_REQUEST_FAILURE";
const FETCH_COUNTRIES_REQUEST_COMPLETED = "restCountries/FETCH_COUNTRIES_REQUEST_COMPLETED";
// CONCATENATED MODULE: ./react-app/src/state/ducks/rest-countries/reducers.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const fetchCountriesInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: []
};
function fetchCountriesReducer(state = fetchCountriesInitialState, action) {
  switch (action.type) {
    case FETCH_COUNTRIES_REQUEST:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case FETCH_COUNTRIES_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, fetchCountriesInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case FETCH_COUNTRIES_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, fetchCountriesInitialState), {}, {
        data: action.payload.data
      });

    case FETCH_COUNTRIES_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  fetchCountriesReducer
}));
// EXTERNAL MODULE: ./react-app/src/state/utils/apiService.js
var apiService = __webpack_require__("XruL");

// EXTERNAL MODULE: ./react-app/src/state/utils/index.js + 2 modules
var utils = __webpack_require__("7Nk7");

// CONCATENATED MODULE: ./react-app/src/state/ducks/rest-countries/paths.js
const BASE_PATH = "https://restcountries.eu/rest/v2/all?fields=callingCodes;flag;name;alpha2Code;alpha3Code";
// CONCATENATED MODULE: ./react-app/src/state/ducks/rest-countries/actions.js




const list = params => {
  return dispatch => {
    const TYPE = FETCH_COUNTRIES_REQUEST;
    const FINAL_PATH = BASE_PATH;
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: params,
      body: null,
      custom_endpoint: true
    }).then(res => {
      if (res.status === 200) {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, TYPE, res); // Other actions

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      } else {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, TYPE, res); // Other actions
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, TYPE, err);
    });
  };
};
// CONCATENATED MODULE: ./react-app/src/state/ducks/rest-countries/operations.js


// CONCATENATED MODULE: ./react-app/src/state/ducks/rest-countries/index.js




/* harmony default export */ var rest_countries = __webpack_exports__["a"] = (reducers);

/***/ }),

/***/ "SgIJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return SAVE_CLIENT_CONTRACT_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return SAVE_CLIENT_CONTRACT_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return SAVE_CLIENT_CONTRACT_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return SAVE_CLIENT_CONTRACT_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return LIST_CLIENT_CONTRACTS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return LIST_CLIENT_CONTRACTS_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return LIST_CLIENT_CONTRACTS_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return LIST_CLIENT_CONTRACTS_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return GET_CONTRACT_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return GET_CONTRACT_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return GET_CONTRACT_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return GET_CONTRACT_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return GET_CONTRACT_WITH_PAYMENTS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return GET_CONTRACT_WITH_PAYMENTS_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return GET_CONTRACT_WITH_PAYMENTS_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return GET_CONTRACT_WITH_PAYMENTS_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return LIST_CONTRACT_COMMENTS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return LIST_CONTRACT_COMMENTS_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return LIST_CONTRACT_COMMENTS_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return LIST_CONTRACT_COMMENTS_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADD_CONTRACT_COMMENTS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ADD_CONTRACT_COMMENTS_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ADD_CONTRACT_COMMENTS_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ADD_CONTRACT_COMMENTS_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return SAVE_CONTRACT_TO_PAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return UPDATE_CONTRACT_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return UPDATE_CONTRACT_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return UPDATE_CONTRACT_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return UPDATE_CONTRACT_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return SAVE_CONTRACT_TO_PAY_CLEAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return FETCH_SIMILAR_CONTRACTS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return FETCH_SIMILAR_CONTRACTS_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return FETCH_SIMILAR_CONTRACTS_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return FETCH_SIMILAR_CONTRACTS_REQUEST_COMPLETED; });
// SAVE CLIENT CONTRACT
const SAVE_CLIENT_CONTRACT_REQUEST = "contracts/SAVE_CLIENT_CONTRACT_REQUEST";
const SAVE_CLIENT_CONTRACT_REQUEST_SUCCESS = "contracts/SAVE_CLIENT_CONTRACT_REQUEST_SUCCESS";
const SAVE_CLIENT_CONTRACT_REQUEST_FAILURE = "contracts/SAVE_CLIENT_CONTRACT_REQUEST_FAILURE";
const SAVE_CLIENT_CONTRACT_REQUEST_COMPLETED = "contracts/SAVE_CLIENT_CONTRACT_REQUEST_COMPLETED"; // LIST CLIENT CONTRACTS

const LIST_CLIENT_CONTRACTS_REQUEST = "contracts/LIST_CLIENT_CONTRACTS_REQUEST";
const LIST_CLIENT_CONTRACTS_REQUEST_SUCCESS = "contracts/LIST_CLIENT_CONTRACTS_REQUEST_SUCCESS";
const LIST_CLIENT_CONTRACTS_REQUEST_FAILURE = "contracts/LIST_CLIENT_CONTRACTS_REQUEST_FAILURE";
const LIST_CLIENT_CONTRACTS_REQUEST_COMPLETED = "contracts/LIST_CLIENT_CONTRACTS_REQUEST_COMPLETED"; // GET CONTRACT

const GET_CONTRACT_REQUEST = "contracts/GET_CONTRACT_REQUEST";
const GET_CONTRACT_REQUEST_SUCCESS = "contracts/GET_CONTRACT_REQUEST_SUCCESS";
const GET_CONTRACT_REQUEST_FAILURE = "contracts/GET_CONTRACT_REQUEST_FAILURE";
const GET_CONTRACT_REQUEST_COMPLETED = "contracts/GET_CONTRACT_REQUEST_COMPLETED"; // GET CONTRACT

const GET_CONTRACT_WITH_PAYMENTS_REQUEST = "contracts/GET_CONTRACT_WITH_PAYMENTS_REQUEST";
const GET_CONTRACT_WITH_PAYMENTS_REQUEST_SUCCESS = "contracts/GET_CONTRACT_WITH_PAYMENTS_REQUEST_SUCCESS";
const GET_CONTRACT_WITH_PAYMENTS_REQUEST_FAILURE = "contracts/GET_CONTRACT_WITH_PAYMENTS_REQUEST_FAILURE";
const GET_CONTRACT_WITH_PAYMENTS_REQUEST_COMPLETED = "contracts/GET_CONTRACT_WITH_PAYMENTS_REQUEST_COMPLETED"; // LIST_CONTRACT_COMMENTS

const LIST_CONTRACT_COMMENTS_REQUEST = "contracts/LIST_CONTRACT_COMMENTS_REQUEST";
const LIST_CONTRACT_COMMENTS_REQUEST_SUCCESS = "contracts/LIST_CONTRACT_COMMENTS_REQUEST_SUCCESS";
const LIST_CONTRACT_COMMENTS_REQUEST_FAILURE = "contracts/LIST_CONTRACT_COMMENTS_REQUEST_FAILURE";
const LIST_CONTRACT_COMMENTS_REQUEST_COMPLETED = "contracts/LIST_CONTRACT_COMMENTS_REQUEST_COMPLETED"; // ADD_CONTRACT_COMMENTS

const ADD_CONTRACT_COMMENTS_REQUEST = "contracts/ADD_CONTRACT_COMMENTS_REQUEST";
const ADD_CONTRACT_COMMENTS_REQUEST_SUCCESS = "contracts/ADD_CONTRACT_COMMENTS_REQUEST_SUCCESS";
const ADD_CONTRACT_COMMENTS_REQUEST_FAILURE = "contracts/ADD_CONTRACT_COMMENTS_REQUEST_FAILURE";
const ADD_CONTRACT_COMMENTS_REQUEST_COMPLETED = "contracts/ADD_CONTRACT_COMMENTS_REQUEST_COMPLETED"; // SAVE CONTRACT TO PAY

const SAVE_CONTRACT_TO_PAY = "SAVE_CONTRACT_TO_PAY";
const UPDATE_CONTRACT_REQUEST = "contracts/UPDATE_CONTRACT_REQUEST";
const UPDATE_CONTRACT_REQUEST_SUCCESS = "contracts/UPDATE_CONTRACT_REQUEST_SUCCESS";
const UPDATE_CONTRACT_REQUEST_FAILURE = "contracts/UPDATE_CONTRACT_REQUEST_FAILURE";
const UPDATE_CONTRACT_REQUEST_COMPLETED = "contracts/UPDATE_CONTRACT_REQUEST_COMPLETED";
const SAVE_CONTRACT_TO_PAY_CLEAR = "SAVE_CONTRACT_TO_PAY_CLEAR";
const FETCH_SIMILAR_CONTRACTS_REQUEST = "contracts/FETCH_SIMILAR_CONTRACTS_REQUEST";
const FETCH_SIMILAR_CONTRACTS_REQUEST_SUCCESS = "contracts/FETCH_SIMILAR_CONTRACTS_REQUEST_SUCCESS";
const FETCH_SIMILAR_CONTRACTS_REQUEST_FAILURE = "contracts/FETCH_SIMILAR_CONTRACTS_REQUEST_FAILURE";
const FETCH_SIMILAR_CONTRACTS_REQUEST_COMPLETED = "contracts/FETCH_SIMILAR_CONTRACTS_REQUEST_COMPLETED";

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

/***/ "TqRt":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "UHdw":
/***/ (function(module, exports) {

module.exports = require("mixpanel-browser");

/***/ }),

/***/ "UIGK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return updateQueryParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return playVideo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getContract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getContractWithPayments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssociateContract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return listTrending; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return saveClientContract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return updateClientContract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return listClientContracts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return listContractComments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addContractComment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getContractLikesData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getContractCommentsData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return addOrRemoveContractLike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return saveClientContractReview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return saveContractToPay; });
/* unused harmony export updateContract */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return saveContractToPayClear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return updateContractIsPublic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return fetchSimilarContracts; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("SgIJ");
/* harmony import */ var _utils_apiService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("XruL");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7Nk7");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("8VMp");
/* harmony import */ var _routing_Paths__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("c5JF");
/* harmony import */ var _routing_History__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("u3u/");
/* harmony import */ var _celebrities_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("5dN8");
/* harmony import */ var _utils_session__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("hVVe");








const updateQueryParams = (params, applyFetch = true) => {
  return dispatch => {
    dispatch({
      type: _celebrities_types__WEBPACK_IMPORTED_MODULE_6__[/* UPDATE_QUERY_PARAMS */ "O"],
      payload: {
        params
      }
    });

    if (applyFetch) {
      dispatch(listTrending(params));
    }
  };
};
const playVideo = params => {
  return dispatch => {
    dispatch({
      type: _celebrities_types__WEBPACK_IMPORTED_MODULE_6__[/* PLAY_VIDEO */ "L"],
      payload: {
        params
      }
    });
  };
};
const getContract = contractReference => {
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* GET_CONTRACT_REQUEST */ "i"];
    const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* GET_CONTRACT_BY_REFERENCE */ "e"] + contractReference;
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null
    }).then(res => {
      if ("status" in res.data && res.data.status === "ERROR") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res); // history._pushRoute(ROUTING_PATHS.HOME_PATH);
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res);
        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      }
    }).catch(err => {
      // history._pushRoute(ROUTING_PATHS.HOME_PATH);
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
    });
  };
};
const getContractWithPayments = contractReference => {
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* GET_CONTRACT_WITH_PAYMENTS_REQUEST */ "m"];
    const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* GET_CONTRACT_WITH_PAYMENTS */ "i"] + contractReference;
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null
    }).then(res => {
      if ("status" in res.data && res.data.status === "ERROR") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res);

        _routing_History__WEBPACK_IMPORTED_MODULE_5__[/* history */ "a"]._pushRoute(_routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* HOME_PATH */ "t"]);
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res);
        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      }
    }).catch(err => {
      console.log(err);
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);

      _routing_History__WEBPACK_IMPORTED_MODULE_5__[/* history */ "a"]._pushRoute(_routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* HOME_PATH */ "t"]);
    });
  };
};
const AssociateContract = hash => {
  return dispatch => {
    const FINAL_PATH = "AssociateContract" + "associate-contract/" + hash + "/";
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: null,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null
    }).then(res => {
      if ("status" in res.data && res.data.status === "ERROR") {
        // Other actions
        localStorage.removeItem("redirectTo");
        localStorage.removeItem("hash");

        _routing_History__WEBPACK_IMPORTED_MODULE_5__[/* history */ "a"]._pushRoute(_routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* HOME_PATH */ "t"]);
      } else {
        // Other actions
        localStorage.removeItem("redirectTo");
        localStorage.removeItem("hash");
      }
    }).catch(err => {
      _routing_History__WEBPACK_IMPORTED_MODULE_5__[/* history */ "a"]._pushRoute(_routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* HOME_PATH */ "t"]);
    });
  };
};
const listTrending = params => {
  return dispatch => {
    const TYPE = _celebrities_types__WEBPACK_IMPORTED_MODULE_6__[/* FETCH_TRENDING_CONTRACTS_REQUEST */ "D"];
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: TYPE,
      path: _paths__WEBPACK_IMPORTED_MODULE_3__[/* TRENDING_CONTRACTS */ "l"],
      params: params
    }).then(res => {
      if (res.data.status === "OK") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res); // Other actions

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res); // Other actions
      }
    }).catch(err => {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
    });
  };
};
const saveClientContract = contractData => {
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* SAVE_CLIENT_CONTRACT_REQUEST */ "y"];
    const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* CREATE_CONTRACT */ "d"];
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "POST",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: contractData
    }).then(res => {
      if ("status" in res.data && res.data.status === "ERROR") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res); // Other actions
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res); // dispatch(getContract(res.data.contractReference));

        dispatch({
          type: _types__WEBPACK_IMPORTED_MODULE_0__[/* SAVE_CONTRACT_TO_PAY */ "C"],
          payload: res.data.data
        });
        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        }); // Other actions

        if (res.data.data.sessionToken) {
          const session = new _utils_session__WEBPACK_IMPORTED_MODULE_7__[/* Session */ "a"]();
          session.setSession(res.data.data.sessionToken);
          localStorage.setItem("finalRedirect", _routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* CLIENT_HIRINGS */ "k"]);
          localStorage.setItem("hash", res.data.data.contractHash);

          _routing_History__WEBPACK_IMPORTED_MODULE_5__[/* history */ "a"]._pushRoute(_routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* PAYMENT_METHODS */ "v"].replace(":contract_reference", res.data.data.reference));
        } else {
          _routing_History__WEBPACK_IMPORTED_MODULE_5__[/* history */ "a"]._pushRoute(_routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* PAYMENT_METHODS */ "v"].replace(":contract_reference", res.data.data.reference));
        }
      }
    }).catch(err => {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
    });
  };
}; // Update Client Contract Data

const updateClientContract = contractData => {
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* SAVE_CLIENT_CONTRACT_REQUEST */ "y"];
    const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* UPDATE_CONTRACT */ "m"];
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "PUT",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: contractData
    }).then(res => {
      if ("status" in res.data && res.data.status === "ERROR") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res); // Other actions
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res); // dispatch(getContract(res.data.contractReference));

        dispatch({
          type: _types__WEBPACK_IMPORTED_MODULE_0__[/* SAVE_CONTRACT_TO_PAY */ "C"],
          payload: res.data.data
        });
        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        }); // Other actions

        if (contractData.status === 10) {
          return _routing_History__WEBPACK_IMPORTED_MODULE_5__[/* history */ "a"].push(_routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* CLIENT_HIRINGS */ "k"]);
        }

        if (res.data.data.sessionToken) {
          const session = new _utils_session__WEBPACK_IMPORTED_MODULE_7__[/* Session */ "a"]();
          session.setSession(res.data.data.sessionToken);
          localStorage.setItem("finalRedirect", _routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* CLIENT_HIRINGS */ "k"]);
          localStorage.setItem("hash", res.data.data.contractHash);

          _routing_History__WEBPACK_IMPORTED_MODULE_5__[/* history */ "a"]._pushRoute(_routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* PAYMENT_METHODS */ "v"].replace(":contract_reference", res.data.data.reference));
        } else {
          _routing_History__WEBPACK_IMPORTED_MODULE_5__[/* history */ "a"]._pushRoute(_routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* PAYMENT_METHODS */ "v"].replace(":contract_reference", res.data.data.reference));
        }
      }
    }).catch(err => {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
    });
  };
};
const listClientContracts = () => {
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* LIST_CLIENT_CONTRACTS_REQUEST */ "q"];
    const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* ACCOUNT_CONTRACTS */ "a"];
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null
    }).then(res => {
      if ("status" in res.data && res.data.status === "ERROR") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res); // Other actions
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res); // Other actions

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      }
    }).catch(err => {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
    });
  };
};
const listContractComments = (contractReference, params) => {
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* LIST_CONTRACT_COMMENTS_REQUEST */ "u"];
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: TYPE,
      path: _paths__WEBPACK_IMPORTED_MODULE_3__[/* GET_CONTRACT_COMMENTS */ "f"] + contractReference,
      params: params
    }).then(res => {
      if ("status" in res.data && res.data.status === "ERROR") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res); // Other actions
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res); // Other actions

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      }
    }).catch(err => {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
    });
  };
};
const addContractComment = (contractReference, body) => {
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* ADD_CONTRACT_COMMENTS_REQUEST */ "a"];
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "POST",
      action: TYPE,
      path: _paths__WEBPACK_IMPORTED_MODULE_3__[/* ADD_CONTRACT_COMMENTS */ "b"] + contractReference,
      body: body
    }).then(res => {
      if ("status" in res.data && res.data.status === "ERROR") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res); // Other actions
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res); // Other actions

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      }
    }).catch(err => {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
    });
  };
};
const getContractLikesData = async contractReference => {
  const response = {
    markedByMe: false,
    count: 0
  };
  await Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    method: "GET",
    path: _paths__WEBPACK_IMPORTED_MODULE_3__[/* GET_CONTRACT_LIKES_DATA */ "h"] + contractReference,
    async: true
  }).then(res => {
    if (res.data.status === "OK") {
      response.markedByMe = res.data.data.markedByMe;
      response.count = res.data.data.count;
    }
  }).catch(err => console.log(err));
  return response;
};
const getContractCommentsData = async contractReference => {
  const response = {
    count: 0
  };
  await Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    method: "GET",
    path: _paths__WEBPACK_IMPORTED_MODULE_3__[/* GET_CONTRACT_COMMENTS_DATA */ "g"] + contractReference,
    async: true
  }).then(res => {
    if (res.data.status === "OK") {
      response.count = res.data.data.count;
    }
  }).catch(err => console.log(err));
  return response;
};
const addOrRemoveContractLike = async contractReference => {
  const response = {
    markedByMe: false,
    count: 0
  };
  await Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    method: "GET",
    path: _paths__WEBPACK_IMPORTED_MODULE_3__[/* ADD_OR_REMOVE_CONTRACT_LIKE */ "c"] + contractReference,
    async: true
  }).then(res => {
    if (res.data.status === "OK") {
      response.markedByMe = res.data.data.markedByMe;
      response.count = res.data.data.count;
    }
  }).catch(err => console.log(err));
  return response;
};
const saveClientContractReview = async (contractReference, reviewData) => {
  let response = {};
  await Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    method: "POST",
    path: _paths__WEBPACK_IMPORTED_MODULE_3__[/* SAVE_CONTRACT_REVIEW */ "j"] + contractReference,
    body: reviewData
  }).then(res => {
    response = res.data;
  }).catch(err => console.log(err));
  return response;
};
const saveContractToPay = contractToPay => {
  return dispatch => {
    dispatch({
      type: _types__WEBPACK_IMPORTED_MODULE_0__[/* SAVE_CONTRACT_TO_PAY */ "C"],
      payload: contractToPay
    });
  };
};
const updateContract = body => {
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* UPDATE_CONTRACT_REQUEST */ "E"];
    const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* UPDATE_CONTRACT */ "m"];
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "PUT",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body
    }).then(res => {
      if ("status" in res.data && res.data.status === "ERROR") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res);
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res); // Other actions

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      }
    }).catch(err => {
      _routing_History__WEBPACK_IMPORTED_MODULE_5__[/* history */ "a"]._pushRoute(_routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* HOME_PATH */ "t"]);

      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
    });
  };
};
const saveContractToPayClear = () => ({
  type: _types__WEBPACK_IMPORTED_MODULE_0__[/* SAVE_CONTRACT_TO_PAY_CLEAR */ "D"]
});
const updateContractIsPublic = async body => {
  const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* UPDATE_CONTRACT_IS_PUBLIC */ "n"];

  try {
    const response = await Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "PUT",
      path: FINAL_PATH,
      async: true,
      body
    });

    if (response.data.status !== "OK") {
      throw response.data;
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const fetchSimilarContracts = celebrityUsername => {
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* FETCH_SIMILAR_CONTRACTS_REQUEST */ "e"];
    const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* SIMILAR_CONTRACTS */ "k"] + celebrityUsername;
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null
    }).then(res => {
      if ("status" in res.data && res.data.status === "ERROR") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res);
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res);
        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      }
    }).catch(err => {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
    });
  };
};

/***/ }),

/***/ "UdXN":
/***/ (function(module, exports) {

module.exports = require("@auth0/auth0-react");

/***/ }),

/***/ "UhrY":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ "UiVg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ operations_namespaceObject; });

// NAMESPACE OBJECT: ./react-app/src/state/ducks/blog/operations.js
var operations_namespaceObject = {};
__webpack_require__.r(operations_namespaceObject);
__webpack_require__.d(operations_namespaceObject, "saveBlogData", function() { return saveBlogData; });
__webpack_require__.d(operations_namespaceObject, "getBlogData", function() { return getBlogData; });

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// CONCATENATED MODULE: ./react-app/src/state/ducks/blog/types.js
//BLOGS
const FETCH_BLOGS_REQUEST = "blogs/FETCH_BLOGS_REQUEST";
const FETCH_BLOGS_DATA = "blogs/FETCH_BLOGS_DATA";
const FETCH_BLOGS_DATA_SUCCESS = "blogs/FETCH_BLOGS_DATA_SUCCESS";
const FETCH_BLOGS_DATA_FAILURE = "blogs/FETCH_BLOG_DATA_FAILURE";
// CONCATENATED MODULE: ./react-app/src/state/ducks/blog/reducers.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const fetchBlogsPostMediumInitialState = {
  data: [],
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  }
};
function blogsPostMediumReducer(state = fetchBlogsPostMediumInitialState, action) {
  switch (action.type) {
    case FETCH_BLOGS_REQUEST:
      return _objectSpread(_objectSpread({}, fetchBlogsPostMediumInitialState), {}, {
        data: action.payload
      });

    case FETCH_BLOGS_DATA:
      return _objectSpread(_objectSpread({}, fetchBlogsPostMediumInitialState), {}, {
        loading: true
      });

    case FETCH_BLOGS_DATA_SUCCESS:
      return _objectSpread(_objectSpread({}, fetchBlogsPostMediumInitialState), {}, {
        completed: true,
        data: action.payload
      });

    case FETCH_BLOGS_DATA_FAILURE:
      return _objectSpread(_objectSpread({}, fetchBlogsPostMediumInitialState), {}, {
        error: action.payload
      });

    default:
      return state;
  }
}
/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  blogsPostMediumReducer
}));
// EXTERNAL MODULE: ./react-app/src/state/utils/apiService.js
var apiService = __webpack_require__("XruL");

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__("zr5I");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);

// CONCATENATED MODULE: ./react-app/src/state/utils/mediumApiService.js
function mediumApiService_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function mediumApiService_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { mediumApiService_ownKeys(Object(source), true).forEach(function (key) { mediumApiService_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { mediumApiService_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function mediumApiService_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


const BASE_URL = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@famosos&api_key=gwz20im2peo6p2vpmuo61welkwowi6jzltm2dhnq";
const getPost = async () => {
  try {
    const response = await external_axios_default.a.get(BASE_URL);
    response.data.items = response.data.items.filter(el => el.categories.length > 4);
    return response.data.items.map((_ref) => {
      let {
        description
      } = _ref,
          post = _objectWithoutProperties(_ref, ["description"]);

      const [, descriptionContent] = new RegExp("<p>(.*?)</p>").exec(description);
      return mediumApiService_objectSpread(mediumApiService_objectSpread({}, post), {}, {
        description: descriptionContent
      });
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};
// CONCATENATED MODULE: ./react-app/src/state/ducks/blog/actions.js



const saveBlogData = data => {
  return dispatch => {
    dispatch({
      type: FETCH_BLOGS_REQUEST,
      payload: data
    });
  };
};
const getBlogData = () => {
  return dispatch => {
    dispatch({
      type: FETCH_BLOGS_DATA,
      payload: {}
    });
    getPost().then(res => {
      dispatch({
        type: FETCH_BLOGS_DATA_SUCCESS,
        payload: res
      });
    }).catch(err => {
      dispatch({
        type: FETCH_BLOGS_DATA_FAILURE,
        payload: {
          err
        }
      });
    });
  };
};
// CONCATENATED MODULE: ./react-app/src/state/ducks/blog/operations.js


// CONCATENATED MODULE: ./react-app/src/state/ducks/blog/index.js



/* harmony default export */ var blog = __webpack_exports__["b"] = (reducers);

/***/ }),

/***/ "UlpK":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/head.js");

/***/ }),

/***/ "V08N":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _isBrowser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("NsVv");


function noop() {}

const getWindow = () => Object(_isBrowser__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])() ? window : {
  document: {
    cookie: ""
  },
  location: {
    pathname: "",
    userLocation: {
      countryCode: ""
    },
    sessionStorage: {
      setItem: noop,
      getItem: noop,
      removeItem: noop
    }
  },
  navigator: {
    userAgent: ""
  }
};

/* harmony default export */ __webpack_exports__["a"] = (getWindow);

/***/ }),

/***/ "Vcny":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ operations_namespaceObject; });

// UNUSED EXPORTS: subscriptionsEndpoints

// NAMESPACE OBJECT: ./react-app/src/state/ducks/subscriptions/operations.js
var operations_namespaceObject = {};
__webpack_require__.r(operations_namespaceObject);
__webpack_require__.d(operations_namespaceObject, "postProcessSubscription", function() { return actions["b" /* postProcessSubscription */]; });
__webpack_require__.d(operations_namespaceObject, "fetchUserSubscriptionsList", function() { return actions["a" /* fetchUserSubscriptionsList */]; });

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// EXTERNAL MODULE: ./react-app/src/state/ducks/subscriptions/types.js
var types = __webpack_require__("STYJ");

// CONCATENATED MODULE: ./react-app/src/state/ducks/subscriptions/reducers.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const processSubscriptionInitialState = {
  loading: false,
  failed: false,
  completed: false,
  data: [],
  error_data: {
    error: ""
  }
};
function processSubscriptionReducer(state = processSubscriptionInitialState, action) {
  switch (action.type) {
    case types["e" /* PROCESS_SUBSCRIPTION_REQUEST */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case types["g" /* PROCESS_SUBSCRIPTION_REQUEST_FAILURE */]:
      return _objectSpread(_objectSpread({}, processSubscriptionInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["h" /* PROCESS_SUBSCRIPTION_REQUEST_SUCCESS */]:
      return _objectSpread(_objectSpread({}, processSubscriptionInitialState), {}, {
        data: action.payload.data.results
      });

    case types["f" /* PROCESS_SUBSCRIPTION_REQUEST_COMPLETED */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        completed: true
      });

    default:
      return state;
  }
}
function fetchUserSubscriptionsListReducer(state = processSubscriptionInitialState, action) {
  switch (action.type) {
    case types["c" /* FETCH_USER_SUBSCRIPTIONS_REQUEST */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case types["b" /* FETCH_USER_SUBSCRIPTIONS_FAILURE */]:
      return _objectSpread(_objectSpread({}, processSubscriptionInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["d" /* FETCH_USER_SUBSCRIPTIONS_SUCCESS */]:
      return _objectSpread(_objectSpread({}, processSubscriptionInitialState), {}, {
        data: action.payload.data.results
      });

    case types["a" /* FETCH_USER_SUBSCRIPTIONS_COMPLETED */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data.results,
        completed: true
      });

    default:
      return state;
  }
}
/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  processSubscriptionReducer,
  fetchUserSubscriptionsListReducer
}));
// EXTERNAL MODULE: ./react-app/src/state/ducks/subscriptions/actions.js
var actions = __webpack_require__("8UX+");

// CONCATENATED MODULE: ./react-app/src/state/ducks/subscriptions/operations.js

// EXTERNAL MODULE: ./react-app/src/state/ducks/subscriptions/paths.js
var paths = __webpack_require__("qkmH");

// CONCATENATED MODULE: ./react-app/src/state/ducks/subscriptions/index.js




/* harmony default export */ var subscriptions = __webpack_exports__["a"] = (reducers);

/***/ }),

/***/ "W7oW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auth0_auth0_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("UdXN");
/* harmony import */ var _auth0_auth0_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_auth0_auth0_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _routing_Paths__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("c5JF");
/* harmony import */ var react_app_src_utils_isBrowser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("NsVv");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const LoginButton = props => {
  let isMobile;
  let locationOrigin;

  if (Object(react_app_src_utils_isBrowser__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])()) {
    isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    locationOrigin = window.location.origin + _routing_Paths__WEBPACK_IMPORTED_MODULE_2__[/* AUTH_SUCCESS */ "b"];
  }

  const {
    className,
    text,
    redirectUrl
  } = props;
  const {
    loginWithPopup,
    isLoading,
    isAuthenticated,
    loginWithRedirect
  } = Object(_auth0_auth0_react__WEBPACK_IMPORTED_MODULE_1__["useAuth0"])();

  const handlerClickToLogin = () => {
    if (isMobile) {
      loginWithRedirect({
        redirectUri: locationOrigin
      });
    } else {
      loginWithPopup();
    }
  };

  return __jsx("button", {
    className: `btn btn-outline-primary  ${className ? className : ""}`,
    onClick: () => handlerClickToLogin()
  }, text ? text : "Ingresar");
};

/* harmony default export */ __webpack_exports__["a"] = (LoginButton);

/***/ }),

/***/ "X24+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.removePathTrailingSlash = removePathTrailingSlash;
exports.normalizePathTrailingSlash = void 0;
/**
* Removes the trailing slash of a path if there is one. Preserves the root path `/`.
*/

function removePathTrailingSlash(path) {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}
/**
* Normalizes the trailing slash of a path according to the `trailingSlash` option
* in `next.config.js`.
*/


const normalizePathTrailingSlash =  false ? undefined : removePathTrailingSlash;
exports.normalizePathTrailingSlash = normalizePathTrailingSlash;

/***/ }),

/***/ "X2Lk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return FETCH_PAYMENT_GATEWAYS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return FETCH_PAYMENT_GATEWAYS_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return FETCH_PAYMENT_GATEWAYS_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return FETCH_PAYMENT_GATEWAYS_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return CURRENCY_EXCHANGE_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return CURRENCY_EXCHANGE_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return CURRENCY_EXCHANGE_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return CURRENCY_EXCHANGE_REQUEST_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return GET_CONTRACT_TO_PAY_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return GET_CONTRACT_TO_PAY_REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return GET_CONTRACT_TO_PAY_REQUEST_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return GET_CONTRACT_TO_PAY_REQUEST_COMPLETED; });
/* unused harmony export CREATE_DLOCAL_PAYMENT_REQUEST */
/* unused harmony export CREATE_DLOCAL_PAYMENT_REQUEST_SUCCESS */
/* unused harmony export CREATE_DLOCAL_PAYMENT_REQUEST_FAILURE */
/* unused harmony export CREATE_DLOCAL_PAYMENT_REQUEST_COMPLETED */
/* unused harmony export CREATE_STRIPE_PAYMENT_REQUEST */
/* unused harmony export CREATE_STRIPE_PAYMENT_REQUEST_SUCCESS */
/* unused harmony export CREATE_STRIPE_PAYMENT_REQUEST_FAILURE */
/* unused harmony export CREATE_STRIPE_PAYMENT_REQUEST_COMPLETED */
/* unused harmony export CREATE_PAYPAL_PAYMENT_REQUEST */
/* unused harmony export CREATE_PAYPAL_PAYMENT_REQUEST_SUCCESS */
/* unused harmony export CREATE_PAYPAL_PAYMENT_REQUEST_FAILURE */
/* unused harmony export CREATE_PAYPAL_PAYMENT_REQUEST_COMPLETED */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return APPLY_DISCOUNT_COUPON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return APPLY_DISCOUNT_COUPON_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return APPLY_DISCOUNT_COUPON_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return APLY_DISCOUNT_COUPON_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APLY_DISCOUNT_COUPON_CLEAR; });
// PAYMENT_GATEWAYS
const FETCH_PAYMENT_GATEWAYS_REQUEST = "paymentGateways/FETCH_PAYMENT_GATEWAYS_REQUEST";
const FETCH_PAYMENT_GATEWAYS_REQUEST_SUCCESS = "paymentGateways/FETCH_PAYMENT_GATEWAYS_REQUEST_SUCCESS";
const FETCH_PAYMENT_GATEWAYS_REQUEST_FAILURE = "paymentGateways/FETCH_PAYMENT_GATEWAYS_REQUEST_FAILURE";
const FETCH_PAYMENT_GATEWAYS_REQUEST_COMPLETED = "paymentGateways/FETCH_PAYMENT_GATEWAYS_REQUEST_COMPLETED"; // CURRENCY_EXCHANGE

const CURRENCY_EXCHANGE_REQUEST = "paymentGateways/CURRENCY_EXCHANGE_REQUEST";
const CURRENCY_EXCHANGE_REQUEST_SUCCESS = "paymentGateways/CURRENCY_EXCHANGE_REQUEST_SUCCESS";
const CURRENCY_EXCHANGE_REQUEST_FAILURE = "paymentGateways/CURRENCY_EXCHANGE_REQUEST_FAILURE";
const CURRENCY_EXCHANGE_REQUEST_COMPLETED = "paymentGateways/CURRENCY_EXCHANGE_REQUEST_COMPLETED"; // GET CONTRACT

const GET_CONTRACT_TO_PAY_REQUEST = "contracts/GET_CONTRACT_TO_PAY_REQUEST";
const GET_CONTRACT_TO_PAY_REQUEST_SUCCESS = "contracts/GET_CONTRACT_TO_PAY_REQUEST_SUCCESS";
const GET_CONTRACT_TO_PAY_REQUEST_FAILURE = "contracts/GET_CONTRACT_TO_PAY_REQUEST_FAILURE";
const GET_CONTRACT_TO_PAY_REQUEST_COMPLETED = "contracts/GET_CONTRACT_TO_PAY_REQUEST_COMPLETED"; // CREATE DLOCAL PAYMENT

const CREATE_DLOCAL_PAYMENT_REQUEST = "contracts/CREATE_DLOCAL_PAYMENT_REQUEST";
const CREATE_DLOCAL_PAYMENT_REQUEST_SUCCESS = "contracts/CREATE_DLOCAL_PAYMENT_REQUEST_SUCCESS";
const CREATE_DLOCAL_PAYMENT_REQUEST_FAILURE = "contracts/CREATE_DLOCAL_PAYMENT_REQUEST_FAILURE";
const CREATE_DLOCAL_PAYMENT_REQUEST_COMPLETED = "contracts/CREATE_DLOCAL_PAYMENT_REQUEST_COMPLETED"; // CREATE STRIPE PAYMENT

const CREATE_STRIPE_PAYMENT_REQUEST = "contracts/CREATE_STRIPE_PAYMENT_REQUEST";
const CREATE_STRIPE_PAYMENT_REQUEST_SUCCESS = "contracts/CREATE_STRIPE_PAYMENT_REQUEST_SUCCESS";
const CREATE_STRIPE_PAYMENT_REQUEST_FAILURE = "contracts/CREATE_STRIPE_PAYMENT_REQUEST_FAILURE";
const CREATE_STRIPE_PAYMENT_REQUEST_COMPLETED = "contracts/CREATE_STRIPE_PAYMENT_REQUEST_COMPLETED"; // CREATE PAYPAL PAYMENT

const CREATE_PAYPAL_PAYMENT_REQUEST = "contracts/CREATE_PAYPAL_PAYMENT_REQUEST";
const CREATE_PAYPAL_PAYMENT_REQUEST_SUCCESS = "contracts/CREATE_PAYPAL_PAYMENT_REQUEST_SUCCESS";
const CREATE_PAYPAL_PAYMENT_REQUEST_FAILURE = "contracts/CREATE_PAYPAL_PAYMENT_REQUEST_FAILURE";
const CREATE_PAYPAL_PAYMENT_REQUEST_COMPLETED = "contracts/CREATE_PAYPAL_PAYMENT_REQUEST_COMPLETED"; //DISCOUNT COUPON

const APPLY_DISCOUNT_COUPON = "user-payments/APPLY_DISCOUNT_COUPONS";
const APPLY_DISCOUNT_COUPON_SUCCESS = "user-payments/APPLY_DISCOUNT_COUPONS_SUCCESS";
const APPLY_DISCOUNT_COUPON_FAILURE = "user-payments/APPLY_DISCOUNT_COUPONS_FAILURE";
const APLY_DISCOUNT_COUPON_COMPLETED = "user-payments/APPLY_DISCOUNT_COUPONS_COMPLETED";
const APLY_DISCOUNT_COUPON_CLEAR = "user-payments/APLY_DISCOUNT_COUPON_CLEAR";

/***/ }),

/***/ "XruL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return jsonToQueryString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return queryStringToJSON; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("hVVe");



const setHeaders = (params = {}, addFamososAuthorizationHeader = true, cancelToken) => {
  const sessionToken = new _session__WEBPACK_IMPORTED_MODULE_1__[/* Session */ "a"]().getToken();
  let options = {};

  if (sessionToken && addFamososAuthorizationHeader) {
    options.headers = {
      authorization: "Bearer " + sessionToken
    };
  }

  if (params !== "?") {
    options.params = params;
  }

  if (cancelToken) {
    options.cancelToken = cancelToken;
  }

  return options;
};

const jsonToQueryString = json => {
  if (json) {
    return "?" + Object.keys(json).map(function (key) {
      return `${key}=${encodeURIComponent(json[key])}`;
    }).join("&");
  }

  return "";
};
const queryStringToJSON = query_string => {
  const pairs = query_string.slice(1).split("&");
  const result = {};
  pairs.forEach(function (pair) {
    pair = pair.split("=");
    result[pair[0]] = decodeURIComponent(pair[1] || "");
  });
  return JSON.parse(JSON.stringify(result));
};

const apiService = meta => {
  // Path is Required
  if (!meta.path) {
    throw new Error(`'path' not specified for async action ${meta.action}`);
  }

  let addFamososAuthorizationHeader = false; // Final URL

  let url = meta.path;

  if (!meta.custom_endpoint) {
    url = `${"https://backend-qa.famosos.com/"}${meta.path}`;
    addFamososAuthorizationHeader = true;
  }

  const source = meta.isCancellable ? axios__WEBPACK_IMPORTED_MODULE_0___default.a.CancelToken.source() : null;
  const configuration = setHeaders(meta.params, addFamososAuthorizationHeader, source === null || source === void 0 ? void 0 : source.token);
  let request = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create();

  switch (meta.method) {
    case "GET":
    default:
      request = axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url, configuration);
      break;

    case "POST":
      request = axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, meta.body, configuration);
      break;

    case "PUT":
      request = axios__WEBPACK_IMPORTED_MODULE_0___default.a.put(url, meta.body, configuration);
      break;

    case "DELETE":
      request = axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete(url, configuration);
      break;
  }

  if (source) request.cancel = source.cancel;
  return request;
};

/* harmony default export */ __webpack_exports__["a"] = (apiService);

/***/ }),

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


/***/ }),

/***/ "YTqd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteRegex = getRouteRegex; // this isn't importing the escape-string-regex module
// to reduce bytes

function escapeRegex(str) {
  return str.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

function parseParameter(param) {
  const optional = param.startsWith('[') && param.endsWith(']');

  if (optional) {
    param = param.slice(1, -1);
  }

  const repeat = param.startsWith('...');

  if (repeat) {
    param = param.slice(3);
  }

  return {
    key: param,
    repeat,
    optional
  };
}

function getRouteRegex(normalizedRoute) {
  const segments = (normalizedRoute.replace(/\/$/, '') || '/').slice(1).split('/');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = segments.map(segment => {
    if (segment.startsWith('[') && segment.endsWith(']')) {
      const {
        key,
        optional,
        repeat
      } = parseParameter(segment.slice(1, -1));
      groups[key] = {
        pos: groupIndex++,
        repeat,
        optional
      };
      return repeat ? optional ? '(?:/(.+?))?' : '/(.+?)' : '/([^/]+?)';
    } else {
      return `/${escapeRegex(segment)}`;
    }
  }).join(''); // dead code eliminate for browser since it's only needed
  // while generating routes-manifest

  if (true) {
    let routeKeyCharCode = 97;
    let routeKeyCharLength = 1; // builds a minimal routeKey using only a-z and minimal number of characters

    const getSafeRouteKey = () => {
      let routeKey = '';

      for (let i = 0; i < routeKeyCharLength; i++) {
        routeKey += String.fromCharCode(routeKeyCharCode);
        routeKeyCharCode++;

        if (routeKeyCharCode > 122) {
          routeKeyCharLength++;
          routeKeyCharCode = 97;
        }
      }

      return routeKey;
    };

    const routeKeys = {};
    let namedParameterizedRoute = segments.map(segment => {
      if (segment.startsWith('[') && segment.endsWith(']')) {
        const {
          key,
          optional,
          repeat
        } = parseParameter(segment.slice(1, -1)); // replace any non-word characters since they can break
        // the named regex

        let cleanedKey = key.replace(/\W/g, '');
        let invalidKey = false; // check if the key is still invalid and fallback to using a known
        // safe key

        if (cleanedKey.length === 0 || cleanedKey.length > 30) {
          invalidKey = true;
        }

        if (!isNaN(parseInt(cleanedKey.substr(0, 1)))) {
          invalidKey = true;
        }

        if (invalidKey) {
          cleanedKey = getSafeRouteKey();
        }

        routeKeys[cleanedKey] = key;
        return repeat ? optional ? `(?:/(?<${cleanedKey}>.+?))?` : `/(?<${cleanedKey}>.+?)` : `/(?<${cleanedKey}>[^/]+?)`;
      } else {
        return `/${escapeRegex(segment)}`;
      }
    }).join('');
    return {
      re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
      groups,
      routeKeys,
      namedRegex: `^${namedParameterizedRoute}(?:/)?$`
    };
  }

  return {
    re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
    groups
  };
}

/***/ }),

/***/ "ZSx1":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

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

/***/ "aCqb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return updateQueryParamsInitialState; });
/* unused harmony export queryParamsReducer */
/* unused harmony export fetchCelebritiesReducer */
/* unused harmony export fetchCelebritiesSimilarResultsReducer */
/* unused harmony export fetchSimilarCelebritiesReducer */
/* unused harmony export getCelebrityReducer */
/* unused harmony export fetchReviewsReducer */
/* unused harmony export fetchPublicContractsReducer */
/* unused harmony export previousPathReducer */
/* unused harmony export fetchFlashDeliveryCelebritiesReducer */
/* unused harmony export fetchCelebritySubscriptionPlansReducer */
/* unused harmony export celebrityProfileVersionReducer */
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("rKB8");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routing_Paths__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("c5JF");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("5dN8");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const updateQueryParamsInitialState = {
  offset: 0,
  limit: 20
};
const fetchCelebritiesInitialState = {
  requestCancel: null,
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    results: [],
    informationPage: {}
  }
};
const fetchCelebritiesSimilarResultsInitialState = {
  requestCancel: null,
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    results: [],
    informationPage: {}
  }
};
const fetchSimilarCelebritiesInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    results: [],
    informationPage: {}
  }
};
const getCelebrityInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    category: {},
    user: {},
    hashtags: []
  }
};
const fetchReviewsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    results: [],
    informationPage: {}
  }
};
const fetchPublicContractsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    results: [],
    informationPage: {}
  }
};
const fetchFlashDeliveryCelebritiesInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    usernames: []
  }
};
const fetchCelebritySubscriptionPlansInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    results: []
  }
};
const previousPathInitialState = {
  pathname: _routing_Paths__WEBPACK_IMPORTED_MODULE_1__[/* ROOT_PATH */ "x"]
};
const celebrityProfileVersionInitialState = null;
function queryParamsReducer(state = updateQueryParamsInitialState, action) {
  if (action.type === _types__WEBPACK_IMPORTED_MODULE_2__[/* UPDATE_QUERY_PARAMS */ "O"]) {
    return action.payload.params;
  } else {
    return state;
  }
}
function fetchCelebritiesReducer(state = fetchCelebritiesInitialState, action) {
  switch (action.type) {
    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_CELEBRITIES_REQUEST */ "b"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        requestCancel: action.payload.requestCancel,
        loading: true
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_CELEBRITIES_REQUEST_FAILURE */ "d"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        error_data: action.payload.data,
        failed: true,
        requestCancel: fetchCelebritiesInitialState.requestCancel
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_CELEBRITIES_REQUEST_SUCCESS */ "e"]:
      const results = [];
      if (action.payload.config.params.offset) results.push(...state.data.results);
      results.push(...action.payload.data.results);
      return _objectSpread(_objectSpread({}, fetchCelebritiesInitialState), {}, {
        data: _objectSpread(_objectSpread({}, action.payload.data), {}, {
          results
        })
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_CELEBRITIES_REQUEST_COMPLETED */ "c"]:
      return _objectSpread(_objectSpread({}, fetchCelebritiesInitialState), {}, {
        data: _objectSpread({}, state.data),
        completed: true
      });

    default:
      return state;
  }
}
function fetchCelebritiesSimilarResultsReducer(state = fetchCelebritiesSimilarResultsInitialState, action) {
  switch (action.type) {
    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST */ "f"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        requestCancel: action.payload.requestCancel,
        loading: true
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST_FAILURE */ "h"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        error_data: action.payload.data,
        failed: true,
        requestCancel: fetchCelebritiesSimilarResultsInitialState.requestCancel
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST_SUCCESS */ "i"]:
      const results = [];
      if (action.payload.config.params.offset) results.push(...state.data.results);
      results.push(...action.payload.data.results);
      return _objectSpread(_objectSpread({}, fetchCelebritiesSimilarResultsInitialState), {}, {
        data: _objectSpread(_objectSpread({}, action.payload.data), {}, {
          results
        })
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST_COMPLETED */ "g"]:
      return _objectSpread(_objectSpread({}, fetchCelebritiesSimilarResultsInitialState), {}, {
        data: _objectSpread({}, state.data),
        completed: true
      });

    default:
      return state;
  }
}
function fetchSimilarCelebritiesReducer(state = fetchSimilarCelebritiesInitialState, action) {
  switch (action.type) {
    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_SIMILAR_CELEBRITIES_REQUEST */ "z"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_SIMILAR_CELEBRITIES_REQUEST_FAILURE */ "B"]:
      return _objectSpread(_objectSpread({}, fetchSimilarCelebritiesInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_SIMILAR_CELEBRITIES_REQUEST_SUCCESS */ "C"]:
      return _objectSpread(_objectSpread({}, fetchSimilarCelebritiesInitialState), {}, {
        data: action.payload.data
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_SIMILAR_CELEBRITIES_REQUEST_COMPLETED */ "A"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        // data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
function getCelebrityReducer(state = getCelebrityInitialState, action) {
  switch (action.type) {
    case _types__WEBPACK_IMPORTED_MODULE_2__[/* GET_CELEBRITY_REQUEST */ "H"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* GET_CELEBRITY_REQUEST_FAILURE */ "J"]:
      return _objectSpread(_objectSpread({}, getCelebrityInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* GET_CELEBRITY_REQUEST_SUCCESS */ "K"]:
      return _objectSpread(_objectSpread({}, getCelebrityInitialState), {}, {
        data: action.payload.data.data
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* GET_CELEBRITY_REQUEST_COMPLETED */ "I"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data.data,
        completed: true
      });

    default:
      return state;
  }
}
function fetchReviewsReducer(state = fetchReviewsInitialState, action) {
  switch (action.type) {
    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_REVIEWS_REQUEST */ "v"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_REVIEWS_REQUEST_FAILURE */ "x"]:
      return _objectSpread(_objectSpread({}, fetchReviewsInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_REVIEWS_REQUEST_SUCCESS */ "y"]:
      return _objectSpread(_objectSpread({}, fetchReviewsInitialState), {}, {
        data: action.payload.data
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_REVIEWS_REQUEST_COMPLETED */ "w"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
function fetchPublicContractsReducer(state = fetchPublicContractsInitialState, action) {
  switch (action.type) {
    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_PUBLIC_CONTRACTS_REQUEST */ "r"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_PUBLIC_CONTRACTS_REQUEST_FAILURE */ "t"]:
      return _objectSpread(_objectSpread({}, fetchPublicContractsInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_PUBLIC_CONTRACTS_REQUEST_SUCCESS */ "u"]:
      return _objectSpread(_objectSpread({}, fetchPublicContractsInitialState), {}, {
        data: action.payload.data
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_PUBLIC_CONTRACTS_REQUEST_COMPLETED */ "s"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data,
        completed: true
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* CLEAN_PUBLIC_CONTRACTS */ "a"]:
      return fetchPublicContractsInitialState;

    default:
      return state;
  }
}
const previousPathReducer = (state = previousPathInitialState, action) => {
  if (action.type === _types__WEBPACK_IMPORTED_MODULE_2__[/* SET_PREVIOUS_PATH */ "N"]) return {
    pathname: action.payload
  };
  return state;
};
function fetchFlashDeliveryCelebritiesReducer(state = fetchFlashDeliveryCelebritiesInitialState, action) {
  var _action$payload;

  switch (action.type) {
    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST */ "n"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST_FAILURE */ "p"]:
      return _objectSpread(_objectSpread({}, fetchFlashDeliveryCelebritiesInitialState), {}, {
        error_data: action.payload,
        failed: true
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST_SUCCESS */ "q"]:
      return _objectSpread(_objectSpread({}, fetchFlashDeliveryCelebritiesInitialState), {}, {
        data: ((_action$payload = action.payload) === null || _action$payload === void 0 ? void 0 : _action$payload[0]) || fetchFlashDeliveryCelebritiesInitialState.data
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST_COMPLETED */ "o"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        completed: true
      });

    default:
      return state;
  }
}
function fetchCelebritySubscriptionPlansReducer(state = fetchCelebritySubscriptionPlansInitialState, action) {
  switch (action.type) {
    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST */ "j"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST_FAILURE */ "l"]:
      return _objectSpread(_objectSpread({}, fetchCelebritySubscriptionPlansInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST_SUCCESS */ "m"]:
      return _objectSpread(_objectSpread({}, fetchCelebritySubscriptionPlansInitialState), {}, {
        data: action.payload.data.results
      });

    case _types__WEBPACK_IMPORTED_MODULE_2__[/* FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST_COMPLETED */ "k"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data.results,
        completed: true
      });

    default:
      return state;
  }
}
const celebrityProfileVersionReducer = (state = celebrityProfileVersionInitialState, {
  type,
  payload
}) => type === _types__WEBPACK_IMPORTED_MODULE_2__[/* SET_CELEBRITY_PROFILE_VERSION */ "M"] ? payload : state;
/* harmony default export */ __webpack_exports__["a"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  queryParamsReducer,
  fetchCelebritiesReducer,
  fetchSimilarCelebritiesReducer,
  getCelebrityReducer,
  fetchReviewsReducer,
  fetchPublicContractsReducer,
  previousPathReducer,
  fetchFlashDeliveryCelebritiesReducer,
  fetchCelebritySubscriptionPlansReducer,
  fetchCelebritiesSimilarResultsReducer,
  celebrityProfileVersionReducer
}));

/***/ }),

/***/ "au9z":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const defaultItemRef = {
  current: {
    readyState: 0
  }
};
const LOADED = 4;

const useLoad = (itemRef = defaultItemRef, defaultIsLoaded = false) => {
  const {
    0: isLoaded,
    1: setIsLoaded
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(defaultIsLoaded);

  const onLoad = () => setIsLoaded(true);

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (itemRef.current.readyState !== LOADED) return;
    onLoad();
  }, [itemRef]);
  return [isLoaded, onLoad];
};

/* harmony default export */ __webpack_exports__["a"] = (useLoad);

/***/ }),

/***/ "bIS6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ operations_namespaceObject; });

// UNUSED EXPORTS: restCelebritiesEndpoints

// NAMESPACE OBJECT: ./react-app/src/state/ducks/rest-celebrities/operations.js
var operations_namespaceObject = {};
__webpack_require__.r(operations_namespaceObject);
__webpack_require__.d(operations_namespaceObject, "list", function() { return list; });

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// CONCATENATED MODULE: ./react-app/src/state/ducks/rest-celebrities/types.js
// CELEBRITIES
const FETCH_CELEBRITIES_REQUEST = "restCountries/FETCH_CELEBRITIES_REQUEST";
const FETCH_CELEBRITIES_REQUEST_SUCCESS = "restCountries/FETCH_CELEBRITIES_REQUEST_SUCCESS";
const FETCH_CELEBRITIES_REQUEST_FAILURE = "restCountries/FETCH_CELEBRITIES_REQUEST_FAILURE";
const FETCH_CELEBRITIES_REQUEST_COMPLETED = "restCountries/FETCH_CELEBRITIES_REQUEST_COMPLETED";
// CONCATENATED MODULE: ./react-app/src/state/ducks/rest-celebrities/reducers.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const fetchCelebritiesInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: []
};
function fetchCelebritiesReducer(state = fetchCelebritiesInitialState, action) {
  switch (action.type) {
    case FETCH_CELEBRITIES_REQUEST:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case FETCH_CELEBRITIES_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, fetchCelebritiesInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case FETCH_CELEBRITIES_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, fetchCelebritiesInitialState), {}, {
        data: action.payload.data
      });

    case FETCH_CELEBRITIES_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  fetchCelebritiesReducer
}));
// EXTERNAL MODULE: ./react-app/src/state/utils/apiService.js
var apiService = __webpack_require__("XruL");

// EXTERNAL MODULE: ./react-app/src/state/utils/index.js + 2 modules
var utils = __webpack_require__("7Nk7");

// CONCATENATED MODULE: ./react-app/src/state/ducks/rest-celebrities/paths.js
const BASE_PATH = "https://famosos-media.s3.amazonaws.com/JSON/celebrities.json";
// CONCATENATED MODULE: ./react-app/src/state/ducks/rest-celebrities/actions.js




const list = params => {
  return dispatch => {
    const TYPE = FETCH_CELEBRITIES_REQUEST;
    const FINAL_PATH = BASE_PATH;
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: params,
      body: null,
      custom_endpoint: true
    }).then(res => {
      if (res.status === 200) {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, TYPE, res); // Other actions

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      } else {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, TYPE, res); // Other actions
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, TYPE, err);
    });
  };
};
// CONCATENATED MODULE: ./react-app/src/state/ducks/rest-celebrities/operations.js


// CONCATENATED MODULE: ./react-app/src/state/ducks/rest-celebrities/index.js




/* harmony default export */ var rest_celebrities = __webpack_exports__["a"] = (reducers);

/***/ }),

/***/ "bJxI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ operations_namespaceObject; });

// UNUSED EXPORTS: contractEndpoints

// NAMESPACE OBJECT: ./react-app/src/state/ducks/contracts/operations.js
var operations_namespaceObject = {};
__webpack_require__.r(operations_namespaceObject);
__webpack_require__.d(operations_namespaceObject, "saveClientContract", function() { return actions["m" /* saveClientContract */]; });
__webpack_require__.d(operations_namespaceObject, "listClientContracts", function() { return actions["i" /* listClientContracts */]; });
__webpack_require__.d(operations_namespaceObject, "getContract", function() { return actions["e" /* getContract */]; });
__webpack_require__.d(operations_namespaceObject, "listContractComments", function() { return actions["j" /* listContractComments */]; });
__webpack_require__.d(operations_namespaceObject, "addContractComment", function() { return actions["b" /* addContractComment */]; });
__webpack_require__.d(operations_namespaceObject, "listTrending", function() { return actions["k" /* listTrending */]; });
__webpack_require__.d(operations_namespaceObject, "updateQueryParams", function() { return actions["s" /* updateQueryParams */]; });
__webpack_require__.d(operations_namespaceObject, "playVideo", function() { return actions["l" /* playVideo */]; });
__webpack_require__.d(operations_namespaceObject, "getContractWithPayments", function() { return actions["h" /* getContractWithPayments */]; });
__webpack_require__.d(operations_namespaceObject, "AssociateContract", function() { return actions["a" /* AssociateContract */]; });
__webpack_require__.d(operations_namespaceObject, "saveContractToPay", function() { return actions["o" /* saveContractToPay */]; });
__webpack_require__.d(operations_namespaceObject, "updateClientContract", function() { return actions["q" /* updateClientContract */]; });
__webpack_require__.d(operations_namespaceObject, "saveContractToPayClear", function() { return actions["p" /* saveContractToPayClear */]; });

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// EXTERNAL MODULE: ./react-app/src/state/ducks/contracts/types.js
var types = __webpack_require__("SgIJ");

// EXTERNAL MODULE: ./react-app/src/state/utils/gridSystem.js
var gridSystem = __webpack_require__("55Bo");

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrities/types.js
var celebrities_types = __webpack_require__("5dN8");

// CONCATENATED MODULE: ./react-app/src/state/ducks/contracts/reducers.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const updateQueryParamsInitialState = {
  currentPage: 1,
  search: "",
  pageSize: Object(gridSystem["a" /* getTotalColumns */])() * 7
};
const playVideoInitialState = {
  contract_reference: null
};
const fetchTrendingContractsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    results: [],
    informationPage: {}
  }
};
const saveClientContractInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const listClientContractsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const getContractInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const getContractWithPaymentsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    contract: {},
    payments: [],
    celebrity: {}
  }
};
const saveClientContractReviewInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const listContractCommmentsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const addContractCommmentInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const updateContractInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const saveContractToPayInitialState = {
  data: {},
  completed: false
};
const fetchSimilarContractsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
function queryParamsReducer(state = updateQueryParamsInitialState, action) {
  if (action.type === celebrities_types["O" /* UPDATE_QUERY_PARAMS */]) {
    return action.payload.params;
  } else {
    return state;
  }
}
function playVideoReducer(state = playVideoInitialState, action) {
  if (action.type === celebrities_types["L" /* PLAY_VIDEO */]) {
    return action.payload.params;
  } else {
    return state;
  }
}
function fetchTrendingContractsReducer(state = fetchTrendingContractsInitialState, action) {
  switch (action.type) {
    case celebrities_types["D" /* FETCH_TRENDING_CONTRACTS_REQUEST */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case celebrities_types["F" /* FETCH_TRENDING_CONTRACTS_REQUEST_FAILURE */]:
      return _objectSpread(_objectSpread({}, fetchTrendingContractsInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case celebrities_types["G" /* FETCH_TRENDING_CONTRACTS_REQUEST_SUCCESS */]:
      return _objectSpread(_objectSpread({}, fetchTrendingContractsInitialState), {}, {
        data: action.payload.data
      });

    case celebrities_types["E" /* FETCH_TRENDING_CONTRACTS_REQUEST_COMPLETED */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
function saveClientContractReducer(state = saveClientContractInitialState, action) {
  switch (action.type) {
    case types["y" /* SAVE_CLIENT_CONTRACT_REQUEST */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case types["A" /* SAVE_CLIENT_CONTRACT_REQUEST_FAILURE */]:
      return _objectSpread(_objectSpread({}, saveClientContractInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["B" /* SAVE_CLIENT_CONTRACT_REQUEST_SUCCESS */]:
      return _objectSpread(_objectSpread({}, saveClientContractInitialState), {}, {
        data: action.payload.data
      });

    case types["z" /* SAVE_CLIENT_CONTRACT_REQUEST_COMPLETED */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
function listClientContractsReducer(state = listClientContractsInitialState, action) {
  switch (action.type) {
    case types["q" /* LIST_CLIENT_CONTRACTS_REQUEST */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case types["s" /* LIST_CLIENT_CONTRACTS_REQUEST_FAILURE */]:
      return _objectSpread(_objectSpread({}, listClientContractsInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["t" /* LIST_CLIENT_CONTRACTS_REQUEST_SUCCESS */]:
      return _objectSpread(_objectSpread({}, listClientContractsInitialState), {}, {
        data: action.payload.data.data
      });

    case types["r" /* LIST_CLIENT_CONTRACTS_REQUEST_COMPLETED */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data.results,
        completed: true
      });

    default:
      return state;
  }
}
function getContractReducer(state = getContractInitialState, action) {
  switch (action.type) {
    case types["i" /* GET_CONTRACT_REQUEST */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case types["k" /* GET_CONTRACT_REQUEST_FAILURE */]:
      return _objectSpread(_objectSpread({}, getContractInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["l" /* GET_CONTRACT_REQUEST_SUCCESS */]:
      return _objectSpread(_objectSpread({}, getContractInitialState), {}, {
        data: action.payload.data.data
      });

    case types["j" /* GET_CONTRACT_REQUEST_COMPLETED */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data.data,
        completed: true
      });

    default:
      return state;
  }
}
function getContractWithPaymentsReducer(state = getContractWithPaymentsInitialState, action) {
  switch (action.type) {
    case types["m" /* GET_CONTRACT_WITH_PAYMENTS_REQUEST */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case types["o" /* GET_CONTRACT_WITH_PAYMENTS_REQUEST_FAILURE */]:
      return _objectSpread(_objectSpread({}, getContractWithPaymentsInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["p" /* GET_CONTRACT_WITH_PAYMENTS_REQUEST_SUCCESS */]:
      return _objectSpread(_objectSpread({}, getContractWithPaymentsInitialState), {}, {
        data: action.payload.data.data
      });

    case types["n" /* GET_CONTRACT_WITH_PAYMENTS_REQUEST_COMPLETED */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data.data,
        completed: true
      });

    default:
      return state;
  }
}
function listContractCommentsReducer(state = listContractCommmentsInitialState, action) {
  switch (action.type) {
    case types["u" /* LIST_CONTRACT_COMMENTS_REQUEST */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case types["w" /* LIST_CONTRACT_COMMENTS_REQUEST_FAILURE */]:
      return _objectSpread(_objectSpread({}, listContractCommmentsInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["x" /* LIST_CONTRACT_COMMENTS_REQUEST_SUCCESS */]:
      if (action.payload.data.informationPage.currentPage > 1) {
        action.payload.data.results = state.data.results.concat(action.payload.data.results);
        return _objectSpread(_objectSpread({}, listContractCommmentsInitialState), {}, {
          data: action.payload.data
        });
      } else {
        return _objectSpread(_objectSpread({}, listContractCommmentsInitialState), {}, {
          data: action.payload.data
        });
      }

    case types["v" /* LIST_CONTRACT_COMMENTS_REQUEST_COMPLETED */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
function addContractCommentReducer(state = addContractCommmentInitialState, action) {
  switch (action.type) {
    case types["a" /* ADD_CONTRACT_COMMENTS_REQUEST */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case types["c" /* ADD_CONTRACT_COMMENTS_REQUEST_FAILURE */]:
      return _objectSpread(_objectSpread({}, addContractCommmentInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["d" /* ADD_CONTRACT_COMMENTS_REQUEST_SUCCESS */]:
      return _objectSpread(_objectSpread({}, addContractCommmentInitialState), {}, {
        data: action.payload.data.data
      });

    case types["b" /* ADD_CONTRACT_COMMENTS_REQUEST_COMPLETED */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data.data,
        completed: true
      });

    default:
      return state;
  }
}
function saveContractToPayReducer(state = saveContractToPayInitialState, action) {
  switch (action.type) {
    case types["C" /* SAVE_CONTRACT_TO_PAY */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload,
        completed: true
      });

    case types["D" /* SAVE_CONTRACT_TO_PAY_CLEAR */]:
      return _objectSpread({}, saveContractToPayInitialState);

    default:
      return state;
  }
}
function updateContractReducer(state = updateContractInitialState, action) {
  switch (action.type) {
    case types["E" /* UPDATE_CONTRACT_REQUEST */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case types["G" /* UPDATE_CONTRACT_REQUEST_FAILURE */]:
      return _objectSpread(_objectSpread({}, addContractCommmentInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["H" /* UPDATE_CONTRACT_REQUEST_SUCCESS */]:
      return _objectSpread(_objectSpread({}, addContractCommmentInitialState), {}, {
        data: action.payload.data.data
      });

    case types["F" /* UPDATE_CONTRACT_REQUEST_COMPLETED */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data.data,
        completed: true
      });

    default:
      return state;
  }
}
function fetchSimilarContractsReducer(state = fetchSimilarContractsInitialState, action) {
  switch (action.type) {
    case types["e" /* FETCH_SIMILAR_CONTRACTS_REQUEST */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case types["g" /* FETCH_SIMILAR_CONTRACTS_REQUEST_FAILURE */]:
      return _objectSpread(_objectSpread({}, fetchSimilarContractsInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["h" /* FETCH_SIMILAR_CONTRACTS_REQUEST_SUCCESS */]:
      return _objectSpread(_objectSpread({}, fetchSimilarContractsInitialState), {}, {
        data: action.payload.data
      });

    case types["f" /* FETCH_SIMILAR_CONTRACTS_REQUEST_COMPLETED */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        completed: true
      });

    default:
      return state;
  }
}
/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  saveClientContractReducer,
  listClientContractsReducer,
  getContractReducer,
  listContractCommentsReducer,
  addContractCommentReducer,
  fetchTrendingContractsReducer,
  queryParamsReducer,
  playVideoReducer,
  getContractWithPaymentsReducer,
  saveContractToPayReducer,
  updateContractReducer,
  fetchSimilarContractsReducer
}));
// EXTERNAL MODULE: ./react-app/src/state/ducks/contracts/actions.js
var actions = __webpack_require__("UIGK");

// CONCATENATED MODULE: ./react-app/src/state/ducks/contracts/operations.js


// EXTERNAL MODULE: ./react-app/src/state/ducks/contracts/paths.js
var paths = __webpack_require__("8VMp");

// CONCATENATED MODULE: ./react-app/src/state/ducks/contracts/index.js




/* harmony default export */ var contracts = __webpack_exports__["b"] = (reducers);

/***/ }),

/***/ "baxW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return smallBreakpoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return mediumBreakpoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return largeBreakPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return extraLargeBreakPoint; });
const smallBreakpoint = 576;
const mediumBreakpoint = 768;
const largeBreakPoint = 991;
const extraLargeBreakPoint = 1200;

/***/ }),

/***/ "bqfv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ operations_namespaceObject; });

// UNUSED EXPORTS: celebrityLikesEndpoints

// NAMESPACE OBJECT: ./react-app/src/state/ducks/celebrity-likes/operations.js
var operations_namespaceObject = {};
__webpack_require__.r(operations_namespaceObject);
__webpack_require__.d(operations_namespaceObject, "fetchUserCelebrityLikes", function() { return actions["b" /* fetchUserCelebrityLikes */]; });
__webpack_require__.d(operations_namespaceObject, "fetchUserCelebrityLikesCleanUp", function() { return actions["c" /* fetchUserCelebrityLikesCleanUp */]; });
__webpack_require__.d(operations_namespaceObject, "addOrRemoveLike", function() { return actions["a" /* addOrRemoveLike */]; });

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrity-likes/types.js
var types = __webpack_require__("HoEe");

// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-likes/reducers.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const fetchUserCelebrityLikesInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const fetchUserCelebrityLikesWithOffsetInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    results: []
  }
};
function fetchUserCelebrityLikesReducer(state = fetchUserCelebrityLikesInitialState, action) {
  switch (action.type) {
    case types["b" /* FETCH_USER_CELEBRITY_LIKES */]:
      return _objectSpread(_objectSpread({}, fetchUserCelebrityLikesInitialState), {}, {
        loading: true
      });

    case types["e" /* FETCH_USER_CELEBRITY_LIKES_FAILURE */]:
      return _objectSpread(_objectSpread({}, fetchUserCelebrityLikesInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["f" /* FETCH_USER_CELEBRITY_LIKES_SUCCESS */]:
      return _objectSpread(_objectSpread({}, fetchUserCelebrityLikesInitialState), {}, {
        data: _objectSpread({}, action.payload.data)
      });

    case types["d" /* FETCH_USER_CELEBRITY_LIKES_COMPLETED */]:
      return _objectSpread(_objectSpread({}, fetchUserCelebrityLikesInitialState), {}, {
        data: _objectSpread({}, state.data),
        completed: true
      });

    case types["c" /* FETCH_USER_CELEBRITY_LIKES_CLEAN_UP */]:
      return _objectSpread({}, fetchUserCelebrityLikesInitialState);

    default:
      return state;
  }
}
function fetchUserCelebrityLikesWithOffsetReducer(state = fetchUserCelebrityLikesWithOffsetInitialState, action) {
  switch (action.type) {
    case types["g" /* FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case types["i" /* FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET_FAILURE */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["j" /* FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET_SUCCESS */]:
      const results = [];
      if (action.payload.config.params.offset) results.push(...state.data.results);
      results.push(...action.payload.data.results);
      return _objectSpread(_objectSpread({}, fetchUserCelebrityLikesWithOffsetInitialState), {}, {
        data: _objectSpread(_objectSpread({}, action.payload.data), {}, {
          results
        })
      });

    case types["h" /* FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET_COMPLETED */]:
      return _objectSpread(_objectSpread({}, fetchUserCelebrityLikesWithOffsetInitialState), {}, {
        data: _objectSpread({}, state.data),
        completed: true
      });

    default:
      return state;
  }
}
/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  fetchUserCelebrityLikesReducer,
  fetchUserCelebrityLikesWithOffsetReducer
}));
// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrity-likes/actions.js
var actions = __webpack_require__("+6uz");

// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-likes/operations.js

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrity-likes/paths.js
var paths = __webpack_require__("RLh7");

// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-likes/index.js




/* harmony default export */ var celebrity_likes = __webpack_exports__["b"] = (reducers);

/***/ }),

/***/ "c5JF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return ROOT_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return HOME_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return LANDING_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return SEARCH_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CELEBRITY_PROFILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return CELEBRITY_PROFILE_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return CELEBRITY_PROFILE_CONTRACT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return PAYMENT_METHODS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return STRIPE_3D_SECURE_IFRAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return STRIPE_3D_SECURE_RESPONSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return CONTRACT_CREATED; });
/* unused harmony export CONTRACT_PENDING */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return TERMS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return POLICIES_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return FAQS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AUTH_FLOW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AUTH_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return SIGN_IN_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return SIGN_IN_WITH_SPECIFIC_FORM_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return SIGN_UP_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return SIGN_UP_WITH_SPECIFIC_FORM_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return VALIDATE_SECURITY_CODE; });
/* unused harmony export RESET_PASSWORD_PATH */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return CHANGE_PASSWORD_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return CREATE_PASSWORD_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return COMPLETE_PROFILE_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return CELEBRITY_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return CLIENT_FAVORITES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return CLIENT_PROFILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return CLIENT_HIRINGS; });
/* unused harmony export CLIENT_SUBSCRIPTIONS */
/* unused harmony export ACCOUNT_HIRING_PREVIEW */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return HIRING_PREVIEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return HIRING_EDITOR; });
/* unused harmony export HIRING_PREVIEW_WITHOUT_SESSION */
/* unused harmony export TRENDING */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return BLOG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return BLOG_ENTRY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return SUBSCRIPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return SUBSCRIPTION_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return FEED_SUBSCRIPTION; });
/* unused harmony export SESSION_REDIRECT */
const ROOT_PATH = "/";
const HOME_PATH = "/inicio/";
const LANDING_PATH = "/landing";
const SEARCH_PATH = "/buscar";
const CELEBRITY_PROFILE = "/:celebrity_username";
const CELEBRITY_PROFILE_ERROR = "/:celebrity_username/404-not-found/";
const CELEBRITY_PROFILE_CONTRACT = "/:celebrity_username/contratar";
const PAYMENT_METHODS = "/metodos-de-pago/:contract_reference";
const STRIPE_3D_SECURE_IFRAME = "/metodos-de-pago/:contract_reference/stripe-3d-secure/iframe";
const STRIPE_3D_SECURE_RESPONSE = "/metodos-de-pago/:contract_reference/stripe-3d-secure/response";
const CONTRACT_CREATED = "/contract-created/:contract_reference";
const CONTRACT_PENDING = "/resumen-de-compra/:contract_reference"; // DOCS

const TERMS_PATH = "/docs/terminos";
const POLICIES_PATH = "/docs/politicas";
const FAQS_PATH = "/docs/faqs"; // AUTH

const AUTH_FLOW = "/auth/select-flow/";
const AUTH_SUCCESS = "/authentication/success";
const SIGN_IN_PATH = "/auth/sign-in/";
const SIGN_IN_WITH_SPECIFIC_FORM_PATH = "/auth/sign-in/:form/";
const SIGN_UP_PATH = "/auth/sign-up";
const SIGN_UP_WITH_SPECIFIC_FORM_PATH = "/auth/sign-up/:form/";
const VALIDATE_SECURITY_CODE = "/auth/validate-security-code/:form";
const RESET_PASSWORD_PATH = "/auth/reset-password";
const CHANGE_PASSWORD_PATH = "/auth/change-password";
const CREATE_PASSWORD_PATH = "/auth/create-password";
const COMPLETE_PROFILE_PATH = "/auth/complete-profile"; // FORMS

const CELEBRITY_REQUEST = "/forms/aplicar"; // CLIENT

const CLIENT_FAVORITES = "/my-account/favorites";
const CLIENT_PROFILE = "/my-account/profile";
const CLIENT_HIRINGS = "/my-account/hirings";
const CLIENT_SUBSCRIPTIONS = "/my-account/subscriptions";
const ACCOUNT_HIRING_PREVIEW = "/my-account/hirings/:contract_reference";
const HIRING_PREVIEW = "/hirings/:contract_reference";
const HIRING_EDITOR = "/hirings/:contract_reference/editor";
const HIRING_PREVIEW_WITHOUT_SESSION = "/hirings/:contract_reference"; // TRENDING

const TRENDING = "/tendencias";
const BLOG = "/blog";
const BLOG_ENTRY = `${BLOG}/:id`; //SUBSCRIPTION

const SUBSCRIPTION = "/subscription/subscribe/:celebrity_username"; //SUBSCRIPTION

const SUBSCRIPTION_SUCCESS = "/subscription/subscription-success/:celebrity_username"; //SUBSCRIPTION FEED

const FEED_SUBSCRIPTION = "/subscription/feed"; //SESSION REDIRECT

const SESSION_REDIRECT = "/session/redirect/";

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "cDf5":
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

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

/***/ "cTJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__("cDcd"));

var _router = __webpack_require__("elyg");

var _router2 = __webpack_require__("nOHt");

var _useIntersection = __webpack_require__("vNVm");

const prefetched = {};

function prefetch(router, href, as, options) {
  if (true) return;
  if (!(0, _router.isLocalURL)(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options).catch(err => {
    if (false) {}
  });
  const curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale; // Join on an invalid URI character

  prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
}

function isModifiedEvent(event) {
  const {
    target
  } = event.currentTarget;
  return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
  event.nativeEvent && event.nativeEvent.which === 2;
}

function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
  const {
    nodeName
  } = e.currentTarget;

  if (nodeName === 'A' && (isModifiedEvent(e) || !(0, _router.isLocalURL)(href))) {
    // ignore click for browser’s default behavior
    return;
  }

  e.preventDefault(); //  avoid scroll for urls with anchor refs

  if (scroll == null) {
    scroll = as.indexOf('#') < 0;
  } // replace state instead of push if prop is present


  router[replace ? 'replace' : 'push'](href, as, {
    shallow,
    locale,
    scroll
  }).then(success => {
    if (!success) return;

    if (scroll) {
      // FIXME: proper route announcing at Router level, not Link:
      document.body.focus();
    }
  });
}

function Link(props) {
  if (false) {}

  const p = props.prefetch !== false;
  const router = (0, _router2.useRouter)();
  const pathname = router && router.pathname || '/';

  const {
    href,
    as
  } = _react.default.useMemo(() => {
    const [resolvedHref, resolvedAs] = (0, _router.resolveHref)(pathname, props.href, true);
    return {
      href: resolvedHref,
      as: props.as ? (0, _router.resolveHref)(pathname, props.as) : resolvedAs || resolvedHref
    };
  }, [pathname, props.href, props.as]);

  let {
    children,
    replace,
    shallow,
    scroll,
    locale
  } = props; // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

  if (typeof children === 'string') {
    children = /*#__PURE__*/_react.default.createElement("a", null, children);
  } // This will return the first child, if multiple are provided it will throw an error


  const child = _react.Children.only(children);

  const childRef = child && typeof child === 'object' && child.ref;
  const [setIntersectionRef, isVisible] = (0, _useIntersection.useIntersection)({
    rootMargin: '200px'
  });

  const setRef = _react.default.useCallback(el => {
    setIntersectionRef(el);

    if (childRef) {
      if (typeof childRef === 'function') childRef(el);else if (typeof childRef === 'object') {
        childRef.current = el;
      }
    }
  }, [childRef, setIntersectionRef]);

  (0, _react.useEffect)(() => {
    const shouldPrefetch = isVisible && p && (0, _router.isLocalURL)(href);
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    const isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];

    if (shouldPrefetch && !isPrefetched) {
      prefetch(router, href, as, {
        locale: curLocale
      });
    }
  }, [as, href, isVisible, locale, p, router]);
  const childProps = {
    ref: setRef,
    onClick: e => {
      if (child.props && typeof child.props.onClick === 'function') {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }
  };

  childProps.onMouseEnter = e => {
    if (!(0, _router.isLocalURL)(href)) return;

    if (child.props && typeof child.props.onMouseEnter === 'function') {
      child.props.onMouseEnter(e);
    }

    prefetch(router, href, as, {
      priority: true
    });
  }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
  // defined, we specify the current 'href', so that repetition is not needed by the user


  if (props.passHref || child.type === 'a' && !('href' in child.props)) {
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale; // we only render domain locales if we are currently on a domain locale
    // so that locale links are still visitable in development/preview envs

    const localeDomain = router && router.isLocaleDomain && (0, _router.getDomainLocale)(as, curLocale, router && router.locales, router && router.domainLocales);
    childProps.href = localeDomain || (0, _router.addBasePath)((0, _router.addLocale)(as, curLocale, router && router.defaultLocale));
  }

  return /*#__PURE__*/_react.default.cloneElement(child, childProps);
}

var _default = Link;
exports.default = _default;

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

/***/ "dZ6Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = mitt;
/*
MIT License
Copyright (c) Jason Miller (https://jasonformat.com/)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// This file is based on https://github.com/developit/mitt/blob/v1.1.3/src/index.js
// It's been edited for the needs of this script
// See the LICENSE at the top of the file

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

/***/ }),

/***/ "elyg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getDomainLocale = getDomainLocale;
exports.addLocale = addLocale;
exports.delLocale = delLocale;
exports.hasBasePath = hasBasePath;
exports.addBasePath = addBasePath;
exports.delBasePath = delBasePath;
exports.isLocalURL = isLocalURL;
exports.interpolateAs = interpolateAs;
exports.resolveHref = resolveHref;
exports.default = void 0;

var _normalizeTrailingSlash = __webpack_require__("X24+");

var _routeLoader = __webpack_require__("Nh2W");

var _denormalizePagePath = __webpack_require__("wkBG");

var _normalizeLocalePath = __webpack_require__("3wub");

var _mitt = _interopRequireDefault(__webpack_require__("dZ6Y"));

var _utils = __webpack_require__("g/15");

var _isDynamic = __webpack_require__("/jkW");

var _parseRelativeUrl = __webpack_require__("hS4m");

var _querystring = __webpack_require__("3WeD");

var _resolveRewrites = _interopRequireDefault(__webpack_require__("GXs3"));

var _routeMatcher = __webpack_require__("gguc");

var _routeRegex = __webpack_require__("YTqd");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/* global __NEXT_DATA__ */
// tslint:disable:no-console


let detectDomainLocale;

if (false) {}

const basePath =  false || '';

function buildCancellationError() {
  return Object.assign(new Error('Route Cancelled'), {
    cancelled: true
  });
}

function addPathPrefix(path, prefix) {
  return prefix && path.startsWith('/') ? path === '/' ? (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(prefix) : `${prefix}${pathNoQueryHash(path) === '/' ? path.substring(1) : path}` : path;
}

function getDomainLocale(path, locale, locales, domainLocales) {
  if (false) {}

  return false;
}

function addLocale(path, locale, defaultLocale) {
  if (false) {}

  return path;
}

function delLocale(path, locale) {
  if (false) {}

  return path;
}

function pathNoQueryHash(path) {
  const queryIndex = path.indexOf('?');
  const hashIndex = path.indexOf('#');

  if (queryIndex > -1 || hashIndex > -1) {
    path = path.substring(0, queryIndex > -1 ? queryIndex : hashIndex);
  }

  return path;
}

function hasBasePath(path) {
  path = pathNoQueryHash(path);
  return path === basePath || path.startsWith(basePath + '/');
}

function addBasePath(path) {
  // we only add the basepath on relative urls
  return addPathPrefix(path, basePath);
}

function delBasePath(path) {
  path = path.slice(basePath.length);
  if (!path.startsWith('/')) path = `/${path}`;
  return path;
}
/**
* Detects whether a given url is routable by the Next.js router (browser only).
*/


function isLocalURL(url) {
  // prevent a hydration mismatch on href for url with anchor refs
  if (url.startsWith('/') || url.startsWith('#')) return true;

  try {
    // absolute urls can be local if they are on the same origin
    const locationOrigin = (0, _utils.getLocationOrigin)();
    const resolved = new URL(url, locationOrigin);
    return resolved.origin === locationOrigin && hasBasePath(resolved.pathname);
  } catch (_) {
    return false;
  }
}

function interpolateAs(route, asPathname, query) {
  let interpolatedRoute = '';
  const dynamicRegex = (0, _routeRegex.getRouteRegex)(route);
  const dynamicGroups = dynamicRegex.groups;
  const dynamicMatches = // Try to match the dynamic route against the asPath
  (asPathname !== route ? (0, _routeMatcher.getRouteMatcher)(dynamicRegex)(asPathname) : '') || // Fall back to reading the values from the href
  // TODO: should this take priority; also need to change in the router.
  query;
  interpolatedRoute = route;
  const params = Object.keys(dynamicGroups);

  if (!params.every(param => {
    let value = dynamicMatches[param] || '';
    const {
      repeat,
      optional
    } = dynamicGroups[param]; // support single-level catch-all
    // TODO: more robust handling for user-error (passing `/`)

    let replaced = `[${repeat ? '...' : ''}${param}]`;

    if (optional) {
      replaced = `${!value ? '/' : ''}[${replaced}]`;
    }

    if (repeat && !Array.isArray(value)) value = [value];
    return (optional || param in dynamicMatches) && ( // Interpolate group into data URL if present
    interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map( // these values should be fully encoded instead of just
    // path delimiter escaped since they are being inserted
    // into the URL and we expect URL encoded segments
    // when parsing dynamic route params
    segment => encodeURIComponent(segment)).join('/') : encodeURIComponent(value)) || '/');
  })) {
    interpolatedRoute = ''; // did not satisfy all requirements
    // n.b. We ignore this error because we handle warning for this case in
    // development in the `<Link>` component directly.
  }

  return {
    params,
    result: interpolatedRoute
  };
}

function omitParmsFromQuery(query, params) {
  const filteredQuery = {};
  Object.keys(query).forEach(key => {
    if (!params.includes(key)) {
      filteredQuery[key] = query[key];
    }
  });
  return filteredQuery;
}
/**
* Resolves a given hyperlink with a certain router state (basePath not included).
* Preserves absolute urls.
*/


function resolveHref(currentPath, href, resolveAs) {
  // we use a dummy base url for relative urls
  const base = new URL(currentPath, 'http://n');
  const urlAsString = typeof href === 'string' ? href : (0, _utils.formatWithValidation)(href); // Return because it cannot be routed by the Next.js router

  if (!isLocalURL(urlAsString)) {
    return resolveAs ? [urlAsString] : urlAsString;
  }

  try {
    const finalUrl = new URL(urlAsString, base);
    finalUrl.pathname = (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(finalUrl.pathname);
    let interpolatedAs = '';

    if ((0, _isDynamic.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
      const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
      const {
        result,
        params
      } = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);

      if (result) {
        interpolatedAs = (0, _utils.formatWithValidation)({
          pathname: result,
          hash: finalUrl.hash,
          query: omitParmsFromQuery(query, params)
        });
      }
    } // if the origin didn't change, it means we received a relative href


    const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
    return resolveAs ? [resolvedHref, interpolatedAs || resolvedHref] : resolvedHref;
  } catch (_) {
    return resolveAs ? [urlAsString] : urlAsString;
  }
}

function stripOrigin(url) {
  const origin = (0, _utils.getLocationOrigin)();
  return url.startsWith(origin) ? url.substring(origin.length) : url;
}

function prepareUrlAs(router, url, as) {
  // If url and as provided as an object representation,
  // we'll format them into the string version here.
  let [resolvedHref, resolvedAs] = resolveHref(router.pathname, url, true);
  const origin = (0, _utils.getLocationOrigin)();
  const hrefHadOrigin = resolvedHref.startsWith(origin);
  const asHadOrigin = resolvedAs && resolvedAs.startsWith(origin);
  resolvedHref = stripOrigin(resolvedHref);
  resolvedAs = resolvedAs ? stripOrigin(resolvedAs) : resolvedAs;
  const preparedUrl = hrefHadOrigin ? resolvedHref : addBasePath(resolvedHref);
  const preparedAs = as ? stripOrigin(resolveHref(router.pathname, as)) : resolvedAs || resolvedHref;
  return {
    url: preparedUrl,
    as: asHadOrigin ? preparedAs : addBasePath(preparedAs)
  };
}

const manualScrollRestoration =  false && false;
const SSG_DATA_NOT_FOUND = Symbol('SSG_DATA_NOT_FOUND');

function fetchRetry(url, attempts) {
  return fetch(url, {
    // Cookies are required to be present for Next.js' SSG "Preview Mode".
    // Cookies may also be required for `getServerSideProps`.
    //
    // > `fetch` won’t send cookies, unless you set the credentials init
    // > option.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //
    // > For maximum browser compatibility when it comes to sending &
    // > receiving cookies, always supply the `credentials: 'same-origin'`
    // > option instead of relying on the default.
    // https://github.com/github/fetch#caveats
    credentials: 'same-origin'
  }).then(res => {
    if (!res.ok) {
      if (attempts > 1 && res.status >= 500) {
        return fetchRetry(url, attempts - 1);
      }

      if (res.status === 404) {
        return res.json().then(data => {
          if (data.notFound) {
            return {
              notFound: SSG_DATA_NOT_FOUND
            };
          }

          throw new Error(`Failed to load static props`);
        });
      }

      throw new Error(`Failed to load static props`);
    }

    return res.json();
  });
}

function fetchNextData(dataHref, isServerRender) {
  return fetchRetry(dataHref, isServerRender ? 3 : 1).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      (0, _routeLoader.markAssetError)(err);
    }

    throw err;
  });
}

class Router {
  /**
  * Map of all components loaded in `Router`
  */
  // Static Data Cache
  constructor(_pathname, _query, _as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback,
    locale,
    locales,
    defaultLocale,
    domainLocales
  }) {
    this.route = void 0;
    this.pathname = void 0;
    this.query = void 0;
    this.asPath = void 0;
    this.basePath = void 0;
    this.components = void 0;
    this.sdc = {};
    this.sub = void 0;
    this.clc = void 0;
    this.pageLoader = void 0;
    this._bps = void 0;
    this.events = void 0;
    this._wrapApp = void 0;
    this.isSsr = void 0;
    this.isFallback = void 0;
    this._inFlightRoute = void 0;
    this._shallow = void 0;
    this.locale = void 0;
    this.locales = void 0;
    this.defaultLocale = void 0;
    this.domainLocales = void 0;
    this.isReady = void 0;
    this.isLocaleDomain = void 0;
    this._idx = 0;

    this.onPopState = e => {
      const state = e.state;

      if (!state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', (0, _utils.formatWithValidation)({
          pathname: addBasePath(pathname),
          query
        }), (0, _utils.getURL)());
        return;
      }

      if (!state.__N) {
        return;
      }

      let forcedScroll;
      const {
        url,
        as,
        options,
        idx
      } = state;

      if (false) {}

      this._idx = idx;
      const {
        pathname
      } = (0, _parseRelativeUrl.parseRelativeUrl)(url); // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site

      if (this.isSsr && as === this.asPath && pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(state)) {
        return;
      }

      this.change('replaceState', url, as, Object.assign({}, options, {
        shallow: options.shallow && this._shallow,
        locale: options.locale || this.defaultLocale
      }), forcedScroll);
    }; // represents the current component key


    this.route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(_pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (_pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        initial: true,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App,
      styleSheets: [
        /* /_app does not need its stylesheets managed */
      ]
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = _pathname;
    this.query = _query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    const autoExportDynamic = (0, _isDynamic.isDynamicRoute)(_pathname) && self.__NEXT_DATA__.autoExport;

    this.asPath = autoExportDynamic ? _pathname : _as;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;
    this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || !autoExportDynamic && !self.location.search);
    this.isLocaleDomain = false;

    if (false) {}

    if (false) {}
  }

  reload() {
    window.location.reload();
  }
  /**
  * Go back in history
  */


  back() {
    window.history.back();
  }
  /**
  * Performs a `pushState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  push(url, as, options = {}) {
    if (false) {}

    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('pushState', url, as, options);
  }
  /**
  * Performs a `replaceState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  replace(url, as, options = {}) {
    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('replaceState', url, as, options);
  }

  async change(method, url, as, options, forcedScroll) {
    var _options$scroll;

    if (!isLocalURL(url)) {
      window.location.href = url;
      return false;
    } // for static pages with query params in the URL we delay
    // marking the router ready until after the query is updated


    if (options._h) {
      this.isReady = true;
    } // Default to scroll reset behavior unless explicitly specified to be
    // `false`! This makes the behavior between using `Router#push` and a
    // `<Link />` consistent.


    options.scroll = !!((_options$scroll = options.scroll) != null ? _options$scroll : true);
    let localeChange = options.locale !== this.locale;

    if (false) { var _this$locales; }

    if (!options._h) {
      this.isSsr = false;
    } // marking route changes as a navigation start entry


    if (_utils.ST) {
      performance.mark('routeChange');
    }

    const {
      shallow = false
    } = options;
    const routeProps = {
      shallow
    };

    if (this._inFlightRoute) {
      this.abortComponentLoad(this._inFlightRoute, routeProps);
    }

    as = addBasePath(addLocale(hasBasePath(as) ? delBasePath(as) : as, options.locale, this.defaultLocale));
    const cleanedAs = delLocale(hasBasePath(as) ? delBasePath(as) : as, this.locale);
    this._inFlightRoute = as; // If the url change is only related to a hash change
    // We should not proceed. We should only change the state.
    // WARNING: `_h` is an internal option for handing Next.js client-side
    // hydration. Your app should _never_ use this property. It may change at
    // any time without notice.

    if (!options._h && this.onlyAHashChange(cleanedAs)) {
      this.asPath = cleanedAs;
      Router.events.emit('hashChangeStart', as, routeProps); // TODO: do we need the resolved href when only a hash change?

      this.changeState(method, url, as, options);
      this.scrollToHash(cleanedAs);
      this.notify(this.components[this.route], null);
      Router.events.emit('hashChangeComplete', as, routeProps);
      return true;
    }

    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname,
      query
    } = parsed; // The build manifest needs to be loaded before auto-static dynamic pages
    // get their query parameters to allow ensuring they can be parsed properly
    // when rewritten to

    let pages, rewrites;

    try {
      pages = await this.pageLoader.getPageList();
      ({
        __rewrites: rewrites
      } = await (0, _routeLoader.getClientBuildManifest)());
    } catch (err) {
      // If we fail to resolve the page list or client-build manifest, we must
      // do a server-side transition:
      window.location.href = as;
      return false;
    }

    parsed = this._resolveHref(parsed, pages);

    if (parsed.pathname !== pathname) {
      pathname = parsed.pathname;
      url = (0, _utils.formatWithValidation)(parsed);
    } // url and as should always be prefixed with basePath by this
    // point by either next/link or router.push/replace so strip the
    // basePath from the pathname to match the pages dir 1-to-1


    pathname = pathname ? (0, _normalizeTrailingSlash.removePathTrailingSlash)(delBasePath(pathname)) : pathname; // If asked to change the current URL we should reload the current page
    // (not location.reload() but reload getInitialProps and other Next.js stuffs)
    // We also need to set the method = replaceState always
    // as this should not go into the history (That's how browsers work)
    // We should compare the new asPath to the current asPath, not the url

    if (!this.urlIsNew(cleanedAs) && !localeChange) {
      method = 'replaceState';
    }

    let route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname); // we need to resolve the as value using rewrites for dynamic SSG
    // pages to allow building the data URL correctly

    let resolvedAs = as;

    if (false) {}

    if (!isLocalURL(as)) {
      if (false) {}

      window.location.href = as;
      return false;
    }

    resolvedAs = delLocale(delBasePath(resolvedAs), this.locale);

    if ((0, _isDynamic.isDynamicRoute)(route)) {
      const parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(resolvedAs);
      const asPathname = parsedAs.pathname;
      const routeRegex = (0, _routeRegex.getRouteRegex)(route);
      const routeMatch = (0, _routeMatcher.getRouteMatcher)(routeRegex)(asPathname);
      const shouldInterpolate = route === asPathname;
      const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query) : {};

      if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
        const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

        if (missingParams.length > 0) {
          if (false) {}

          throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(', ')}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://err.sh/vercel/next.js/${shouldInterpolate ? 'href-interpolation-failed' : 'incompatible-href-as'}`);
        }
      } else if (shouldInterpolate) {
        as = (0, _utils.formatWithValidation)(Object.assign({}, parsedAs, {
          pathname: interpolatedAs.result,
          query: omitParmsFromQuery(query, interpolatedAs.params)
        }));
      } else {
        // Merge params into `query`, overwriting any specified in search
        Object.assign(query, routeMatch);
      }
    }

    Router.events.emit('routeChangeStart', as, routeProps);

    try {
      let routeInfo = await this.getRouteInfo(route, pathname, query, as, resolvedAs, routeProps);
      let {
        error,
        props,
        __N_SSG,
        __N_SSP
      } = routeInfo; // handle redirect on client-transition

      if ((__N_SSG || __N_SSP) && props) {
        if (props.pageProps && props.pageProps.__N_REDIRECT) {
          const destination = props.pageProps.__N_REDIRECT; // check if destination is internal (resolves to a page) and attempt
          // client-navigation if it is falling back to hard navigation if
          // it's not

          if (destination.startsWith('/')) {
            const parsedHref = (0, _parseRelativeUrl.parseRelativeUrl)(destination);

            this._resolveHref(parsedHref, pages, false);

            if (pages.includes(parsedHref.pathname)) {
              const {
                url: newUrl,
                as: newAs
              } = prepareUrlAs(this, destination, destination);
              return this.change(method, newUrl, newAs, options);
            }
          }

          window.location.href = destination;
          return new Promise(() => {});
        } // handle SSG data 404


        if (props.notFound === SSG_DATA_NOT_FOUND) {
          let notFoundRoute;

          try {
            await this.fetchComponent('/404');
            notFoundRoute = '/404';
          } catch (_) {
            notFoundRoute = '/_error';
          }

          routeInfo = await this.getRouteInfo(notFoundRoute, notFoundRoute, query, as, resolvedAs, {
            shallow: false
          });
        }
      }

      Router.events.emit('beforeHistoryChange', as, routeProps);
      this.changeState(method, url, as, options);

      if (false) {} // shallow routing is only allowed for same page URL changes.


      const isValidShallowRoute = options.shallow && this.route === route;
      await this.set(route, pathname, query, cleanedAs, routeInfo, forcedScroll || (isValidShallowRoute || !options.scroll ? null : {
        x: 0,
        y: 0
      })).catch(e => {
        if (e.cancelled) error = error || e;else throw e;
      });

      if (error) {
        Router.events.emit('routeChangeError', error, cleanedAs, routeProps);
        throw error;
      }

      if (false) {}

      Router.events.emit('routeChangeComplete', as, routeProps);
      return true;
    } catch (err) {
      if (err.cancelled) {
        return false;
      }

      throw err;
    }
  }

  changeState(method, url, as, options = {}) {
    if (false) {}

    if (method !== 'pushState' || (0, _utils.getURL)() !== as) {
      this._shallow = options.shallow;
      window.history[method]({
        url,
        as,
        options,
        __N: true,
        idx: this._idx = method !== 'pushState' ? this._idx : this._idx + 1
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  async handleRouteInfoError(err, pathname, query, as, routeProps, loadErrorFail) {
    if (err.cancelled) {
      // bubble up cancellation errors
      throw err;
    }

    if ((0, _routeLoader.isAssetError)(err) || loadErrorFail) {
      Router.events.emit('routeChangeError', err, as, routeProps); // If we can't load the page it could be one of following reasons
      //  1. Page doesn't exists
      //  2. Page does exist in a different zone
      //  3. Internal error while loading the page
      // So, doing a hard reload is the proper way to deal with this.

      window.location.href = as; // Changing the URL doesn't block executing the current code path.
      // So let's throw a cancellation error stop the routing logic.

      throw buildCancellationError();
    }

    try {
      let Component;
      let styleSheets;
      let props;

      if (typeof Component === 'undefined' || typeof styleSheets === 'undefined') {
        ;
        ({
          page: Component,
          styleSheets
        } = await this.fetchComponent('/_error'));
      }

      const routeInfo = {
        props,
        Component,
        styleSheets,
        err,
        error: err
      };

      if (!routeInfo.props) {
        try {
          routeInfo.props = await this.getInitialProps(Component, {
            err,
            pathname,
            query
          });
        } catch (gipErr) {
          console.error('Error in error page `getInitialProps`: ', gipErr);
          routeInfo.props = {};
        }
      }

      return routeInfo;
    } catch (routeInfoErr) {
      return this.handleRouteInfoError(routeInfoErr, pathname, query, as, routeProps, true);
    }
  }

  async getRouteInfo(route, pathname, query, as, resolvedAs, routeProps) {
    try {
      const existingRouteInfo = this.components[route];

      if (routeProps.shallow && existingRouteInfo && this.route === route) {
        return existingRouteInfo;
      }

      const cachedRouteInfo = existingRouteInfo && 'initial' in existingRouteInfo ? undefined : existingRouteInfo;
      const routeInfo = cachedRouteInfo ? cachedRouteInfo : await this.fetchComponent(route).then(res => ({
        Component: res.page,
        styleSheets: res.styleSheets,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }));
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (false) {}

      let dataHref;

      if (__N_SSG || __N_SSP) {
        dataHref = this.pageLoader.getDataHref((0, _utils.formatWithValidation)({
          pathname,
          query
        }), resolvedAs, __N_SSG, this.locale);
      }

      const props = await this._getData(() => __N_SSG ? this._getStaticData(dataHref) : __N_SSP ? this._getServerData(dataHref) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as
      }));
      routeInfo.props = props;
      this.components[route] = routeInfo;
      return routeInfo;
    } catch (err) {
      return this.handleRouteInfoError(err, pathname, query, as, routeProps);
    }
  }

  set(route, pathname, query, as, data, resetScroll) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    return this.notify(data, resetScroll);
  }
  /**
  * Callback to execute before replacing router state
  * @param cb callback to be executed
  */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value or `#top`
    // To mirror browsers

    if (hash === '' || hash === 'top') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }

  _resolveHref(parsedHref, pages, applyBasePath = true) {
    const {
      pathname
    } = parsedHref;
    const cleanPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _denormalizePagePath.denormalizePagePath)(applyBasePath ? delBasePath(pathname) : pathname));

    if (cleanPathname === '/404' || cleanPathname === '/_error') {
      return parsedHref;
    } // handle resolving href for dynamic routes


    if (!pages.includes(cleanPathname)) {
      // eslint-disable-next-line array-callback-return
      pages.some(page => {
        if ((0, _isDynamic.isDynamicRoute)(page) && (0, _routeRegex.getRouteRegex)(page).re.test(cleanPathname)) {
          parsedHref.pathname = applyBasePath ? addBasePath(page) : page;
          return true;
        }
      });
    }

    parsedHref.pathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)(parsedHref.pathname);
    return parsedHref;
  }
  /**
  * Prefetch page code, you may wait for the data during page rendering.
  * This feature only works in production!
  * @param url the href of prefetched page
  * @param asPath the as path of the prefetched page
  */


  async prefetch(url, asPath = url, options = {}) {
    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname
    } = parsed;

    if (false) {}

    const pages = await this.pageLoader.getPageList();
    parsed = this._resolveHref(parsed, pages, false);

    if (parsed.pathname !== pathname) {
      pathname = parsed.pathname;
      url = (0, _utils.formatWithValidation)(parsed);
    } // Prefetch is not supported in development mode because it would trigger on-demand-entries


    if (false) {}

    const route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname);
    await Promise.all([this.pageLoader._isSsg(url).then(isSsg => {
      return isSsg ? this._getStaticData(this.pageLoader.getDataHref(url, asPath, true, typeof options.locale !== 'undefined' ? options.locale : this.locale)) : false;
    }), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route)]);
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  _getStaticData(dataHref) {
    const {
      href: cacheKey
    } = new URL(dataHref, window.location.href);

    if ( true && this.sdc[cacheKey]) {
      return Promise.resolve(this.sdc[cacheKey]);
    }

    return fetchNextData(dataHref, this.isSsr).then(data => {
      this.sdc[cacheKey] = data;
      return data;
    });
  }

  _getServerData(dataHref) {
    return fetchNextData(dataHref, this.isSsr);
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return (0, _utils.loadGetInitialProps)(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as, routeProps) {
    if (this.clc) {
      Router.events.emit('routeChangeError', buildCancellationError(), as, routeProps);
      this.clc();
      this.clc = null;
    }
  }

  notify(data, resetScroll) {
    return this.sub(data, this.components['/_app'].Component, resetScroll);
  }

}

exports.default = Router;
Router.events = (0, _mitt.default)();

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

// EXTERNAL MODULE: ./react-app/src/state/ducks/payments/index.js + 3 modules
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

/***/ "g/15":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.execOnce = execOnce;
exports.getLocationOrigin = getLocationOrigin;
exports.getURL = getURL;
exports.getDisplayName = getDisplayName;
exports.isResSent = isResSent;
exports.loadGetInitialProps = loadGetInitialProps;
exports.formatWithValidation = formatWithValidation;
exports.ST = exports.SP = exports.urlObjectKeys = void 0;

var _formatUrl = __webpack_require__("6D7l");
/**
* Utils
*/


function execOnce(fn) {
  let used = false;
  let result;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn(...args);
    }

    return result;
  };
}

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

function isResSent(res) {
  return res.finished || res.headersSent;
}

async function loadGetInitialProps(App, ctx) {
  if (false) { var _App$prototype; } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (false) {}

  return props;
}

const urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];
exports.urlObjectKeys = urlObjectKeys;

function formatWithValidation(url) {
  if (false) {}

  return (0, _formatUrl.formatUrl)(url);
}

const SP = typeof performance !== 'undefined';
exports.SP = SP;
const ST = SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';
exports.ST = ST;

/***/ }),

/***/ "gguc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteMatcher = getRouteMatcher;

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = param => {
      try {
        return decodeURIComponent(param);
      } catch (_) {
        const err = new Error('failed to decode param');
        err.code = 'DECODE_FAILED';
        throw err;
      }
    };

    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "hI02":
/***/ (function(module, exports) {

module.exports = require("react-gtm-module");

/***/ }),

/***/ "hS4m":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.parseRelativeUrl = parseRelativeUrl;

var _utils = __webpack_require__("g/15");

var _querystring = __webpack_require__("3WeD");
/**
* Parses path-relative urls (e.g. `/hello/world?foo=bar`). If url isn't path-relative
* (e.g. `./hello`) then at least base must be.
* Absolute urls are rejected with one exception, in the browser, absolute urls that are on
* the current origin will be parsed as relative
*/


function parseRelativeUrl(url, base) {
  const globalBase = new URL(true ? 'http://n' : undefined);
  const resolvedBase = base ? new URL(base, globalBase) : globalBase;
  const {
    pathname,
    searchParams,
    search,
    hash,
    href,
    origin
  } = new URL(url, resolvedBase);

  if (origin !== globalBase.origin) {
    throw new Error(`invariant: invalid relative URL, router received ${url}`);
  }

  return {
    pathname,
    query: (0, _querystring.searchParamsToUrlQuery)(searchParams),
    search,
    hash,
    href: href.slice(globalBase.origin.length)
  };
}

/***/ }),

/***/ "hVVe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ session_Session; });

// EXTERNAL MODULE: ./react-app/src/routing/History.js
var History = __webpack_require__("u3u/");

// EXTERNAL MODULE: ./react-app/src/routing/Paths.js
var Paths = __webpack_require__("c5JF");

// EXTERNAL MODULE: external "jwt-decode"
var external_jwt_decode_ = __webpack_require__("tlnx");
var external_jwt_decode_default = /*#__PURE__*/__webpack_require__.n(external_jwt_decode_);

// EXTERNAL MODULE: external "mixpanel-browser"
var external_mixpanel_browser_ = __webpack_require__("UHdw");
var external_mixpanel_browser_default = /*#__PURE__*/__webpack_require__.n(external_mixpanel_browser_);

// CONCATENATED MODULE: ./react-app/src/state/utils/mixPanel.js

external_mixpanel_browser_default.a.init("3c06764cad281ce6f4ca117975c119ef");
const isProductionEnvironment = "qa" === "production";
const Mixpanel = {
  identify: id => {
    if (isProductionEnvironment) external_mixpanel_browser_default.a.identify(id);
  },
  alias: id => {
    if (isProductionEnvironment) external_mixpanel_browser_default.a.alias(id);
  },
  track: (name, props) => {
    if (isProductionEnvironment) external_mixpanel_browser_default.a.track(name, props);
  },
  people: {
    set: props => {
      if (isProductionEnvironment) external_mixpanel_browser_default.a.people.set(props);
    }
  }
};

// EXTERNAL MODULE: ./react-app/src/utils/isBrowser.js
var isBrowser = __webpack_require__("NsVv");

// CONCATENATED MODULE: ./react-app/src/state/utils/session.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class session_Session {
  constructor() {
    _defineProperty(this, "setSession", token => {
      localStorage.setItem(this.sessionName, token);
      const decoded = this.jwtDecode(token);
      Mixpanel.identify(decoded.id);
      Mixpanel.people.set({
        USER_ID: decoded.id,
        $email: decoded.email,
        status: decoded.status,
        exp: decoded.exp
      });
    });

    _defineProperty(this, "getToken", () => {
      return Object(isBrowser["a" /* default */])() ? localStorage.getItem(this.sessionName) : null;
    });

    _defineProperty(this, "getSession", () => {
      const token = this.getToken();
      return token ? this.jwtDecode(token) : null;
    });

    _defineProperty(this, "removeSession", () => {
      localStorage.removeItem(this.sessionName); // history._pushRoute(PATHS.ROOT_PATH);
    });

    _defineProperty(this, "allowedActionFor", (groups = []) => {
      let is_authorized = false;
      groups.forEach(g => {
        if (this.getSession().groups.includes(g)) {
          is_authorized = true;
        }
      });
      return is_authorized;
    });

    _defineProperty(this, "checkSession", () => {
      try {
        let logged = "no";

        if (this.getSession()) {
          logged = "si";

          if (this.getSession().status > 0) {
            const session = this.getSession();

            if (session) {
              if (this.utcSecondsToDatetime(session.exp) >= new Date()) {
                History["a" /* history */]._pushRoute(Paths["t" /* HOME_PATH */]);
              } else {
                this.removeSession();
              }
            }
          }
        }
      } catch (e) {
        History["a" /* history */]._pushRoute(Paths["t" /* HOME_PATH */]);
      }
    });

    _defineProperty(this, "utcSecondsToDatetime", utcSeconds => {
      if (utcSeconds) {
        const date = new Date(0); // The 0 there is the key, which sets the date to the epoch

        date.setUTCSeconds(utcSeconds);
        return date;
      } else {
        return null;
      }
    });

    _defineProperty(this, "isDummy", () => {
      try {
        if (this.getSession()) {
          const email = this.getSession().email;

          if (this.getSession().status === 0 && (email !== null && email !== void 0 && email.includes("myemail@") || email !== null && email !== void 0 && email.includes("@famosos.com") && "Anonymous")) {
            localStorage.removeItem(this.sessionName);
            return true;
          } else {
            return false;
          }
        }

        return true;
      } catch (e) {
        localStorage.removeItem(this.sessionName);
        return true;
      }
    });

    this.sessionName = "_a0_";
    this.visitKey = "_visit_";
    this.session = this.getSession();
  }

  applyRedirects() {
    this.session = this.getSession();

    History["a" /* history */]._pushRoute(Paths["x" /* ROOT_PATH */]);
  }

  jwtDecode(token) {
    try {
      if (token) {
        return external_jwt_decode_default()(token);
      }
    } catch (e) {
      return null;
    }
  }

  tokenExpired() {
    if (this.session) {
      if (this.utcSecondsToDatetime(this.session.exp) <= new Date()) {
        this.removeSession();
        return true;
      }
    }

    return false;
  }

  hasEmail() {
    const session = new session_Session();

    if (session.getSession()) {
      const email = session.getSession().email;

      if (email === null) {
        return false;
      } else {
        return email !== "" && email !== null && !(email !== null && email !== void 0 && email.includes("myemail@"));
      }
    }

    return false;
  }

}

/***/ }),

/***/ "i3sA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _state_ducks_celebrity_sections_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("xQtr");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);



const useCurrentVideoPlaying = () => {
  const currentVideoKey = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(({
    celebritySections
  }) => celebritySections.playVideoReducer);
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();

  const setCurrentPlayingVideo = videoKey => dispatch(Object(_state_ducks_celebrity_sections_actions__WEBPACK_IMPORTED_MODULE_0__[/* setPlayingVideo */ "b"])(videoKey));

  return [currentVideoKey, setCurrentPlayingVideo];
};

/* harmony default export */ __webpack_exports__["a"] = (useCurrentVideoPlaying);

/***/ }),

/***/ "kiQV":
/***/ (function(module) {

module.exports = JSON.parse("{\"b\":\"2.0.0\",\"a\":\"Famosos Webapp\"}");

/***/ }),

/***/ "lS7v":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const pickPropertiesFromAObject = (object, allowedKeys) => {
  if (typeof object !== "object") {
    throw new TypeError("The argument 'object' must be an object");
  }

  if (!Array.isArray(allowedKeys)) {
    throw new TypeError("The argument 'allowedKeys' must be an array");
  }

  if (allowedKeys.some(item => typeof item !== "string")) {
    throw new TypeError("The argument 'allowedKeys' must only has strings");
  }

  const entries = Object.entries(object);
  const filteredEntries = entries.filter(([key]) => allowedKeys.includes(key));
  return filteredEntries.reduce((newObject, [key, value]) => _objectSpread(_objectSpread({}, newObject), {}, {
    [key]: value
  }), {});
};

/* harmony default export */ __webpack_exports__["a"] = (pickPropertiesFromAObject);

/***/ }),

/***/ "lgZ/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ operations_namespaceObject; });

// UNUSED EXPORTS: paymentsEndpoints

// NAMESPACE OBJECT: ./react-app/src/state/ducks/payments/operations.js
var operations_namespaceObject = {};
__webpack_require__.r(operations_namespaceObject);
__webpack_require__.d(operations_namespaceObject, "listPaymentGateways", function() { return actions["e" /* listPaymentGateways */]; });
__webpack_require__.d(operations_namespaceObject, "currencyExchange", function() { return actions["b" /* currencyExchange */]; });
__webpack_require__.d(operations_namespaceObject, "getContractToPay", function() { return actions["d" /* getContractToPay */]; });
__webpack_require__.d(operations_namespaceObject, "discountCouponsGateways", function() { return actions["c" /* discountCouponsGateways */]; });
__webpack_require__.d(operations_namespaceObject, "clearCouponData", function() { return actions["a" /* clearCouponData */]; });

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// EXTERNAL MODULE: ./react-app/src/state/ducks/payments/types.js
var types = __webpack_require__("X2Lk");

// CONCATENATED MODULE: ./react-app/src/state/ducks/payments/reducers.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const fetchPaymentGatewaysInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    gateways: []
  }
};
const currencyExchangeInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {
    to: "USD"
  }
};
const getContractToPayInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const createDlocalPaymentInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const createStripePaymentInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: null
  },
  data: {}
};
const createPayPalPaymentInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const applyDiscountCouponInitialState = {
  loading: false,
  data: {},
  completed: false,
  error_data: null
};
function fetchDiscountCouponReducer(state = applyDiscountCouponInitialState, action) {
  switch (action.type) {
    case types["c" /* APPLY_DISCOUNT_COUPON */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case types["e" /* APPLY_DISCOUNT_COUPON_SUCCESS */]:
      return _objectSpread(_objectSpread({}, applyDiscountCouponInitialState), {}, {
        data: action.payload.data
      });

    case types["d" /* APPLY_DISCOUNT_COUPON_FAILURE */]:
      return _objectSpread(_objectSpread({}, applyDiscountCouponInitialState), {}, {
        error_data: action.payload.error
      });

    case types["b" /* APLY_DISCOUNT_COUPON_COMPLETED */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data,
        completed: true
      });

    case types["a" /* APLY_DISCOUNT_COUPON_CLEAR */]:
      return _objectSpread({}, applyDiscountCouponInitialState);

    default:
      return state;
  }
}
function fetchPaymentGatewaysReducer(state = fetchPaymentGatewaysInitialState, action) {
  switch (action.type) {
    case types["j" /* FETCH_PAYMENT_GATEWAYS_REQUEST */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case types["l" /* FETCH_PAYMENT_GATEWAYS_REQUEST_FAILURE */]:
      return _objectSpread(_objectSpread({}, fetchPaymentGatewaysInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["m" /* FETCH_PAYMENT_GATEWAYS_REQUEST_SUCCESS */]:
      return _objectSpread(_objectSpread({}, fetchPaymentGatewaysInitialState), {}, {
        data: action.payload.data
      });

    case types["k" /* FETCH_PAYMENT_GATEWAYS_REQUEST_COMPLETED */]:
      const data = action.payload.data;
      data.data = action.payload.data.data.reverse();
      return _objectSpread(_objectSpread({}, state), {}, {
        data: data,
        completed: true
      });

    default:
      return state;
  }
}
function currencyExchangeReducer(state = currencyExchangeInitialState, action) {
  switch (action.type) {
    case types["f" /* CURRENCY_EXCHANGE_REQUEST */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case types["h" /* CURRENCY_EXCHANGE_REQUEST_FAILURE */]:
      return _objectSpread(_objectSpread({}, currencyExchangeInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["i" /* CURRENCY_EXCHANGE_REQUEST_SUCCESS */]:
      return _objectSpread(_objectSpread({}, currencyExchangeInitialState), {}, {
        data: action.payload.data.data
      });

    case types["g" /* CURRENCY_EXCHANGE_REQUEST_COMPLETED */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data.data,
        completed: true
      });

    default:
      return state;
  }
}
function getContractToPayReducer(state = getContractToPayInitialState, action) {
  switch (action.type) {
    case types["n" /* GET_CONTRACT_TO_PAY_REQUEST */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case types["p" /* GET_CONTRACT_TO_PAY_REQUEST_FAILURE */]:
      return _objectSpread(_objectSpread({}, getContractToPayInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case types["q" /* GET_CONTRACT_TO_PAY_REQUEST_SUCCESS */]:
      return _objectSpread(_objectSpread({}, getContractToPayInitialState), {}, {
        data: action.payload.data.data
      });

    case types["o" /* GET_CONTRACT_TO_PAY_REQUEST_COMPLETED */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data.data,
        completed: true
      });

    default:
      return state;
  }
}
/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  fetchPaymentGatewaysReducer,
  currencyExchangeReducer,
  getContractToPayReducer,
  fetchDiscountCouponReducer
}));
// EXTERNAL MODULE: ./react-app/src/state/ducks/payments/actions.js
var actions = __webpack_require__("sgJn");

// CONCATENATED MODULE: ./react-app/src/state/ducks/payments/operations.js


// CONCATENATED MODULE: ./react-app/src/state/ducks/payments/paths.js
const apiVersion = "v1";
const BASE_PATH = `api/${apiVersion}/payment-viewsets/`;
// CONCATENATED MODULE: ./react-app/src/state/ducks/payments/index.js




/* harmony default export */ var payments = __webpack_exports__["a"] = (reducers);

/***/ }),

/***/ "nOHt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router2 = _interopRequireWildcard(__webpack_require__("elyg"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__("Osoz");

var _withRouter = _interopRequireDefault(__webpack_require__("0Bsm"));

exports.withRouter = _withRouter.default;
/* global window */

const singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

const urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath', 'locale', 'locales', 'defaultLocale', 'isReady', 'isLocaleDomain'];
const routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
const coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      const router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = (...args) => {
    const router = getRouter();
    return router[field](...args);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
      const _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...args);
        } catch (err) {
          console.error(`Error when running the Router event: ${eventField}`);
          console.error(`${err.message}\n${err.stack}`);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    const message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


const createRouter = (...args) => {
  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  const _router = router;
  const instance = {};

  for (const property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign(Array.isArray(_router[property]) ? [] : {}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = (...args) => {
      return _router[field](...args);
    };
  });
  return instance;
}

/***/ }),

/***/ "nivu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "PageContainer", function() { return /* binding */ _PageContainer; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrities/index.js + 1 modules
var celebrities = __webpack_require__("wsp3");

// EXTERNAL MODULE: ./react-app/src/components/common/routing/index.js + 3 modules
var routing = __webpack_require__("68Dr");

// EXTERNAL MODULE: ./react-app/src/components/layouts/currency-dropdown/constants.js
var constants = __webpack_require__("/u0D");

// EXTERNAL MODULE: ./react-app/src/state/ducks/payments/actions.js
var actions = __webpack_require__("sgJn");

// EXTERNAL MODULE: ./react-app/src/state/utils/gtm.js
var gtm = __webpack_require__("HkHs");

// CONCATENATED MODULE: ./react-app/src/utils/findAvailableCurrencyByName.js


const findAvailableCurrencyByName = name => constants["a" /* AVAILABLE_CURRENCIES */].find(item => item.name === name);

/* harmony default export */ var utils_findAvailableCurrencyByName = (findAvailableCurrencyByName);
// CONCATENATED MODULE: ./react-app/src/components/layouts/currency-dropdown/index.js
var __jsx = external_react_default.a.createElement;







const mapStateToProps = ({
  payments: {
    currencyExchangeReducer
  }
}) => ({
  currencyExchangeLoading: currencyExchangeReducer.loading,
  currencyExchangeData: currencyExchangeReducer.data
});

const mapDispatchToProps = {
  currencyExchange: actions["b" /* currencyExchange */]
};
const defaultCurrencyExchangeData = {
  to: "USD"
};

const defaultCurrencyExchange = () => {};

const CurrencyDropdownLayout = ({
  currencyExchange = defaultCurrencyExchange,
  currencyExchangeData = defaultCurrencyExchangeData
}) => {
  const handleCurrentCurrency = ({
    target: {
      value
    }
  }) => {
    const newCurrencyExchange = utils_findAvailableCurrencyByName(value);
    currencyExchange({
      from: currencyExchangeData.to.name,
      to: newCurrencyExchange.name
    });
    gtm["b" /* tagManagerDataLayer */]("CLICK_ON_DROPDOWN_CURRENCY", newCurrencyExchange);
  };

  const currentCurrency = utils_findAvailableCurrencyByName(currencyExchangeData.to);
  return __jsx("div", {
    className: "CurrencyDropdownLayout"
  }, __jsx("svg", {
    "data-v-19e79a88": "",
    xmlns: "http://www.w3.org/2000/svg",
    width: "100",
    height: "24",
    viewBox: "0 0 24 24"
  }, __jsx("path", {
    "data-v-19e79a88": "",
    d: "M16.293 9.293L12 13.586 7.707 9.293 6.293 10.707 12 16.414 17.707 10.707z"
  })), __jsx("img", {
    src: currentCurrency.flag,
    alt: currentCurrency.label
  }), __jsx("select", {
    className: "font-weight-bold",
    value: currentCurrency.name,
    onChange: handleCurrentCurrency
  }, constants["a" /* AVAILABLE_CURRENCIES */].map((item, index) => {
    return __jsx("option", {
      key: index,
      value: item.name
    }, item.name);
  })));
};

const _CurrencyDropdownLayout = Object(external_react_redux_["connect"])(mapStateToProps, mapDispatchToProps)(CurrencyDropdownLayout);


// EXTERNAL MODULE: external "lodash.debounce"
var external_lodash_debounce_ = __webpack_require__("Q4dm");
var external_lodash_debounce_default = /*#__PURE__*/__webpack_require__.n(external_lodash_debounce_);

// EXTERNAL MODULE: ./react-app/src/routing/History.js
var History = __webpack_require__("u3u/");

// EXTERNAL MODULE: ./react-app/src/routing/Paths.js
var Paths = __webpack_require__("c5JF");

// CONCATENATED MODULE: ./react-app/src/components/layouts/navbar-search/index.js
var navbar_search_jsx = external_react_default.a.createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const shouldFocusSearchKey = "SHOULD_FOCUS_SEARCH";

class navbar_search_NavbarSearchLayout extends external_react_["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "sendOnFocusAnalyticsData", () => gtm["b" /* tagManagerDataLayer */]("FOCUS_CELEBRITIES_SEARCH", {
      search: this.state.keyword,
      widget: this.constructor.name,
      path: window.location.pathname
    }));

    this.state = {
      keyword: this.props.queryParams.search || "",
      shouldFocus: false
    };
    this.searchRef = /*#__PURE__*/Object(external_react_["createRef"])();
    this.goToHome = this.goToHome.bind(this);
    this.debouncedOnSearchChange = external_lodash_debounce_default()(this.onSearchChange, 500);
  }

  componentDidUpdate() {
    const shouldFocusSearch = JSON.parse(localStorage.getItem(shouldFocusSearchKey));

    if (shouldFocusSearch) {
      this.searchRef.current.focus();
      localStorage.setItem(shouldFocusSearchKey, false);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.removeKeywords) {
      this.setState({
        keyword: ""
      });
    }
  }

  inputHandler({
    target
  }) {
    const value = target.value.replace(/('|%)/g, "");
    this.setState({
      keyword: value
    });
    this.debouncedOnSearchChange(value);
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.onSearchChange(this.state.keyword);
    }
  }

  handleBlur() {
    this.onSearchChange(this.state.keyword);
  }

  onSearchChange(keyword) {
    // if (this.props.isLoading) return; EVITAR QUE SE REALICEN MÁS PETICIONES
    if (keyword) localStorage.setItem(shouldFocusSearchKey, true);
    gtm["b" /* tagManagerDataLayer */]("CELEBRITIES_SEARCH_CHANGED", {
      search: this.state.keyword,
      widget: this.constructor.name,
      path: window.location.pathname
    });
    this.props.onSearchChange(keyword);
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  goToHome() {
    History["a" /* history */]._pushRoute(Paths["t" /* HOME_PATH */] + "?inputSearchFocus=true");
  }

  render() {
    return navbar_search_jsx("div", {
      className: "NavbarSearchLayout"
    }, navbar_search_jsx("div", {
      className: "form-group"
    }, navbar_search_jsx("div", {
      className: "input-group"
    }, navbar_search_jsx("i", {
      className: "fa fa-search",
      onClick: this.handleBlur.bind(this)
    }), navbar_search_jsx("input", {
      onFocus: this.sendOnFocusAnalyticsData,
      autoFocus: this.props.autoFocus,
      id: "input-search",
      className: "form-control",
      type: "text",
      name: "search",
      value: this.state.keyword,
      onKeyPress: this.handleKeyPress.bind(this),
      onChange: this.inputHandler.bind(this),
      placeholder: this.props.searchLabel,
      ref: this.searchRef
    }))));
  }

} // Set defaultProps


navbar_search_NavbarSearchLayout.defaultProps = {
  searchLabel: "Ej: Pibe Valderrama, Comediantes, Músicos",
  onSearchChange: function () {},
  autoFocus: false
}; // mapStateToProps

const navbar_search_mapStateToProps = state => ({
  isCompleted: state.celebrities.fetchCelebritiesReducer.completed,
  isLoading: state.celebrities.fetchCelebritiesReducer.loading
}); // mapStateToProps


const navbar_search_mapDispatchToProps = {
  updateQueryParams: celebrities["a" /* celebrityOperations */].updateQueryParams
}; // Export Class

const _NavbarSearchLayout = Object(external_react_redux_["connect"])(navbar_search_mapStateToProps, navbar_search_mapDispatchToProps)(navbar_search_NavbarSearchLayout);


// EXTERNAL MODULE: external "ua-parser-js"
var external_ua_parser_js_ = __webpack_require__("8rrE");
var external_ua_parser_js_default = /*#__PURE__*/__webpack_require__.n(external_ua_parser_js_);

// EXTERNAL MODULE: ./react-app/src/components/layouts/less-important-call-to-action-button/index.js
var less_important_call_to_action_button = __webpack_require__("zqBc");

// EXTERNAL MODULE: ./react-app/src/components/containers/login-button/login-button.js
var login_button = __webpack_require__("W7oW");

// CONCATENATED MODULE: ./react-app/src/components/layouts/dropdown-menu/index.js
var dropdown_menu_jsx = external_react_default.a.createElement;







const {
  type,
  vendor
} = new external_ua_parser_js_default.a().getDevice();
const isAppleDevice = vendor === "Apple";
const isHuaweiDevice = vendor === "Huawei";
const shouldRenderDownloadAppLink = type === "mobile" && !isAppleDevice && !isHuaweiDevice;
const DropdownMenuLayout = ({
  dropdownMenuIsOpen,
  setDropdownMenuIsOpen,
  isLogged
}) => {
  return dropdown_menu_jsx("div", {
    className: `DropdownMenuLayout dropdown ${dropdownMenuIsOpen ? "dropdown-menu-is-open" : ""}`
  }, dropdown_menu_jsx("button", {
    className: "btn DropdownMenuLayout__dropdown-button ml-3",
    type: "button",
    id: "dropdownMenuButton",
    "data-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "false",
    "aria-label": "dropdown toggle button",
    onClick: () => setDropdownMenuIsOpen(!dropdownMenuIsOpen)
  }, dropdown_menu_jsx("i", {
    className: `fa fa-${dropdownMenuIsOpen ? "times" : "bars"}`
  })), dropdown_menu_jsx("div", {
    onMouseOver: ({
      target
    }) => sendDropdownLinkAnalyticsData("HOVER", target),
    onClick: ({
      target
    }) => sendDropdownLinkAnalyticsData("CLICK", target),
    className: "dropdown-menu",
    "aria-labelledby": "dropdownMenuButton",
    style: dropdownMenuIsOpen ? {
      display: "block"
    } : {}
  }, isLogged ? dropdown_menu_jsx(external_react_default.a.Fragment, null, dropdown_menu_jsx(routing["a" /* NavLink */], {
    className: "dropdown-item",
    activeClassName: "active",
    to: Paths["l" /* CLIENT_PROFILE */]
  }, "Mi perfil"), dropdown_menu_jsx(routing["a" /* NavLink */], {
    className: "dropdown-item",
    activeClassName: "active",
    to: Paths["k" /* CLIENT_HIRINGS */]
  }, "Mis contrataciones")) : null, dropdown_menu_jsx("a", {
    className: "dropdown-item",
    href: Paths["u" /* LANDING_PATH */]
  }, "\xBFComo funciona?"), dropdown_menu_jsx(routing["a" /* NavLink */], {
    className: "dropdown-item",
    activeClassName: "active",
    to: Paths["c" /* BLOG */]
  }, "Blog"), !isLogged ? dropdown_menu_jsx(external_react_default.a.Fragment, null, dropdown_menu_jsx(login_button["a" /* default */], {
    className: "dropdown-item d-md-none"
  }), dropdown_menu_jsx(login_button["a" /* default */], {
    className: "dropdown-item d-md-none",
    text: "Registrarme"
  })) : null, dropdown_menu_jsx(routing["a" /* NavLink */], {
    className: "dropdown-item",
    activeClassName: "active",
    to: Paths["h" /* CELEBRITY_REQUEST */]
  }, "Aplicar como Famoso"), shouldRenderDownloadAppLink ? dropdown_menu_jsx("a", {
    href: "market://details?id=com.famosos.users",
    target: "_top",
    className: "text-decoration-none"
  }, dropdown_menu_jsx(less_important_call_to_action_button["a" /* LessImportantCallToActionButton */], {
    className: "dropdown-item border-0",
    width: "100%",
    fontSize: "0.875rem"
  }, "Descargar app de Android")) : null));
};
// EXTERNAL MODULE: external "@auth0/auth0-react"
var auth0_react_ = __webpack_require__("UdXN");

// EXTERNAL MODULE: ./react-app/src/components/common/helpers/maybe/index.tsx
var maybe = __webpack_require__("LeEe");

// EXTERNAL MODULE: external "next/dynamic"
var dynamic_ = __webpack_require__("/T1H");
var dynamic_default = /*#__PURE__*/__webpack_require__.n(dynamic_);

// CONCATENATED MODULE: ./react-app/src/components/layouts/navbar-section/index.js
var navbar_section_jsx = external_react_default.a.createElement;











const BannerPromoLayout = dynamic_default()(() => __webpack_require__.e(/* import() */ 58).then(__webpack_require__.bind(null, "VwDk")).then(mod => mod.BannerPromoLayout), {
  ssr: false,
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("VwDk")],
    modules: ["../banner-promo"]
  }
});
const sendDropdownLinkAnalyticsData = (eventName, target) => {
  if (!target.matches("a")) return;
  gtm["b" /* tagManagerDataLayer */](eventName + "_DROPDOWN_MENU_LINK", {
    widget: "NavbarSectionLayout",
    path: window.location.pathname,
    anchorInnerText: target.innerText,
    anchorHref: target.pathname
  });
};

const registerLogoLinkClick = () => gtm["b" /* tagManagerDataLayer */]("CLICK_LOGO_LINK", {
  widget: "NavbarSectionLayout",
  path: window.location.pathname
});

const NavbarSectionLayout = ({
  className,
  onSearchChange,
  showSearch,
  queryParams,
  dropdownMenuIsOpen,
  setDropdownMenuIsOpen,
  showCouponBanner,
  setShowCouponBanner
}) => {
  const {
    isLoading,
    isAuthenticated
  } = Object(auth0_react_["useAuth0"])();
  return navbar_section_jsx(external_react_default.a.Fragment, null, navbar_section_jsx("div", {
    className: `NavbarSectionLayout ${className}`
  }, navbar_section_jsx(BannerPromoLayout, {
    showCouponBanner: showCouponBanner,
    setShowCouponBanner: setShowCouponBanner
  }), navbar_section_jsx("div", {
    className: "top-bar container mx-auto p-0 row"
  }, navbar_section_jsx("div", {
    className: "top-bar__left-side col-4 p-0"
  }, navbar_section_jsx(DropdownMenuLayout, {
    dropdownMenuIsOpen: dropdownMenuIsOpen,
    setDropdownMenuIsOpen: setDropdownMenuIsOpen,
    isLogged: !isLoading && isAuthenticated
  })), navbar_section_jsx("div", {
    className: "top-bar__center-side col-4"
  }, navbar_section_jsx(routing["a" /* NavLink */], {
    to: Paths["x" /* ROOT_PATH */],
    className: "top-bar__logo-link",
    onClick: registerLogoLinkClick
  }, navbar_section_jsx("img", {
    className: "top-bar__logo",
    src: "/assets/img/famosos-logo.svg",
    alt: "Famosos Logo"
  }))), navbar_section_jsx("div", {
    className: "top-bar__right-side col-4 p-0 row m-0"
  }, navbar_section_jsx(maybe["a" /* default */], {
    it: !isAuthenticated
  }, navbar_section_jsx("div", {
    className: "col d-none d-md-flex  align-items-center"
  }, navbar_section_jsx(login_button["a" /* default */], {
    className: "btn btn-outline-primary ml-auto btn-sm top-bar__login-btn mt-1"
  }))), navbar_section_jsx("div", {
    className: "top-bar__currency mr-2 ml-auto"
  }, navbar_section_jsx(_CurrencyDropdownLayout, null))), navbar_section_jsx(maybe["a" /* default */], {
    it: showSearch
  }, navbar_section_jsx("div", {
    className: "col-12 pt-2 px-0"
  }, navbar_section_jsx("div", {
    className: "d-block top-bar__search-sm"
  }, navbar_section_jsx(_NavbarSearchLayout, {
    searchLabel: "Buscar famosos",
    onSearchChange: onSearchChange,
    queryParams: queryParams
  })))))));
};

NavbarSectionLayout.defaultProps = {
  className: "",
  onSearchChange: () => {},
  showSearch: true,
  showLogin: true
};

// EXTERNAL MODULE: ./package.json
var package_0 = __webpack_require__("kiQV");

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// CONCATENATED MODULE: ./react-app/src/components/layouts/footer/index.js
var footer_jsx = external_react_default.a.createElement;





class footer_FooterLayout extends external_react_["Component"] {
  constructor(props) {
    super(props);
    this.goToFAQs = this.goToFAQs.bind(this);
    this.goToPolicies = this.goToPolicies.bind(this);
    this.goToTerms = this.goToTerms.bind(this);
    this.goToFamososTwitter = this.goToFamososTwitter.bind(this);
    this.goToFamososFacebook = this.goToFamososFacebook.bind(this);
    this.goToFamososInstagran = this.goToFamososInstagran.bind(this);
    this.goToApply = this.goToApply.bind(this);
  }

  goToFAQs() {
    this.props.router.push(Paths["p" /* FAQS_PATH */]);
  }

  goToPolicies() {
    this.props.router.push(Paths["w" /* POLICIES_PATH */]);
  }

  goToTerms() {
    this.props.router.push(Paths["H" /* TERMS_PATH */]);
  }

  goToFamososTwitter() {
    window.open("https://www.twitter.com/famosos", "_blank").focus();
  }

  goToFamososFacebook() {
    window.open("https://www.facebook.com/contratafamosos", "_blank").focus();
  }

  goToFamososInstagran() {
    window.open("https://www.instagram.com/famosos/", "_blank").focus();
  }

  goToApply() {
    this.props.router.push(Paths["h" /* CELEBRITY_REQUEST */]);
  }

  render() {
    return footer_jsx("div", {
      className: "FooterLayout"
    }, footer_jsx("footer", {
      className: "footer"
    }, footer_jsx("div", {
      className: "container",
      style: {
        maxWidth: "1300px",
        zoom: "0.9"
      }
    }, footer_jsx("div", {
      className: "row"
    }, footer_jsx("div", {
      className: "col-12 col-md-4 col-lg-4 col-one"
    }, footer_jsx("div", {
      className: "col-image"
    }, footer_jsx("img", {
      className: "text-dark",
      src: "/assets/img/famosos-white-logo.svg",
      alt: "Logo"
    })), footer_jsx("div", {
      className: "col-description"
    }, "Es una compa\xF1\xEDa dedicada a crear tecnolog\xEDas", footer_jsx("br", null), "que conecten personalidades con su fan base."), footer_jsx("p", {
      className: "mb-0"
    }, package_0["a" /* description */], " v", package_0["b" /* version */])), footer_jsx("div", {
      className: "col-12 col-md-4 col-lg-4 col-two"
    }, footer_jsx("div", {
      className: "col-title"
    }, "\xBFEres una celebridad o influencer?"), footer_jsx("div", {
      className: "col-button"
    }, footer_jsx("button", {
      className: "btn btn-apply",
      onClick: this.goToApply
    }, "Aplica como Famoso"))), footer_jsx("div", {
      className: "col-12 col-md-4 col-lg-4 col-three"
    }, footer_jsx("ul", {
      className: "list-inline"
    }, footer_jsx("li", {
      className: "list-inline-item mr-3 font-weight-bold"
    }, "S\xEDguenos en Redes"), footer_jsx("li", {
      className: "list-inline-item mr-3",
      onClick: this.goToFamososFacebook
    }, footer_jsx("img", {
      className: "cursor-pointer",
      src: "/assets/img/facebook-white.svg",
      width: "30px",
      alt: "Facebook"
    })), footer_jsx("li", {
      className: "list-inline-item mr-3",
      onClick: this.goToFamososInstagran
    }, footer_jsx("img", {
      className: "cursor-pointer",
      src: "/assets/img/instagram-white.svg",
      width: "30px",
      alt: "Instagram"
    }))), footer_jsx("ul", {
      className: "list-inline"
    }, footer_jsx("li", {
      className: "list-inline-item mr-2 cursor-pointer font-weight-bold"
    }, footer_jsx("span", {
      className: "small",
      onClick: this.goToFAQs
    }, "FAQ's")), footer_jsx("li", {
      className: "list-inline-item ml-2 mr-2 cursor-pointer font-weight-bold"
    }, footer_jsx("span", {
      className: "small",
      onClick: this.goToPolicies
    }, "Privacidad")), footer_jsx("li", {
      className: "list-inline-item ml-2 cursor-pointer font-weight-bold"
    }, footer_jsx("span", {
      className: "small",
      onClick: this.goToTerms
    }, "T\xE9rminos y Condiciones"))), footer_jsx("div", {
      className: "col-copyright"
    }, "\xA9 2020 Famosos, Inc. All Rights Reserved."))))));
  }

}

const _FooterLayout = Object(router_["withRouter"])(footer_FooterLayout);


// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrities/reducers.js
var reducers = __webpack_require__("aCqb");

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrity-likes/index.js + 2 modules
var celebrity_likes = __webpack_require__("bqfv");

// EXTERNAL MODULE: ./react-app/src/state/ducks/rest-countries/index.js + 5 modules
var rest_countries = __webpack_require__("Sa7d");

// EXTERNAL MODULE: external "react-headroom"
var external_react_headroom_ = __webpack_require__("Nox7");
var external_react_headroom_default = /*#__PURE__*/__webpack_require__.n(external_react_headroom_);

// EXTERNAL MODULE: ./react-app/src/components/layouts/filters-section/index.js + 4 modules
var filters_section = __webpack_require__("KKHI");

// CONCATENATED MODULE: ./react-app/src/utils/CancellablePromise.js
class CancellablePromise extends Promise {
  constructor(executor) {
    let cancel;

    const cancellableExecutor = (resolve, reject) => {
      cancel = () => reject("Promise cancelled");

      executor(resolve, reject);
    };

    super(cancellableExecutor);
    this.cancel = cancel;
  }

}

/* harmony default export */ var utils_CancellablePromise = (CancellablePromise);
// CONCATENATED MODULE: ./react-app/src/utils/waitFor.js


const waitFor = (resultCallback = () => true, intervalInSeconds = 1000, totalTries = 10) => {
  if (typeof resultCallback !== "function") {
    throw new TypeError("Received `resultCallback` arg must be a function");
  }

  if (typeof intervalInSeconds !== "number") {
    throw new TypeError("Received `intervalInSeconds` arg must be a number");
  }

  if (typeof totalTries !== "number") {
    throw new TypeError("Received `totalTries` arg must be a number");
  }

  let tries = totalTries;
  const firstTry = resultCallback();
  tries--;

  if (firstTry) {
    return firstTry;
  }

  let interval;
  const cancellablePromise = new utils_CancellablePromise(resolve => {
    interval = setInterval(() => {
      if (!tries) resolve(null);
      const result = resultCallback();

      if (result) {
        resolve(result);
        clearInterval(interval);
      } else {
        tries--;
      }
    }, intervalInSeconds);
  });
  cancellablePromise.catch(() => clearInterval(interval));
  return cancellablePromise;
};

/* harmony default export */ var utils_waitFor = (waitFor);
// CONCATENATED MODULE: ./react-app/src/utils/initializeBotMaker.tsx
const initializeBotMaker = document => {
  if (!document) {
    throw new TypeError("The arg 'document' is required");
  }

  const scriptSrc = "https://go.botmaker.com/rest/webchat/p/doBK198kWI1c/init.js";
  if (document.querySelector(`script[src="${scriptSrc}"`)) return;
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = scriptSrc;
  document.body.appendChild(script);
};

/* harmony default export */ var utils_initializeBotMaker = (initializeBotMaker);
// CONCATENATED MODULE: ./react-app/src/components/layouts/page-container/index.js
var page_container_jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { page_container_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function page_container_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

















const CookiesConsent = dynamic_default()(() => __webpack_require__.e(/* import() */ 60).then(__webpack_require__.bind(null, "UnJu")).then(mod => mod.CookiesConsent), {
  ssr: false,
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("UnJu")],
    modules: ["../cookies-consent"]
  }
});

const PageContainer = (_ref) => {
  let {
    hasDiscountCoupon,
    cleanUserCelebrityLikes,
    restCountries,
    applyFetchUserCelebrityLikes,
    fetchUserCelebrityLikes,
    shouldFetchRestCountries,
    listRestCountries,
    queryParams,
    updateQueryParams,
    showBotMakerFrame,
    router
  } = _ref,
      props = _objectWithoutProperties(_ref, ["hasDiscountCoupon", "cleanUserCelebrityLikes", "restCountries", "applyFetchUserCelebrityLikes", "fetchUserCelebrityLikes", "shouldFetchRestCountries", "listRestCountries", "queryParams", "updateQueryParams", "showBotMakerFrame", "router"]);

  const {
    0: botMakerChild,
    1: setBotMakerChild
  } = Object(external_react_["useState"])(undefined);
  const {
    0: dropdownMenuIsOpen,
    1: setDropdownMenuIsOpen
  } = Object(external_react_["useState"])(false);
  const {
    0: showCouponBanner,
    1: setShowCouponBanner
  } = Object(external_react_["useState"])(hasDiscountCoupon);

  const cancelPreviousWaitFor = () => {
    if (botMakerChild && botMakerChild.cancel) {
      botMakerChild.cancel();
    }
  };

  const setBotmakerDisplay = botMakerChild => {
    if (!botMakerChild) return;
    botMakerChild.parentElement.classList.toggle("d-none", !showBotMakerFrame);
  };

  const onSearchChange = keyword => {
    const newQueryParams = _objectSpread(_objectSpread({}, queryParams), {}, {
      offset: reducers["b" /* updateQueryParamsInitialState */].offset,
      limit: reducers["b" /* updateQueryParamsInitialState */].limit,
      search: keyword
    });

    updateQueryParams(newQueryParams, router);
  };

  const changeBotmakerDisplay = () => {
    cancelPreviousWaitFor();
    const botMakerChild = utils_waitFor(() => {
      var _document$querySelect;

      return document.querySelector("iframe[title='Botmaker']") || ((_document$querySelect = document.querySelector("img[src='https://storage.googleapis.com/m-infra.appspot.com/public/whatsapp/Whatsapp_logo.svg']")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.parentElement);
    }, 500, 1000);
    const isAsync = typeof botMakerChild.then === "function";

    if (isAsync) {
      botMakerChild.then(setBotmakerDisplay);
      setBotMakerChild(botMakerChild);
    } else {
      setBotmakerDisplay(botMakerChild);
    }
  };

  Object(external_react_["useEffect"])(() => {
    if (showBotMakerFrame) {
      utils_initializeBotMaker(document);
    }

    changeBotmakerDisplay();
    return () => {
      cancelPreviousWaitFor();
    };
  }, [showBotMakerFrame]);

  const handleChangeDropdownMenuIsOpen = dropdownMenuIsOpen => {
    gtm["b" /* tagManagerDataLayer */]("CLICK_ON_DROPDOWN_MENU", {
      dropdownMenuIsOpen,
      widget: "NavbarSectionLayout",
      path: window.location.pathname
    });
    setDropdownMenuIsOpen(dropdownMenuIsOpen);
  };

  Object(external_react_["useEffect"])(() => {
    cleanUserCelebrityLikes();

    if (applyFetchUserCelebrityLikes) {
      fetchUserCelebrityLikes();
    }

    if (shouldFetchRestCountries && restCountries.length === 0) {
      listRestCountries();
    }
  }, []);
  const hasSearchedOrFiltered = queryParams !== reducers["b" /* updateQueryParamsInitialState */];
  return page_container_jsx("div", {
    className: "PageContainer"
  }, page_container_jsx(external_react_headroom_default.a, {
    style: {
      zIndex: 100000
    },
    upTolerance: 2.5
  }, page_container_jsx(maybe["a" /* default */], {
    it: props.showNavbar
  }, page_container_jsx(NavbarSectionLayout, {
    className: hasSearchedOrFiltered ? "hidden-hero" : "",
    onSearchChange: onSearchChange,
    showInputSearchSm: props.showInputSearchSm,
    showSearch: props.showSearch,
    showNavbarButtons: props.showNavbarButtons,
    showSearchWeb: props.showSearchWeb,
    showLogin: props.showLogin,
    showFiltersSection: props.showFiltersSection,
    hideControls: props.hideControls,
    dropdownMenuIsOpen: dropdownMenuIsOpen,
    setDropdownMenuIsOpen: setDropdownMenuIsOpen,
    queryParams: queryParams,
    showCouponBanner: showCouponBanner,
    setShowCouponBanner: setShowCouponBanner
  })), page_container_jsx(maybe["a" /* default */], {
    it: props.showFiltersSection
  }, page_container_jsx(filters_section["a" /* FiltersSectionLayout */], null))), page_container_jsx("div", {
    className: `page-container-children ${!props.showSearch ? "hidden-search" : ""}`
  }, props.children, page_container_jsx("div", {
    className: `page-container-children-helper ${dropdownMenuIsOpen ? "active" : ""}`
  })), page_container_jsx(maybe["a" /* default */], {
    it: props.showFooter
  }, page_container_jsx(_FooterLayout, null)), page_container_jsx("img", {
    src: "/assets/img/avatar-blank.png",
    style: {
      display: "none"
    },
    alt: "Imagen de Avatar vaci\xF3 pre-cagada"
  }), page_container_jsx("img", {
    className: "d-none",
    src: "/assets/img/wifi-connection-error.svg",
    alt: "Imagen de Error de conexi\xF3n de internet pre-cargada"
  }), page_container_jsx(CookiesConsent, null));
}; // Set propTypes


// Set defaultProps
PageContainer.defaultProps = {
  applyFetchCelebrities: false,
  celebrities: [],
  paginationData: {},
  onSearchChange: () => {},
  queryParams: {},
  showFooter: true,
  showNavbar: true,
  showSearch: true,
  showNavbarButtons: true,
  showSearchWeb: true,
  showInputSearchSm: true,
  showLogin: true,
  hideControls: false,
  showVideoCallsResearch: false,
  shouldFetchRestCountries: true,
  showBotMakerFrame: false
}; // mapStateToProps

const page_container_mapStateToProps = state => {
  return {
    restCountries: state.restCountries.fetchCountriesReducer.data,
    isLoading: state.celebrities.fetchCelebritiesReducer.loading,
    celebrities: state.celebrities.fetchCelebritiesReducer.data.results,
    paginationData: state.celebrities.fetchCelebritiesReducer.data.informationPage,
    hasDiscountCoupon: state.discountCoupons.getDiscountCouponBannerReducer.data.couponCode && state.discountCoupons.timeDifferenceReducer
  };
}; // mapStateToProps


const page_container_mapDispatchToProps = {
  updateQueryParams: celebrities["a" /* celebrityOperations */].updateQueryParams,
  fetchUserCelebrityLikes: celebrity_likes["a" /* celebrityLikesOperations */].fetchUserCelebrityLikes,
  cleanUserCelebrityLikes: celebrity_likes["a" /* celebrityLikesOperations */].fetchUserCelebrityLikesCleanUp,
  listRestCountries: rest_countries["b" /* restCountriesOperations */].list
}; // Export Class

const _PageContainer = Object(external_react_redux_["connect"])(page_container_mapStateToProps, page_container_mapDispatchToProps)(Object(routing["c" /* withRouter */])(PageContainer));



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

/***/ }),

/***/ "oI26":
/***/ (function(module, exports) {

module.exports = require("react-window");

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

/***/ "q6S/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EndMessageLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const goBackUp = offsetTop => {
  document.documentElement.scroll({
    top: offsetTop,
    behavior: "smooth"
  });
};

const EndMessageLayout = ({
  offsetTop,
  onClick
}) => __jsx("p", {
  className: "text-center"
}, __jsx("button", {
  type: "button",
  onClick: () => {
    goBackUp(offsetTop);
    onClick();
  },
  className: "btn btn-primary mt-2"
}, "Volver arriba"));
EndMessageLayout.defaultProps = {
  offsetTop: 0,
  onClick: () => {}
};

/***/ }),

/***/ "qB8v":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("xnum");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const CustomHead = ({
  title = "Famosos.com - Videos personalizados de tus famosos favoritos.",
  description = "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas.",
  ogUrl = "https://www.famosos.com",
  ogImage = "/assets/img/famosos-share-icon.png",
  ogVideo = "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5",
  children
}) => {
  return __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, null, __jsx("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
  }), __jsx("title", {
    key: "title"
  }, title), __jsx("meta", {
    property: "og:title",
    content: title
  }), __jsx("meta", {
    property: "og:description",
    content: description
  }), __jsx("meta", {
    property: "og:url",
    content: ogUrl
  }), __jsx("meta", {
    property: "og:image",
    content: ogImage
  }), __jsx("meta", {
    property: "og:video",
    content: ogVideo
  }), __jsx("meta", {
    property: "og:video:url",
    content: ogVideo
  }), __jsx("meta", {
    property: "og:video:secure_url",
    content: ogVideo
  }), children);
};

/* harmony default export */ __webpack_exports__["a"] = (CustomHead);

/***/ }),

/***/ "qkmH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MODEL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PROCESS_SUBSCRIPTION_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return USER_SUBSCRIPTIONS_PATH; });
const MODEL = `user-subscriptions`;
const PROCESS_SUBSCRIPTION_PATH = `custom-endpoints/${MODEL}/process-subscription`;
const USER_SUBSCRIPTIONS_PATH = `custom-endpoints/${MODEL}/list`;

/***/ }),

/***/ "qqGZ":
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/Modal");

/***/ }),

/***/ "rKB8":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "rlcS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return updateQueryParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return list; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return fetchSimilarResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return listSimilar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return listReviews; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return listPublicContracts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return fetchSimilarCelebrities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cleanPublicContracts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fetchFlashDeliveryCelebrities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fetchCelebritySubscriptionPlans; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return setCelebrityProfileVersion; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5dN8");
/* harmony import */ var _utils_apiService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("XruL");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7Nk7");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("808T");
/* harmony import */ var _routing_Paths__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("c5JF");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("aCqb");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






 // import * as firestoreService from "../../../firebase/firestoreService";

const firestoreService = {
  getDocuments() {}

};

const getValidParams = params => {
  const paramsEntries = Object.entries(params);
  const onlyValidParamsEntries = paramsEntries.filter(([key, value]) => Boolean(value));
  return Object.fromEntries(onlyValidParamsEntries);
};

const updateQueryParams = (params, router) => dispatch => {
  const newParams = getValidParams(params);
  dispatch({
    type: _types__WEBPACK_IMPORTED_MODULE_0__[/* UPDATE_QUERY_PARAMS */ "O"],
    payload: {
      params: _objectSpread(_objectSpread({}, _reducers__WEBPACK_IMPORTED_MODULE_5__[/* updateQueryParamsInitialState */ "b"]), newParams)
    }
  });

  if (newParams.offset) {
    router.replace(_routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* SEARCH_PATH */ "y"] + Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* jsonToQueryString */ "b"])(newParams));
  } else {
    const previousPathname = router.pathname;

    if (previousPathname !== _routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* SEARCH_PATH */ "y"]) {
      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_0__[/* SET_PREVIOUS_PATH */ "N"],
        payload: previousPathname
      });
    }

    router.push(_routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* SEARCH_PATH */ "y"] + Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* jsonToQueryString */ "b"])(newParams));
  }
};
const get = (object_id, preloaded = false) => {
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* GET_CELEBRITY_REQUEST */ "H"];
    const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* GET */ "c"] + object_id;
    dispatch({
      type: TYPE,
      payload: {}
    });
    return Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null
    }).then(res => {
      if ("status" in res.data && res.data.status === "ERROR" || !res.data.data.username) {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res);
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res);

        if (preloaded) {
          dispatch(listReviews(res.data.data.id, {
            currentPage: 1
          }));
          dispatch(listPublicContracts(res.data.data.id, {
            currentPage: 1
          }));
        }

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      }
    }).catch(err => {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
    });
  };
};
const list = params => {
  return (dispatch, getStore) => {
    var _getStore$celebrities, _getStore$celebrities2;

    (_getStore$celebrities = getStore().celebrities.fetchCelebritiesReducer) === null || _getStore$celebrities === void 0 ? void 0 : (_getStore$celebrities2 = _getStore$celebrities.requestCancel) === null || _getStore$celebrities2 === void 0 ? void 0 : _getStore$celebrities2.call(_getStore$celebrities);
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* FETCH_CELEBRITIES_REQUEST */ "b"];
    const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* LIST */ "d"];
    const request = Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: _objectSpread(_objectSpread({}, params), {}, {
        limit: params.limit || _reducers__WEBPACK_IMPORTED_MODULE_5__[/* updateQueryParamsInitialState */ "b"].limit
      }),
      body: null,
      isCancellable: true
    });
    dispatch({
      type: TYPE,
      payload: {
        requestCancel: request.cancel
      }
    });
    request.then(res => {
      if (res.data.status === "OK") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res); // Other actions

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      } // else {
      //     handleApiResponseFailure(dispatch, TYPE, res);
      //     // Other actions
      //
      // }

    }).catch(err => {
      if (err.constructor.name === "Cancel") return;
      console.log(err); // handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
    });
    return request;
  };
};
const fetchSimilarResults = params => {
  return (dispatch, getStore) => {
    var _getStore$celebrities3, _getStore$celebrities4;

    (_getStore$celebrities3 = getStore().celebrities.fetchCelebritiesReducer) === null || _getStore$celebrities3 === void 0 ? void 0 : (_getStore$celebrities4 = _getStore$celebrities3.requestCancel) === null || _getStore$celebrities4 === void 0 ? void 0 : _getStore$celebrities4.call(_getStore$celebrities3);
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST */ "f"];
    const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* SUGGESTED_PUBLIC_LIST */ "h"];
    const request = Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: _objectSpread(_objectSpread({}, params), {}, {
        limit: params.limit || _reducers__WEBPACK_IMPORTED_MODULE_5__[/* updateQueryParamsInitialState */ "b"].limit
      }),
      body: null,
      isCancellable: true
    });
    dispatch({
      type: TYPE,
      payload: {
        requestCancel: request.cancel
      }
    });
    request.then(res => {
      if (res.data.status === "OK") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res);
        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      }
    }).catch(err => {
      if (err.constructor.name === "Cancel") return;
      console.log(err);
    });
  };
};
const listSimilar = params => {
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* FETCH_SIMILAR_CELEBRITIES_REQUEST */ "z"];
    const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* LIST */ "d"];
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: params,
      body: null
    }).then(res => {
      if (res.data.status === "OK") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res); // Other actions

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res); // Other actions
      }
    }).catch(err => {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, {
        data: {
          api_error: err,
          error: "Server 500"
        }
      });
    });
  };
};
const listReviews = (celebrity_id, params = {}) => {
  if (params["pageSize"] === undefined) params["pageSize"] = 6;
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* FETCH_REVIEWS_REQUEST */ "v"];
    const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* REVIEWS */ "f"] + celebrity_id;
    dispatch({
      type: TYPE,
      payload: {}
    });
    return Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: params,
      body: null
    }).then(res => {
      if (res.data.status === "OK") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res); // Other actions

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res); // Other actions
      }
    }).catch(err => {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, {
        data: {
          api_error: err,
          error: "Server 500"
        }
      });
    });
  };
};
const listPublicContracts = (celebrity_id, params = {}) => {
  if (params["pageSize"] === undefined) params["pageSize"] = 8;
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* FETCH_PUBLIC_CONTRACTS_REQUEST */ "r"];
    const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* PUBLIC_CONTRACTS */ "e"] + celebrity_id;
    dispatch({
      type: TYPE,
      payload: {}
    });
    return Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: params,
      body: null
    }).then(res => {
      if (res.data.status === "OK") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res); // Other actions

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res); // Other actions
      }
    }).catch(err => {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, {
        data: {
          api_error: err,
          error: "Server 500"
        }
      });
    });
  };
};
const fetchSimilarCelebrities = celebrityUsername => dispatch => {
  const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* FETCH_SIMILAR_CELEBRITIES_REQUEST */ "z"];
  const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* SIMILAR_CELEBRITIES */ "g"] + celebrityUsername;
  dispatch({
    type: TYPE,
    payload: {}
  });
  Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH,
    async: true,
    body: null
  }).then(res => {
    if (res.data.status === "OK") {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res);
      dispatch({
        type: `${TYPE}_COMPLETED`,
        payload: res
      });
    } else {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res);
    }
  }).catch(err => {
    Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, {
      data: {
        api_error: err,
        error: "Server 500"
      }
    });
  });
};
const cleanPublicContracts = () => ({
  type: _types__WEBPACK_IMPORTED_MODULE_0__[/* CLEAN_PUBLIC_CONTRACTS */ "a"]
});
const fetchFlashDeliveryCelebrities = () => async dispatch => {
  const environment = "qa";
  const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST */ "n"];
  const FINAL_PATH = `${_paths__WEBPACK_IMPORTED_MODULE_3__[/* FLASH_DELIVERY_CELEBRITIES */ "b"]}${environment === "development" ? "_testing" : ""}`;
  dispatch({
    type: TYPE,
    payload: {}
  });

  try {
    const docs = await firestoreService.getDocuments(FINAL_PATH);
    dispatch({
      type: `${TYPE}_SUCCESS`,
      payload: docs
    });
  } catch (error) {
    dispatch({
      type: `${TYPE}_FAILURE`,
      payload: error
    });
  } finally {
    dispatch({
      type: `${TYPE}_COMPLETED`,
      payload: {}
    });
  }
};
const fetchCelebritySubscriptionPlans = celebrityUsername => dispatch => {
  const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST */ "j"];
  const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* CELEBRITY_SUBSCRIPTION_PLANS */ "a"].replace(":celebrity_username", celebrityUsername);
  dispatch({
    type: TYPE,
    payload: {}
  });
  Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH,
    async: true,
    body: null
  }).then(res => {
    if (res.data.status === "OK") {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res);
      dispatch({
        type: `${TYPE}_COMPLETED`,
        payload: res
      });
    } else {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res);
    }
  }).catch(err => {
    Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, {
      data: {
        api_error: err,
        error: "Server 500"
      }
    });
  });
};
const setCelebrityProfileVersion = payload => ({
  type: _types__WEBPACK_IMPORTED_MODULE_0__[/* SET_CELEBRITY_PROFILE_VERSION */ "M"],
  payload
});

/***/ }),

/***/ "sXAn":
/***/ (function(module, exports) {



/***/ }),

/***/ "sgJn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return listPaymentGateways; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return currencyExchange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getContractToPay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return processStripePayment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return processPayPalPayment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return retrieveUserCards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return removeSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return clearCouponData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return discountCouponsGateways; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("X2Lk");
/* harmony import */ var _utils_apiService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("XruL");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7Nk7");
/* harmony import */ var _routing_History__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("u3u/");
/* harmony import */ var _routing_Paths__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("c5JF");
/* harmony import */ var _components_layouts_currency_dropdown_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("/u0D");
/* harmony import */ var _utils_gtm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("HkHs");







const listPaymentGateways = currency => {
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* FETCH_PAYMENT_GATEWAYS_REQUEST */ "j"];
    const FINAL_PATH = "/custom-endpoints/gateway-payment-methods/available-payment-methods/" + currency;
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null,
      custom_endpoint: false
    }).then(res => {
      if (res.data.status === "OK") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res); // Other actions

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res); // Other actions
      }
    }).catch(err => {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
    });
  };
};
const currencyExchange = params => {
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* CURRENCY_EXCHANGE_REQUEST */ "f"];
    const FINAL_PATH = "custom-endpoints/gateway-payment-methods/currency-exchange";
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: params,
      body: null,
      custom_endpoint: false
    }).then(res => {
      if (res.data.status === "OK") {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res); // Other actions

        if (!_components_layouts_currency_dropdown_constants__WEBPACK_IMPORTED_MODULE_5__[/* AVAILABLE_CURRENCIES */ "a"].find(x => x.implemented_by_dlocal === false && x.name === params.to)) {
          dispatch(listPaymentGateways(params.to));
        } else {
          dispatch(listPaymentGateways("USD"));
        }

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        });
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res); // Other actions
      }
    }).catch(err => {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
    });
  };
};
const getContractToPay = contractReference => {
  return async dispatch => {
    setTimeout(function () {
      // Get Contract to Pay
      const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* GET_CONTRACT_TO_PAY_REQUEST */ "n"];
      const FINAL_PATH = "custom-endpoints/contracts/contract-to-pay/" + contractReference;
      dispatch({
        type: TYPE,
        payload: {}
      });
      Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
        method: "GET",
        action: TYPE,
        path: FINAL_PATH,
        async: true,
        params: null,
        body: null
      }).then(res => {
        if ("status" in res.data && res.data.status === "ERROR") {
          Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res); // Other actions
          // history._pushRoute(ROUTING_PATHS.CLIENT_HIRINGS);
        } else {
          if (res.data.data.status >= 6) {
            _routing_History__WEBPACK_IMPORTED_MODULE_3__[/* history */ "a"]._pushRoute(_routing_Paths__WEBPACK_IMPORTED_MODULE_4__[/* CONTRACT_CREATED */ "n"].replace(":contract_reference", res.data.data.reference));
          } else {
            Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res); // Other actions

            dispatch({
              type: `${TYPE}_COMPLETED`,
              payload: res
            });
          }
        }
      }).catch(err => {
        // history._pushRoute(ROUTING_PATHS.HOME_PATH);
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
      });
    }, 1000);
  };
};
const processStripePayment = (contractReference, sourceId, discountCouponId) => {
  const FINAL_PATH = "custom-endpoints/user-payments/process-stripe-payment";
  const data = {
    contractReference: contractReference,
    sourceId: sourceId,
    discountCouponId: discountCouponId
  };
  return Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    method: "POST",
    action: null,
    path: FINAL_PATH,
    async: true,
    params: null,
    body: data,
    custom_endpoint: false
  });
};
const processPayPalPayment = (contractReference, orderId, authorizationId, discountCouponId) => {
  const FINAL_PATH = "custom-endpoints/user-payments/process-paypal-payment";
  const data = {
    contractReference: contractReference,
    orderId: orderId,
    authorizationId: authorizationId,
    discountCouponId: discountCouponId
  };
  return new Promise((resolutionFunc, rejectionFunc) => {
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "POST",
      action: null,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: data,
      custom_endpoint: false
    }).then(res => {
      if (res.data.status === "ERROR") {
        rejectionFunc(res.data.error);
      } else {
        resolutionFunc(res.data.data);
      }
    }).catch(error => {
      if (error.response) {
        if (error.response.data) {
          rejectionFunc(error.response.data.error);
        }
      } else {
        rejectionFunc("Ocurrió un error procesando tu pago,");
      }
    });
  });
};
const retrieveUserCards = () => {
  const FINAL_PATH = "custom-endpoints/user-payments/retrieve-stripe-customer-sources";
  return new Promise((resolutionFunc, rejectionFunc) => {
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "GET",
      action: null,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null,
      custom_endpoint: false
    }).then(res => {
      if (res.data.status === "ERROR") {
        rejectionFunc(res.data.error);
      } else {
        resolutionFunc(res.data.data);
      }
    }).catch(error => {
      if (error.response) {
        if (error.response.data) {
          rejectionFunc(error.response.data.error);
        }
      } else {
        rejectionFunc("ERROR");
      }
    });
  });
};
const removeSource = sourceId => {
  const FINAL_PATH = "custom-endpoints/user-payments/remove-stripe-source/" + sourceId;
  return new Promise((resolutionFunc, rejectionFunc) => {
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "DELETE",
      action: null,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null,
      custom_endpoint: false
    }).then(res => {
      if (res.data.status === "ERROR") {
        rejectionFunc(res.data.error);
      } else {
        resolutionFunc(res.data.data);
      }
    }).catch(error => {
      if (error.response) {
        if (error.response.data) {
          rejectionFunc(error.response.data.error);
        }
      } else {
        rejectionFunc("ERROR");
      }
    });
  });
};
const clearCouponData = () => {
  return dispatch => {
    dispatch({
      type: _types__WEBPACK_IMPORTED_MODULE_0__[/* APLY_DISCOUNT_COUPON_CLEAR */ "a"],
      payload: {}
    });
  };
};
const discountCouponsGateways = (contractReference, discountCoupon) => {
  const data = {
    contractReference: contractReference,
    discountCoupon: discountCoupon
  };
  return dispatch => {
    const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* APPLY_DISCOUNT_COUPON */ "c"];
    const FINAL_PATH = "custom-endpoints/user-payments/apply-discount-coupon";
    Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
      method: "POST",
      path: FINAL_PATH,
      async: true,
      params: null,
      body: data
    }).then(res => {
      if (res.data.status === "OK") {
        const couponData = res.data;

        if (couponData.data.isPercentageDiscount && couponData.data.discount_amount > 1) {
          couponData.data.discount_amount = couponData.data.discount_amount / 100;
        }

        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, couponData); // Other actions

        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: couponData
        });
      } else {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res); // Other actions
      }
    }).catch(err => {
      if (err.response) {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, err.response.data);
      }
    });
  };
};

/***/ }),

/***/ "tlnx":
/***/ (function(module, exports) {

module.exports = require("jwt-decode");

/***/ }),

/***/ "u3u/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _state_utils_gtm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HkHs");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "a", function() { return next_router__WEBPACK_IMPORTED_MODULE_1___default.a; });



next_router__WEBPACK_IMPORTED_MODULE_1___default.a._pushRoute = function (route) {
  _state_utils_gtm__WEBPACK_IMPORTED_MODULE_0__[/* tagManagerDataLayer */ "b"]("PAGE_VIEW", this.asPath);
  this.push(route);
}; // Router.location = {
//   search: String(Router.asPath).replace(Router.pathname, "")
// };




/***/ }),

/***/ "uM63":
/***/ (function(module, exports) {

module.exports = require("react-number-format");

/***/ }),

/***/ "vMIY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ operations_namespaceObject; });

// UNUSED EXPORTS: celebrityRequestEndpoints

// NAMESPACE OBJECT: ./react-app/src/state/ducks/celebrity-requests/operations.js
var operations_namespaceObject = {};
__webpack_require__.r(operations_namespaceObject);
__webpack_require__.d(operations_namespaceObject, "saveRequest", function() { return saveRequest; });

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-requests/types.js
// SAVE CELEBRITY_REQUEST
const SAVE_CELEBRITY_REQUEST_REQUEST = "contracts/SAVE_CELEBRITY_REQUEST_REQUEST";
const SAVE_CELEBRITY_REQUEST_REQUEST_SUCCESS = "contracts/SAVE_CELEBRITY_REQUEST_REQUEST_SUCCESS";
const SAVE_CELEBRITY_REQUEST_REQUEST_FAILURE = "contracts/SAVE_CELEBRITY_REQUEST_REQUEST_FAILURE";
const SAVE_CELEBRITY_REQUEST_REQUEST_COMPLETED = "contracts/SAVE_CELEBRITY_REQUEST_REQUEST_COMPLETED";
// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-requests/reducers.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const saveCelebrityRequestInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
function saveCelebrityRequestReducer(state = saveCelebrityRequestInitialState, action) {
  switch (action.type) {
    case SAVE_CELEBRITY_REQUEST_REQUEST:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    case SAVE_CELEBRITY_REQUEST_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, saveCelebrityRequestInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case SAVE_CELEBRITY_REQUEST_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, saveCelebrityRequestInitialState), {}, {
        data: action.payload.data
      });

    case SAVE_CELEBRITY_REQUEST_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  saveCelebrityRequestReducer
}));
// EXTERNAL MODULE: ./react-app/src/state/utils/apiService.js
var apiService = __webpack_require__("XruL");

// EXTERNAL MODULE: ./react-app/src/state/utils/index.js + 2 modules
var utils = __webpack_require__("7Nk7");

// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-requests/paths.js
const CELEBRITY_REQUEST_MODEL = "celebrity-requests";
const CREATE_CELEBRITY_REQUET = `custom-endpoints/celebrities/create-lead`;
// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-requests/actions.js




const saveRequest = contractData => {
  return dispatch => {
    const TYPE = SAVE_CELEBRITY_REQUEST_REQUEST;
    const FINAL_PATH = CREATE_CELEBRITY_REQUET;
    dispatch({
      type: TYPE,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      method: "POST",
      action: TYPE,
      path: FINAL_PATH,
      body: contractData
    }).then(res => {
      if ("status" in res.data && res.data.status === "ERROR") {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, TYPE, res); // Other actions
      } else {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, TYPE, res);
        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: res
        }); // Other actions
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, TYPE, err);
    });
  };
};
// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-requests/operations.js


// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrity-requests/index.js




/* harmony default export */ var celebrity_requests = __webpack_exports__["b"] = (reducers);

/***/ }),

/***/ "vNVm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__("cDcd");

var _requestIdleCallback = __webpack_require__("0G5g");

const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection({
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react.useRef)();
  const [visible, setVisible] = (0, _react.useState)(false);
  const setRef = (0, _react.useCallback)(el => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, isVisible => isVisible && setVisible(isVisible), {
        rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(() => {
    if (!hasIntersectionObserver) {
      if (!visible) {
        const idleCallback = (0, _requestIdleCallback.requestIdleCallback)(() => setVisible(true));
        return () => (0, _requestIdleCallback.cancelIdleCallback)(idleCallback);
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();

function createObserver(options) {
  const id = options.rootMargin || '';
  let instance = observers.get(id);

  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}

/***/ }),

/***/ "vVTy":
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/Button");

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

/***/ }),

/***/ "wkBG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.normalizePathSep=normalizePathSep;exports.denormalizePagePath=denormalizePagePath;function normalizePathSep(path){return path.replace(/\\/g,'/');}function denormalizePagePath(page){page=normalizePathSep(page);if(page.startsWith('/index/')){page=page.slice(6);}else if(page==='/index'){page='/';}return page;}
//# sourceMappingURL=denormalize-page-path.js.map

/***/ }),

/***/ "wpML":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ operations_namespaceObject; });

// UNUSED EXPORTS: sessionEndpoints

// NAMESPACE OBJECT: ./react-app/src/state/ducks/session/operations.js
var operations_namespaceObject = {};
__webpack_require__.r(operations_namespaceObject);
__webpack_require__.d(operations_namespaceObject, "getToken", function() { return getToken; });
__webpack_require__.d(operations_namespaceObject, "updateSession", function() { return updateSession; });

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// CONCATENATED MODULE: ./react-app/src/state/ducks/session/types.js
// GET_SESSION
const GET_SESSION_REQUEST = "session/GET_SESSION_REQUEST";
const GET_SESSION_REQUEST_SUCCESS = "session/GET_SESSION_REQUEST_SUCCESS";
const GET_SESSION_REQUEST_FAILURE = "session/GET_SESSION_REQUEST_FAILURE";
const GET_SESSION_REQUEST_COMPLETED = "session/GET_SESSION_REQUEST_COMPLETED"; // UPDATE_SESSION

const UPDATE_SESSION_REQUEST = "session/UPDATE_SESSION_REQUEST";
const UPDATE_SESSION_REQUEST_SUCCESS = "session/UPDATE_SESSION_REQUEST_SUCCESS";
const UPDATE_SESSION_REQUEST_FAILURE = "session/UPDATE_SESSION_REQUEST_FAILURE";
const UPDATE_SESSION_REQUEST_COMPLETED = "session/UPDATE_SESSION_REQUEST_COMPLETED";
// CONCATENATED MODULE: ./react-app/src/state/ducks/session/reducers.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const getSessionInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const updateSessionInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
function getSessionReducer(state = getSessionInitialState, action) {
  switch (action.type) {
    case GET_SESSION_REQUEST:
      return _objectSpread(_objectSpread({}, getSessionInitialState), {}, {
        loading: true
      });

    case GET_SESSION_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, getSessionInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case GET_SESSION_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, getSessionInitialState), {}, {
        data: action.payload.data.data
      });

    case GET_SESSION_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, getSessionInitialState), {}, {
        data: action.payload.data.data,
        completed: true
      });

    default:
      return state;
  }
}
function updateSessionReducer(state = updateSessionInitialState, action) {
  switch (action.type) {
    case UPDATE_SESSION_REQUEST:
      return _objectSpread(_objectSpread({}, updateSessionInitialState), {}, {
        loading: true
      });

    case UPDATE_SESSION_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, updateSessionInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case UPDATE_SESSION_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, updateSessionInitialState), {}, {
        data: action.payload.data
      });

    case UPDATE_SESSION_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, updateSessionInitialState), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  getSessionReducer,
  updateSessionReducer
}));
// CONCATENATED MODULE: ./react-app/src/state/ducks/session/paths.js
const apiVersion = "v1";
const GET_SESSION = "custom-endpoints/users/get-session-details";
const UPDATE_SESSION = "custom-endpoints/users/update-session-details";
// EXTERNAL MODULE: ./react-app/src/state/utils/apiService.js
var apiService = __webpack_require__("XruL");

// EXTERNAL MODULE: ./react-app/src/state/utils/index.js + 2 modules
var utils = __webpack_require__("7Nk7");

// CONCATENATED MODULE: ./react-app/src/state/ducks/session/actions.js




const getToken = () => {
  return dispatch => {
    const path = GET_SESSION;
    const type = GET_SESSION_REQUEST;
    dispatch({
      type: type,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      action: type,
      async: true,
      path: path,
      method: "GET",
      params: null,
      body: null
    }).then(res => {
      if ("status" in res.data && res.data.status === "ERROR") {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, type, res);
      } else {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, type, res); // Other actions

        dispatch({
          type: `${type}_COMPLETED`,
          payload: res
        });
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, type, err);
    });
  };
};
const updateSession = body => {
  return dispatch => {
    const path = UPDATE_SESSION;
    const type = UPDATE_SESSION_REQUEST;
    dispatch({
      type: type,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      action: type,
      async: true,
      path: path,
      method: "PUT",
      params: null,
      body: body
    }).then(res => {
      if ("status" in res.data && res.data.status === "ERROR") {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, type, res);
      } else {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, type, res); // Other actions

        dispatch({
          type: `${type}_COMPLETED`,
          payload: res
        });
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, type, err);
    });
  };
};
// CONCATENATED MODULE: ./react-app/src/state/ducks/session/operations.js


// CONCATENATED MODULE: ./react-app/src/state/ducks/session/index.js




/* harmony default export */ var session = __webpack_exports__["a"] = (reducers);

/***/ }),

/***/ "wsp3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ operations_namespaceObject; });

// UNUSED EXPORTS: celebrityEndpoints

// NAMESPACE OBJECT: ./react-app/src/state/ducks/celebrities/operations.js
var operations_namespaceObject = {};
__webpack_require__.r(operations_namespaceObject);
__webpack_require__.d(operations_namespaceObject, "get", function() { return actions["f" /* get */]; });
__webpack_require__.d(operations_namespaceObject, "cleanPublicContracts", function() { return actions["a" /* cleanPublicContracts */]; });
__webpack_require__.d(operations_namespaceObject, "list", function() { return actions["g" /* list */]; });
__webpack_require__.d(operations_namespaceObject, "listReviews", function() { return actions["i" /* listReviews */]; });
__webpack_require__.d(operations_namespaceObject, "listPublicContracts", function() { return actions["h" /* listPublicContracts */]; });
__webpack_require__.d(operations_namespaceObject, "updateQueryParams", function() { return actions["l" /* updateQueryParams */]; });
__webpack_require__.d(operations_namespaceObject, "listSimilar", function() { return actions["j" /* listSimilar */]; });
__webpack_require__.d(operations_namespaceObject, "fetchFlashDeliveryCelebrities", function() { return actions["c" /* fetchFlashDeliveryCelebrities */]; });
__webpack_require__.d(operations_namespaceObject, "fetchCelebritySubscriptionPlans", function() { return actions["b" /* fetchCelebritySubscriptionPlans */]; });

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrities/reducers.js
var reducers = __webpack_require__("aCqb");

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrities/actions.js
var actions = __webpack_require__("rlcS");

// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrities/operations.js


// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrities/paths.js
var paths = __webpack_require__("808T");

// CONCATENATED MODULE: ./react-app/src/state/ducks/celebrities/index.js




/* harmony default export */ var celebrities = __webpack_exports__["b"] = (reducers["a" /* default */]);

/***/ }),

/***/ "wy2R":
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "x7jf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ operations_namespaceObject; });

// UNUSED EXPORTS: authenticationEndpoints

// NAMESPACE OBJECT: ./react-app/src/state/ducks/authentication/operations.js
var operations_namespaceObject = {};
__webpack_require__.r(operations_namespaceObject);
__webpack_require__.d(operations_namespaceObject, "signInWithEmail", function() { return signInWithEmail; });
__webpack_require__.d(operations_namespaceObject, "changePassword", function() { return changePassword; });
__webpack_require__.d(operations_namespaceObject, "createPassword", function() { return createPassword; });
__webpack_require__.d(operations_namespaceObject, "sendSMSSecurityCode", function() { return sendSMSSecurityCode; });
__webpack_require__.d(operations_namespaceObject, "validateSMSSecurityCode", function() { return validateSMSSecurityCode; });
__webpack_require__.d(operations_namespaceObject, "sendEmailSecurityCode", function() { return sendEmailSecurityCode; });
__webpack_require__.d(operations_namespaceObject, "validateEmailSecurityCode", function() { return validateEmailSecurityCode; });
__webpack_require__.d(operations_namespaceObject, "resetPassword", function() { return resetPassword; });
__webpack_require__.d(operations_namespaceObject, "completeProfile", function() { return completeProfile; });
__webpack_require__.d(operations_namespaceObject, "validateIfEmailIsRegistered", function() { return validateIfEmailIsRegistered; });
__webpack_require__.d(operations_namespaceObject, "getUserInformation", function() { return getUserInformation; });

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// CONCATENATED MODULE: ./react-app/src/state/ducks/authentication/types.js
// LOGIN
const SIGN_IN_WITH_EMAIL_REQUEST = "authentication/SIGN_IN_WITH_EMAIL_REQUEST";
const SIGN_IN_WITH_EMAIL_REQUEST_SUCCESS = "authentication/SIGN_IN_WITH_EMAIL_REQUEST_SUCCESS";
const SIGN_IN_WITH_EMAIL_REQUEST_FAILURE = "authentication/SIGN_IN_WITH_EMAIL_REQUEST_FAILURE";
const SIGN_IN_WITH_EMAIL_REQUEST_COMPLETED = "authentication/SIGN_IN_WITH_EMAIL_REQUEST_COMPLETED"; // CHANGE_PASSWORD

const CHANGE_PASSWORD_REQUEST = "authentication/CHANGE_PASSWORD_REQUEST";
const CHANGE_PASSWORD_REQUEST_SUCCESS = "authentication/CHANGE_PASSWORD_REQUEST_SUCCESS";
const CHANGE_PASSWORD_REQUEST_FAILURE = "authentication/CHANGE_PASSWORD_REQUEST_FAILURE";
const CHANGE_PASSWORD_REQUEST_COMPLETED = "authentication/CHANGE_PASSWORD_REQUEST_COMPLETED"; // VERIFY_SECURITY_CODE

const VERIFY_SECURITY_CODE_REQUEST = "authentication/VERIFY_SECURITY_CODE_REQUEST";
const VERIFY_SECURITY_CODE_REQUEST_SUCCESS = "authentication/VERIFY_SECURITY_CODE_REQUEST_SUCCESS";
const VERIFY_SECURITY_CODE_REQUEST_FAILURE = "authentication/VERIFY_SECURITY_CODE_REQUEST_FAILURE";
const VERIFY_SECURITY_CODE_REQUEST_COMPLETED = "authentication/VERIFY_SECURITY_CODE_REQUEST_COMPLETED"; // CREATE_PASSWORD_REQUEST

const CREATE_PASSWORD_REQUEST = "authentication/CREATE_PASSWORD_REQUEST";
const CREATE_PASSWORD_REQUEST_SUCCESS = "authentication/CREATE_PASSWORD_REQUEST_SUCCESS";
const CREATE_PASSWORD_REQUEST_FAILURE = "authentication/CREATE_PASSWORD_REQUEST_FAILURE";
const CREATE_PASSWORD_REQUEST_COMPLETED = "authentication/CREATE_PASSWORD_REQUEST_COMPLETED"; // CREATE_ACCOUNT_TO_VALIDATE_BY_SMS

const SEND_SMS_SECURITY_CODE_REQUEST = "authentication/SEND_SMS_SECURITY_CODE_REQUEST";
const SEND_SMS_SECURITY_CODE_REQUEST_SUCCESS = "authentication/SEND_SMS_SECURITY_CODE_REQUEST_SUCCESS";
const SEND_SMS_SECURITY_CODE_REQUEST_FAILURE = "authentication/SEND_SMS_SECURITY_CODE_REQUEST_FAILURE";
const SEND_SMS_SECURITY_CODE_REQUEST_COMPLETED = "authentication/SEND_SMS_SECURITY_CODE_REQUEST_COMPLETED"; // VALIDATE_SMS_SECURITY_CODE

const VALIDATE_SMS_SECURITY_CODE_REQUEST = "authentication/VALIDATE_SMS_SECURITY_CODE_REQUEST";
const VALIDATE_SMS_SECURITY_CODE_REQUEST_SUCCESS = "authentication/VALIDATE_SMS_SECURITY_CODE_REQUEST_SUCCESS";
const VALIDATE_SMS_SECURITY_CODE_REQUEST_FAILURE = "authentication/VALIDATE_SMS_SECURITY_CODE_REQUEST_FAILURE";
const VALIDATE_SMS_SECURITY_CODE_REQUEST_COMPLETED = "authentication/VALIDATE_SMS_SECURITY_CODE_REQUEST_COMPLETED"; // CREATE_ACCOUNT_TO_VALIDATE_BY_EMAIL

const SEND_EMAIL_SECURITY_CODE_REQUEST = "authentication/SEND_EMAIL_SECURITY_CODE_REQUEST";
const SEND_EMAIL_SECURITY_CODE_REQUEST_SUCCESS = "authentication/SEND_EMAIL_SECURITY_CODE_REQUEST_SUCCESS";
const SEND_EMAIL_SECURITY_CODE_REQUEST_FAILURE = "authentication/SEND_EMAIL_SECURITY_CODE_REQUEST_FAILURE";
const SEND_EMAIL_SECURITY_CODE_REQUEST_COMPLETED = "authentication/SEND_EMAIL_SECURITY_CODE_REQUEST_COMPLETED"; // VALIDATE_EMAIL_SECURITY_CODE

const VALIDATE_EMAIL_SECURITY_CODE_REQUEST = "authentication/VALIDATE_EMAIL_SECURITY_CODE_REQUEST";
const VALIDATE_EMAIL_SECURITY_CODE_REQUEST_SUCCESS = "authentication/VALIDATE_EMAIL_SECURITY_CODE_REQUEST_SUCCESS";
const VALIDATE_EMAIL_SECURITY_CODE_REQUEST_FAILURE = "authentication/VALIDATE_EMAIL_SECURITY_CODE_REQUEST_FAILURE";
const VALIDATE_EMAIL_SECURITY_CODE_REQUEST_COMPLETED = "authentication/VALIDATE_EMAIL_SECURITY_CODE_REQUEST_COMPLETED"; // VALIDATE_IF_EMAIL_IS_REGISTERED

const VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST = "authentication/VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST";
const VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST_SUCCESS = "authentication/VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST_SUCCESS";
const VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST_FAILURE = "authentication/VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST_FAILURE";
const VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST_COMPLETED = "authentication/VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST_COMPLETED"; // RESET_PASSWORD

const RESET_PASSWORD_REQUEST = "authentication/RESET_PASSWORD_REQUEST";
const RESET_PASSWORD_REQUEST_SUCCESS = "authentication/RESET_PASSWORD_REQUEST_SUCCESS";
const RESET_PASSWORD_REQUEST_FAILURE = "authentication/RESET_PASSWORD_REQUEST_FAILURE";
const RESET_PASSWORD_REQUEST_COMPLETED = "authentication/RESET_PASSWORD_REQUEST_COMPLETED"; // COMPLETE_PROFILE

const COMPLETE_PROFILE_REQUEST = "authentication/COMPLETE_PROFILE_REQUEST";
const COMPLETE_PROFILE_REQUEST_SUCCESS = "authentication/COMPLETE_PROFILE_REQUEST_SUCCESS";
const COMPLETE_PROFILE_REQUEST_FAILURE = "authentication/COMPLETE_PROFILE_REQUEST_FAILURE";
const COMPLETE_PROFILE_REQUEST_COMPLETED = "authentication/COMPLETE_PROFILE_REQUEST_COMPLETED"; //GET USER INFORMATION

const GET_USER_INFORMATION = "authentication/GET_USER_INFORMATION";
const GET_USER_INFORMATION_SUCCESS = "authentication/GET_USER_INFORMATION_SUCCESS";
const GET_USER_INFORMATION_FAILURE = "authentication/GET_USER_INFORMATION__FAILURE";
const GET_USER_INFORMATION_COMPLETED = "authentication/GET_USER_INFORMATION_COMPLETED";
// CONCATENATED MODULE: ./react-app/src/state/ducks/authentication/reducers.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const signInWithEmailInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const changePasswordInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const createPasswordInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const verifySecurityCodeInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const sendSMSSecurityCodeReducerInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const validateSMSSecurityCodeReducerInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const sendEmailSecurityCodeReducerInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const validateEmailSecurityCodeReducerInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const validateIfEmailIsRegisteredInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const resetPasswordInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const completeProfileInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
const getUserInformationInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: {
    error: ""
  },
  data: {}
};
function signInWithEmailReducer(state = signInWithEmailInitialState, action) {
  switch (action.type) {
    case SIGN_IN_WITH_EMAIL_REQUEST:
      return _objectSpread(_objectSpread({}, signInWithEmailInitialState), {}, {
        loading: true
      });

    case SIGN_IN_WITH_EMAIL_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, signInWithEmailInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case SIGN_IN_WITH_EMAIL_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, signInWithEmailInitialState), {}, {
        data: action.payload.data
      });

    case SIGN_IN_WITH_EMAIL_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, signInWithEmailInitialState), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
function changePasswordReducer(state = changePasswordInitialState, action) {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return _objectSpread(_objectSpread({}, changePasswordInitialState), {}, {
        loading: true
      });

    case CHANGE_PASSWORD_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, changePasswordInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case CHANGE_PASSWORD_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, changePasswordInitialState), {}, {
        data: action.payload.data.data
      });

    case CHANGE_PASSWORD_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, changePasswordInitialState), {}, {
        data: action.payload.data.data,
        completed: true
      });

    default:
      return state;
  }
}
function createPasswordReducer(state = createPasswordInitialState, action) {
  switch (action.type) {
    case CREATE_PASSWORD_REQUEST:
      return _objectSpread(_objectSpread({}, createPasswordInitialState), {}, {
        loading: true
      });

    case CREATE_PASSWORD_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, createPasswordInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case CREATE_PASSWORD_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, createPasswordInitialState), {}, {
        data: action.payload.data
      });

    case CREATE_PASSWORD_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, createPasswordInitialState), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
function verifySecurityCodeReducer(state = verifySecurityCodeInitialState, action) {
  switch (action.type) {
    case VERIFY_SECURITY_CODE_REQUEST:
      return _objectSpread(_objectSpread({}, verifySecurityCodeInitialState), {}, {
        loading: true
      });

    case VERIFY_SECURITY_CODE_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, verifySecurityCodeInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case VERIFY_SECURITY_CODE_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, verifySecurityCodeInitialState), {}, {
        data: action.payload.data
      });

    case VERIFY_SECURITY_CODE_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, verifySecurityCodeInitialState), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
function sendSMSSecurityCodeReducer(state = sendSMSSecurityCodeReducerInitialState, action) {
  switch (action.type) {
    case SEND_SMS_SECURITY_CODE_REQUEST:
      return _objectSpread(_objectSpread({}, sendSMSSecurityCodeReducerInitialState), {}, {
        loading: true
      });

    case SEND_SMS_SECURITY_CODE_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, sendSMSSecurityCodeReducerInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case SEND_SMS_SECURITY_CODE_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, sendSMSSecurityCodeReducerInitialState), {}, {
        data: action.payload.data.data
      });

    case SEND_SMS_SECURITY_CODE_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, sendSMSSecurityCodeReducerInitialState), {}, {
        data: action.payload.data.data,
        completed: true
      });

    default:
      return state;
  }
}
function validateSMSSecurityCodeReducer(state = validateSMSSecurityCodeReducerInitialState, action) {
  switch (action.type) {
    case VALIDATE_SMS_SECURITY_CODE_REQUEST:
      return _objectSpread(_objectSpread({}, validateSMSSecurityCodeReducerInitialState), {}, {
        loading: true
      });

    case VALIDATE_SMS_SECURITY_CODE_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, validateSMSSecurityCodeReducerInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case VALIDATE_SMS_SECURITY_CODE_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, validateSMSSecurityCodeReducerInitialState), {}, {
        data: action.payload.data.data
      });

    case VALIDATE_SMS_SECURITY_CODE_REQUEST_COMPLETED:
      console.log("action.payload.data.data", action.payload.data.data);
      return _objectSpread(_objectSpread({}, validateSMSSecurityCodeReducerInitialState), {}, {
        data: action.payload.data.data,
        completed: true
      });

    default:
      return state;
  }
}
function sendEmailSecurityCodeReducer(state = sendEmailSecurityCodeReducerInitialState, action) {
  switch (action.type) {
    case SEND_EMAIL_SECURITY_CODE_REQUEST:
      return _objectSpread(_objectSpread({}, sendEmailSecurityCodeReducerInitialState), {}, {
        loading: true
      });

    case SEND_EMAIL_SECURITY_CODE_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, sendEmailSecurityCodeReducerInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case SEND_EMAIL_SECURITY_CODE_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, sendEmailSecurityCodeReducerInitialState), {}, {
        data: action.payload.data
      });

    case SEND_EMAIL_SECURITY_CODE_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, sendEmailSecurityCodeReducerInitialState), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
function validateEmailSecurityCodeReducer(state = validateEmailSecurityCodeReducerInitialState, action) {
  switch (action.type) {
    case VALIDATE_EMAIL_SECURITY_CODE_REQUEST:
      return _objectSpread(_objectSpread({}, validateEmailSecurityCodeReducerInitialState), {}, {
        loading: true
      });

    case VALIDATE_EMAIL_SECURITY_CODE_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, validateEmailSecurityCodeReducerInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case VALIDATE_EMAIL_SECURITY_CODE_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, validateEmailSecurityCodeReducerInitialState), {}, {
        data: action.payload.data.data
      });

    case VALIDATE_EMAIL_SECURITY_CODE_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, validateEmailSecurityCodeReducerInitialState), {}, {
        data: action.payload.data.data,
        completed: true
      });

    default:
      return state;
  }
}
function validateIfEmailIsRegisteredReducer(state = validateIfEmailIsRegisteredInitialState, action) {
  switch (action.type) {
    case VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST:
      return _objectSpread(_objectSpread({}, validateIfEmailIsRegisteredInitialState), {}, {
        loading: true
      });

    case VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, validateIfEmailIsRegisteredInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, validateIfEmailIsRegisteredInitialState), {}, {
        data: action.payload.data.data
      });

    case VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, validateIfEmailIsRegisteredInitialState), {}, {
        data: action.payload.data.data,
        completed: true
      });

    default:
      return state;
  }
}
function resetPasswordReducer(state = resetPasswordInitialState, action) {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return _objectSpread(_objectSpread({}, resetPasswordInitialState), {}, {
        loading: true
      });

    case RESET_PASSWORD_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, resetPasswordInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case RESET_PASSWORD_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, resetPasswordInitialState), {}, {
        data: action.payload.data
      });

    case RESET_PASSWORD_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, resetPasswordInitialState), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
function completeProfileReducer(state = completeProfileInitialState, action) {
  switch (action.type) {
    case COMPLETE_PROFILE_REQUEST:
      return _objectSpread(_objectSpread({}, completeProfileInitialState), {}, {
        loading: true
      });

    case COMPLETE_PROFILE_REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, completeProfileInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case COMPLETE_PROFILE_REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, completeProfileInitialState), {}, {
        data: action.payload.data
      });

    case COMPLETE_PROFILE_REQUEST_COMPLETED:
      return _objectSpread(_objectSpread({}, completeProfileInitialState), {}, {
        data: action.payload.data,
        completed: true
      });

    default:
      return state;
  }
}
function getUserInformationReducer(state = getUserInformationInitialState, action) {
  switch (action.type) {
    case GET_USER_INFORMATION:
      return _objectSpread(_objectSpread({}, getUserInformationInitialState), {}, {
        loading: true
      });

    case GET_USER_INFORMATION_FAILURE:
      return _objectSpread(_objectSpread({}, getUserInformationInitialState), {}, {
        error_data: action.payload.data,
        failed: true
      });

    case GET_USER_INFORMATION_SUCCESS:
      return _objectSpread(_objectSpread({}, getUserInformationInitialState), {}, {
        data: action.payload.data.data
      });

    case GET_USER_INFORMATION_COMPLETED:
      return _objectSpread(_objectSpread({}, getUserInformationInitialState), {}, {
        data: action.payload.data.data,
        completed: true
      });

    default:
      return state;
  }
}
/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  signInWithEmailReducer,
  changePasswordReducer,
  createPasswordReducer,
  verifySecurityCodeReducer,
  sendSMSSecurityCodeReducer,
  validateSMSSecurityCodeReducer,
  resetPasswordReducer,
  completeProfileReducer,
  sendEmailSecurityCodeReducer,
  validateEmailSecurityCodeReducer,
  validateIfEmailIsRegisteredReducer,
  getUserInformationReducer
}));
// CONCATENATED MODULE: ./react-app/src/state/ducks/authentication/paths.js
const apiVersion = "v1";
const MODEL_PATH = "custom-endpoints/users";
const SIGN_IN_REQUEST = MODEL_PATH + "/login/email-password";
const CREATE_ACCOUNT_TO_VALIDATE_BY_EMAIL = MODEL_PATH + "/create-account-to-validate-by-email";
const VALIDATE_IF_EMAIL_IS_REGISTERED = MODEL_PATH + "/validate-if-email-is-registered";
const VALIDATE_EMAIL_SECURITY_CODE = MODEL_PATH + "/validate-email-security-code";
const CREATE_CLIENT_PASSWORD = MODEL_PATH + "/create-account-password";
const COMPLETE_PROFILE = MODEL_PATH + "/complete-profile";
const CHANGE_PASSWORD = MODEL_PATH + "/change-password";
const RESET_PASSWORD = MODEL_PATH + "/reset-password";
const CREATE_ACCOUNT_TO_VALIDATE_BY_SMS = MODEL_PATH + "/create-account-to-validate-by-sms";
const VALIDATE_SMS_SECURITY_CODE = MODEL_PATH + "/validate-sms-security-code";
const NEWSLETTER_SUBSCRIPTION = MODEL_PATH + "/newsletter-subscription";
// EXTERNAL MODULE: ./react-app/src/state/utils/apiService.js
var apiService = __webpack_require__("XruL");

// EXTERNAL MODULE: ./react-app/src/state/utils/index.js + 2 modules
var utils = __webpack_require__("7Nk7");

// EXTERNAL MODULE: ./react-app/src/state/utils/session.js + 1 modules
var utils_session = __webpack_require__("hVVe");

// EXTERNAL MODULE: ./react-app/src/routing/History.js
var History = __webpack_require__("u3u/");

// EXTERNAL MODULE: ./react-app/src/routing/Paths.js
var Paths = __webpack_require__("c5JF");

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__("zr5I");

// CONCATENATED MODULE: ./react-app/src/state/ducks/authentication/actions.js









const afterLogin = res => {
  const session = new utils_session["a" /* Session */]();

  if (res.data.token) {
    session.setSession(res.data.token);

    switch (session.getSession().status) {
      // CHANGE PASSWORD REQUIRED
      case 10:
        localStorage.setItem("authRedirect", Paths["o" /* CREATE_PASSWORD_PATH */]);
        break;
      // COMPLETE PROFILE REQUIRED

      case 15:
        localStorage.setItem("authRedirect", Paths["m" /* COMPLETE_PROFILE_PATH */]);
        break;
      // UPDATE PASSWORD

      case 29:
        localStorage.setItem("authRedirect", Paths["i" /* CHANGE_PASSWORD_PATH */]);
        break;
      // FINAL REDIRECT

      default:
        break;
    }
  }

  const authRedirect = localStorage.getItem("authRedirect");
  const finalRedirect = localStorage.getItem("finalRedirect");

  if (authRedirect !== null) {
    localStorage.removeItem("authRedirect");
    return History["a" /* history */]._pushRoute(authRedirect);
  } else if (finalRedirect !== null) {
    localStorage.removeItem("finalRedirect");
    return History["a" /* history */]._pushRoute(finalRedirect);
  } else {
    return History["a" /* history */]._pushRoute(Paths["t" /* HOME_PATH */]);
  }
};

const signInWithEmail = body => {
  return dispatch => {
    const path = SIGN_IN_REQUEST;
    const type = SIGN_IN_WITH_EMAIL_REQUEST;
    dispatch({
      type: type,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      action: type,
      async: true,
      path: path,
      method: "POST",
      params: null,
      body: body
    }).then(res => {
      if (res.data.status === "OK") {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, type, res);
        dispatch({
          type: `${type}_COMPLETED`,
          payload: res
        });
        afterLogin(res);
      } else {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, type, res);
      }
    }).catch(error => {
      Object(utils["a" /* handleApiErrors */])(dispatch, type, error);
    });
  };
};
const changePassword = body => {
  return dispatch => {
    const path = CHANGE_PASSWORD;
    const type = CHANGE_PASSWORD_REQUEST;
    dispatch({
      type: type,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      action: type,
      async: true,
      path: path,
      method: "POST",
      params: null,
      body: body
    }).then(res => {
      if (res.data.status === "OK") {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, type, res);
        dispatch({
          type: `${type}_COMPLETED`,
          payload: res
        });
        afterLogin(res);
      } else {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, type, res);
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, type, err);
    });
  };
};
const createPassword = body => {
  return dispatch => {
    const path = CREATE_CLIENT_PASSWORD;
    const type = CREATE_PASSWORD_REQUEST;
    dispatch({
      type: type,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      action: type,
      async: true,
      path: path,
      method: "PUT",
      params: null,
      body: body
    }).then(res => {
      if (res.data.status === "OK") {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, type, res);
        dispatch({
          type: `${type}_COMPLETED`,
          payload: res
        });
        afterLogin(res);
      } else {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, type, res);
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, type, err);
    });
  };
};
const sendSMSSecurityCode = body => {
  return dispatch => {
    const path = CREATE_ACCOUNT_TO_VALIDATE_BY_SMS;
    const type = SEND_SMS_SECURITY_CODE_REQUEST;
    dispatch({
      type: type,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      action: type,
      async: true,
      path: path,
      method: "POST",
      params: null,
      body: body
    }).then(res => {
      if (res.data.status === "OK") {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, type, res);
        dispatch({
          type: `${type}_COMPLETED`,
          payload: res
        });
        localStorage.setItem("authRedirect", Paths["I" /* VALIDATE_SECURITY_CODE */].replace(":form", "cellphone-form"));
        afterLogin(res);
      } else {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, type, res);
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, type, err);
    });
  };
};
const validateSMSSecurityCode = body => {
  return dispatch => {
    const path = VALIDATE_SMS_SECURITY_CODE;
    const type = VALIDATE_SMS_SECURITY_CODE_REQUEST;
    dispatch({
      type: type,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      action: type,
      async: true,
      path: path,
      method: "POST",
      params: null,
      body: body
    }).then(res => {
      if (res.data.status === "OK") {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, type, res);
        dispatch({
          type: `${type}_COMPLETED`,
          payload: res
        });
        afterLogin(res);
      } else {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, type, res);
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, type, err);
    });
  };
};
const sendEmailSecurityCode = body => {
  return dispatch => {
    const path = CREATE_ACCOUNT_TO_VALIDATE_BY_EMAIL;
    const type = SEND_EMAIL_SECURITY_CODE_REQUEST;
    dispatch({
      type: type,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      action: type,
      async: true,
      path: path,
      method: "POST",
      params: null,
      body: body
    }).then(res => {
      if (res.data.status === "OK") {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, type, res);
        dispatch({
          type: `${type}_COMPLETED`,
          payload: res
        });
      } else {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, type, res);
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, type, err);
    });
  };
};
const validateEmailSecurityCode = body => {
  return dispatch => {
    const path = VALIDATE_EMAIL_SECURITY_CODE;
    const type = VALIDATE_EMAIL_SECURITY_CODE_REQUEST;
    dispatch({
      type: type,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      action: type,
      async: true,
      path: path,
      method: "POST",
      params: null,
      body: body
    }).then(res => {
      if (res.data.status === "OK") {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, type, res);
        dispatch({
          type: `${type}_COMPLETED`,
          payload: res
        });
        afterLogin(res);
      } else {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, type, res);
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, type, err);
    });
  };
};
const validateIfEmailIsRegistered = body => {
  return dispatch => {
    const path = VALIDATE_IF_EMAIL_IS_REGISTERED;
    const type = VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST;
    dispatch({
      type: type,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      action: type,
      async: true,
      path: path,
      method: "POST",
      params: null,
      body: body
    }).then(res => {
      if (res.data.status === "OK") {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, type, res);
        dispatch({
          type: `${type}_COMPLETED`,
          payload: res
        });

        if (res.data.data["emailIsRegistered"] === true) {
          localStorage.setItem("authRedirect", Paths["A" /* SIGN_IN_WITH_SPECIFIC_FORM_PATH */].replace(":form", "email-form") + "?email=" + res.data.data.email);
          afterLogin(res);
        } else {
          dispatch(sendEmailSecurityCode(res.data.data));
          localStorage.setItem("authRedirect", Paths["I" /* VALIDATE_SECURITY_CODE */].replace(":form", "email-form"));
          afterLogin(res);
        }
      } else {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, type, res);
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, type, err);
    });
  };
};
const completeProfile = body => {
  return dispatch => {
    const path = COMPLETE_PROFILE;
    const type = COMPLETE_PROFILE_REQUEST;
    dispatch({
      type: type,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      action: type,
      async: true,
      path: path,
      method: "PUT",
      params: null,
      body: body
    }).then(res => {
      if (res.data.status === "OK") {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, type, res);
        dispatch({
          type: `${type}_COMPLETED`,
          payload: res
        });
        afterLogin(res);
      } else {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, type, res);
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, type, err);
    });
  };
};
const resetPassword = body => {
  return dispatch => {
    const path = RESET_PASSWORD;
    const type = RESET_PASSWORD_REQUEST;
    dispatch({
      type: type,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      action: type,
      async: true,
      path: path,
      method: "POST",
      params: null,
      body: body
    }).then(res => {
      if (res.data.status === "OK") {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, type, res);
        dispatch({
          type: `${type}_COMPLETED`,
          payload: res
        });
      } else {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, type, res);
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, type, err);
    });
  };
};
const getUserInformation = () => {
  return dispatch => {
    const path = "/custom-endpoints/authentication/auth0/test-jwt";
    const type = GET_USER_INFORMATION;
    dispatch({
      type: type,
      payload: {}
    });
    Object(apiService["a" /* default */])({
      action: type,
      async: true,
      path: path,
      method: "GET",
      params: null
    }).then(res => {
      if (res.data.status === "OK") {
        Object(utils["c" /* handleApiResponseSuccess */])(dispatch, type, res);
        dispatch({
          type: `${type}_COMPLETED`,
          payload: res
        });
      } else {
        Object(utils["b" /* handleApiResponseFailure */])(dispatch, type, res);
      }
    }).catch(err => {
      Object(utils["a" /* handleApiErrors */])(dispatch, type, err);
    });
  };
};
const newsletterSubscrition = email => {
  Object(apiService["a" /* default */])({
    action: "type",
    async: true,
    path: NEWSLETTER_SUBSCRIPTION + "/" + email,
    method: "GET"
  }).then(res => {}).catch(err => {});
};
// CONCATENATED MODULE: ./react-app/src/state/ducks/authentication/operations.js


// CONCATENATED MODULE: ./react-app/src/state/ducks/authentication/index.js




/* harmony default export */ var authentication = __webpack_exports__["b"] = (reducers);

/***/ }),

/***/ "xDM4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CelebritiesShimmerCardsSectionLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _celebrity_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("f1S7");
/* harmony import */ var _celebrity_shimmer_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ZWtG");
/* harmony import */ var _video_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("O5Gr");
/* harmony import */ var _video_shimmer_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7ssJ");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






const CelebritiesShimmerCardsSectionLayout = () => {
  const shimmerCelebritiesCardsItems = Array(15).fill(null, 0, 15).map((item, index) => __jsx("li", {
    key: index,
    className: "celebrities-section-layout__card-item"
  }, __jsx(_celebrity_shimmer_card__WEBPACK_IMPORTED_MODULE_2__[/* CelebrityShimmerCardLayout */ "a"], null)));
  const shimmerVideosCardsItems = Array(15).fill(null, 0, 15).map((item, index) => __jsx("li", {
    key: index,
    className: "celebrities-section-layout__card-item"
  }, __jsx(_video_shimmer_card__WEBPACK_IMPORTED_MODULE_4__[/* VideoShimmerCardLayout */ "a"], null)));
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("section", {
    className: "celebrities-shimmer-section-layout container pr-0"
  }, __jsx("div", {
    className: "celebrities-shimmer-section-layout__title"
  }), __jsx("ul", {
    className: "celebrities-shimmer-section-layout__cards-list"
  }, shimmerCelebritiesCardsItems)), __jsx("section", {
    className: "celebrities-shimmer-section-layout container pr-0"
  }, __jsx("div", {
    className: "celebrities-shimmer-section-layout__title w-75"
  }), __jsx("ul", {
    className: "celebrities-shimmer-section-layout__cards-list"
  }, shimmerVideosCardsItems)), __jsx("section", {
    className: "celebrities-shimmer-section-layout container pr-0"
  }, __jsx("div", {
    className: "celebrities-shimmer-section-layout__title w-50"
  }), __jsx("ul", {
    className: "celebrities-shimmer-section-layout__cards-list"
  }, shimmerCelebritiesCardsItems)), __jsx("section", {
    className: "celebrities-shimmer-section-layout container pr-0"
  }, __jsx("div", {
    className: "celebrities-shimmer-section-layout__title w-50"
  }), __jsx("ul", {
    className: "celebrities-shimmer-section-layout__cards-list"
  }, shimmerCelebritiesCardsItems)));
};



/***/ }),

/***/ "xQtr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fetchCelebritySections; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setPlayingVideo; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5NNn");
/* harmony import */ var _utils_apiService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("XruL");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7Nk7");
/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("NiAU");




const fetchCelebritySections = params => dispatch => {
  const TYPE = _types__WEBPACK_IMPORTED_MODULE_0__[/* FETCH_CELEBRITIES_SECTIONS */ "a"];
  const FINAL_PATH = _paths__WEBPACK_IMPORTED_MODULE_3__[/* FETCH_CELEBRITY_SECTIONS */ "a"];
  dispatch({
    type: TYPE
  });
  return Object(_utils_apiService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH,
    params
  }).then(res => {
    if ("status" in res.data && res.data.status === "ERROR") {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseFailure */ "b"])(dispatch, TYPE, res);
    } else {
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiResponseSuccess */ "c"])(dispatch, TYPE, res);
      dispatch({
        type: `${TYPE}_COMPLETED`,
        payload: res
      });
    }
  }).catch(err => {
    Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* handleApiErrors */ "a"])(dispatch, TYPE, err);
  });
};
const setPlayingVideo = videoKey => ({
  type: _types__WEBPACK_IMPORTED_MODULE_0__[/* PLAY_VIDEO */ "e"],
  payload: videoKey
});

/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "zQG+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useCurrentVideoPlaying__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("i3sA");



const useVideoPlayer = (videoKey, {
  onPlayVideo = () => {},
  onPauseVideo = () => {},
  onInterruptPlay = () => {}
}) => {
  const [currentVideoKey, setPlayingVideo] = Object(_useCurrentVideoPlaying__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])();
  const videoRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  const {
    0: videoIsPlaying,
    1: setVideoIsPlaying
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const playVideo = () => {
    videoRef.current.play();
    setVideoIsPlaying(true);
    setPlayingVideo(videoKey);
  };

  const pauseVideo = () => {
    videoRef.current.pause();
    setVideoIsPlaying(false);
    setPlayingVideo(null);
  };

  const togglePlay = () => {
    if (!videoIsPlaying) {
      onPlayVideo();
      playVideo();
    } else {
      onPauseVideo();
      pauseVideo();
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!videoIsPlaying || !currentVideoKey) return;

    if (currentVideoKey !== videoKey) {
      pauseVideo();
    }

    return () => {
      if (currentVideoKey === videoKey) setPlayingVideo(null);
    };
  }, [currentVideoKey, videoIsPlaying]);
  return {
    videoRef,
    videoIsPlaying,
    playVideo,
    pauseVideo,
    togglePlay
  };
};

/* harmony default export */ __webpack_exports__["a"] = (useVideoPlayer);

/***/ }),

/***/ "zqBc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LessImportantCallToActionButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IZS3");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const LessImportantCallToActionButton = ({
  fontSize,
  width,
  className,
  children,
  onClick
}) => {
  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    style: {
      fontSize,
      width
    },
    className: `LessImportantCallToActionButton ${className}`,
    onClick: onClick
  }, children);
};

LessImportantCallToActionButton.defaultProps = {
  fontSize: "1rem",
  width: "auto",
  className: "",
  children: null,
  onClick: () => {}
};


/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });