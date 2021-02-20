module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cha2");


/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

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

/***/ "JMOJ":
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

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

/***/ "NiAU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FETCH_CELEBRITY_SECTIONS; });
const CELEBRITY_SECTIONS_MODEL = "celebrity-sections";
const FETCH_CELEBRITY_SECTIONS = `custom-endpoints/${CELEBRITY_SECTIONS_MODEL}/public-list`;

/***/ }),

/***/ "NsVv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const isBrowser = () => false;

/* harmony default export */ __webpack_exports__["a"] = (isBrowser);

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

/***/ "Tx3V":
/***/ (function(module, exports) {



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

/***/ "ZSx1":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

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

/***/ "cha2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// EXTERNAL MODULE: external "@auth0/auth0-react"
var auth0_react_ = __webpack_require__("UdXN");

// CONCATENATED MODULE: ./lib/auth0-provider-with-history.js
var __jsx = external_react_default.a.createElement;




const Auth0ProviderWithHistory = ({
  children
}) => {
  const router = Object(router_["useRouter"])();

  const onRedirectCallback = appState => {
    // Use the router's history module to replace the url
    router.push((appState === null || appState === void 0 ? void 0 : appState.returnTo) || "/");
  };

  return __jsx(auth0_react_["Auth0Provider"], {
    domain: "famosos.auth0.com",
    clientId: "ckfBXIixZ1qcvVDt9Bi4TkWsiJb9jQHd",
    redirectUri: "https://qa.famosos.com",
    onRedirectCallback: onRedirectCallback
  }, children);
};

/* harmony default export */ var auth0_provider_with_history = (Auth0ProviderWithHistory);
// EXTERNAL MODULE: ./react-app/src/state/store.js + 14 modules
var store = __webpack_require__("C459");

// EXTERNAL MODULE: ./react-app/src/state/utils/gtm.js
var gtm = __webpack_require__("HkHs");

// EXTERNAL MODULE: ./react-app/src/styles.scss
var styles = __webpack_require__("Tx3V");

// EXTERNAL MODULE: ./react-app/src/state/utils/session.js + 1 modules
var utils_session = __webpack_require__("hVVe");

// EXTERNAL MODULE: ./react-app/src/routing/History.js
var History = __webpack_require__("u3u/");

// CONCATENATED MODULE: ./lib/auth0UserHandler.js





const Auth0UserHandler = ({
  children
}) => {
  const session = new utils_session["a" /* Session */]();
  const {
    0: tokenUser,
    1: setTokenUser
  } = Object(external_react_["useState"])(null);
  const {
    user,
    getIdTokenClaims,
    isLoading
  } = Object(auth0_react_["useAuth0"])();
  Object(external_react_["useEffect"])(() => {
    const fetchToken = async () => {
      const result = await getIdTokenClaims();

      if (result) {
        setTokenUser(result.__raw);
      } else if (!isLoading) {
        setTokenUser(null);
        localStorage.removeItem(session.sessionName);
      }
    };

    fetchToken();
  }, [user]);
  Object(external_react_["useEffect"])(() => {
    if (tokenUser) {
      if (localStorage.getItem("finalRedirect")) {
        History["a" /* history */].push(localStorage.getItem("finalRedirect"));
        localStorage.removeItem("finalRedirect");
      }

      localStorage.setItem(session.sessionName, tokenUser);
    } else if (!isLoading) {
      localStorage.removeItem(session.sessionName);
    }
  }, [tokenUser]);
  return children;
};

/* harmony default export */ var auth0UserHandler = (Auth0UserHandler);
// CONCATENATED MODULE: ./pages/_app.tsx
var _app_jsx = external_react_default.a.createElement;








const handleRouteChange = (url, {
  shallow
}) => {
  var _window, _navigator, _navigator2;

  const ENVIRONMENT = "qa".toUpperCase();
  (_window = window) === null || _window === void 0 ? void 0 : _window.analytics.page({
    path: url,
    url,
    shallow,
    isReactRouting: true,
    ENVIRONMENT,
    userAgent: (_navigator = navigator) === null || _navigator === void 0 ? void 0 : _navigator.userAgent,
    vendor: (_navigator2 = navigator) === null || _navigator2 === void 0 ? void 0 : _navigator2.vendor,
    receivedAt: new Date()
  });
};

const ROUTE_CHANGE_START = "routeChangeStart";

const App = ({
  Component,
  pageProps
}) => {
  const router = Object(router_["useRouter"])();
  Object(external_react_["useEffect"])(() => {
    Object(gtm["a" /* initialize */])();
    router.events.on(ROUTE_CHANGE_START, handleRouteChange);
    return () => {
      router.events.off(ROUTE_CHANGE_START, handleRouteChange);
    };
  }, []);
  return _app_jsx(auth0_provider_with_history, null, _app_jsx(auth0UserHandler, null, _app_jsx(Component, pageProps)));
};

/* harmony default export */ var _app = __webpack_exports__["default"] = (store["a" /* wrapper */].withRedux(App)); // App.getInitialProps = async ({ Component, ctx }) => {
//   const pageProps = Component.getInitialProps
//     ? await Component.getInitialProps(ctx)
//     : {};
//   return { pageProps };
// }

/***/ }),

/***/ "hI02":
/***/ (function(module, exports) {

module.exports = require("react-gtm-module");

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

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });