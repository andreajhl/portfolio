exports.ids = [63];
exports.modules = {

/***/ "HT8b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserLikesSectionLayout", function() { return _UserLikesSectionLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _routing_Paths__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("c5JF");
/* harmony import */ var _state_ducks_celebrity_likes_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("+6uz");
/* harmony import */ var _common_helpers_maybe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("LeEe");
/* harmony import */ var _celebrities_cards_section__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("KC+L");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const mapStateToProps = ({
  celebrityLikes,
  celebritySections
}) => _objectSpread(_objectSpread({}, celebrityLikes.fetchUserCelebrityLikesWithOffsetReducer.data), {}, {
  isLoading: celebritySections.fetchCelebritySectionsReducer.loading
});

const mapDispatchToProps = {
  fetchUserCelebrityLikesWithOffset: _state_ducks_celebrity_likes_actions__WEBPACK_IMPORTED_MODULE_3__[/* fetchUserCelebrityLikesWithOffset */ "d"]
};

const UserLikesSectionLayout = ({
  results,
  totalResults,
  isLoading,
  fetchUserCelebrityLikesWithOffset
}) => {
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    fetchUserCelebrityLikesWithOffset({
      offset: 0,
      limit: 10
    });
  }, []);
  return __jsx(_common_helpers_maybe__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    it: !isLoading && results.length > 0
  }, __jsx(_celebrities_cards_section__WEBPACK_IMPORTED_MODULE_5__[/* CelebritiesCardsSectionLayout */ "a"], {
    celebritiesSection: {
      id: "favorites",
      celebritySectionType: "CELEBRITY_CARD",
      celebrities: results,
      title: "Tus Favoritos"
    },
    hasMoreResults: results.length < totalResults,
    moreResultsPath: _routing_Paths__WEBPACK_IMPORTED_MODULE_2__[/* CLIENT_FAVORITES */ "j"]
  }));
};

UserLikesSectionLayout.defaultProps = {
  results: []
};

const _UserLikesSectionLayout = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(UserLikesSectionLayout);



/***/ })

};;