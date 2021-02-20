exports.ids = [55];
exports.modules = {

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

/***/ "P6rR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimilarCelebrityContractsSectionLayout", function() { return _SimilarCelebrityContractsSectionLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _state_ducks_contracts_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("UIGK");
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("UZ3e");
/* harmony import */ var _celebrity_shimmer_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("ZWtG");
/* harmony import */ var _routing_Paths__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("c5JF");
/* harmony import */ var _routing_History__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("u3u/");
/* harmony import */ var _carousel_with_buttons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("n87E");
/* harmony import */ var _video_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("O5Gr");
/* harmony import */ var _video_shimmer_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("7ssJ");
/* harmony import */ var _state_utils_session__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("hVVe");
/* harmony import */ var _state_utils_gtm__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("HkHs");
/* harmony import */ var react_app_src_utils_getWindow__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("V08N");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















class SimilarCelebrityContractsSectionLayout extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "analyticsData", {
      widget: this.constructor.name,
      path: Object(react_app_src_utils_getWindow__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])().location.pathname,
      celebrityUsername: this.props.celebrityUsername
    });

    _defineProperty(this, "registerListHover", () => {
      _state_utils_gtm__WEBPACK_IMPORTED_MODULE_11__[/* tagManagerDataLayer */ "b"]("HOVER_SIMILAR_CELEBRITY_CONTRACTS_LIST", this.analyticsData);
    });

    _defineProperty(this, "registerListScroll", hasReachedListEnd => {
      _state_utils_gtm__WEBPACK_IMPORTED_MODULE_11__[/* tagManagerDataLayer */ "b"]("SCROLL_SIMILAR_CELEBRITY_CONTRACTS_LIST", _objectSpread(_objectSpread({}, this.analyticsData), {}, {
        hasReachedListEnd
      }));
    });

    _defineProperty(this, "registerSimilarCelebritiesContractsScrollButtonClick", direction => {
      _state_utils_gtm__WEBPACK_IMPORTED_MODULE_11__[/* tagManagerDataLayer */ "b"]("CLICK_SIMILAR_CELEBRITY_CONTRACTS_SECTION_SCROLL_BUTTON", _objectSpread(_objectSpread({}, this.analyticsData), {}, {
        direction
      }));
    });

    this.state = {
      params: {}
    };
    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.fetchPublicContracts = this.fetchPublicContracts.bind(this);
    this.goToCreateContract = this.goToCreateContract.bind(this);
  }

  fetchPublicContracts() {
    this.props.listPublicContracts(this.props.celebrityId, this.state.params);
  }

  onPaginationChange(page) {
    this.updateParams("currentPage", page);
  }

  updateParams(key, value) {
    const {
      params
    } = this.state;
    params[key] = value;

    if (key === "search") {
      params["currentPage"] = 1;
    }

    this.setState({
      params: params
    }, () => this.fetchPublicContracts());
  }

  goToCreateContract() {
    _state_utils_gtm__WEBPACK_IMPORTED_MODULE_11__[/* tagManagerDataLayer */ "b"]("CLICK_ON_CONTRACT_BUTTON", this.props.celebrity);
    const session = new _state_utils_session__WEBPACK_IMPORTED_MODULE_10__[/* Session */ "a"]();

    if (session.isDummy()) {
      localStorage.setItem("finalRedirect", "/" + this.props.username + "/contratar");

      _routing_History__WEBPACK_IMPORTED_MODULE_6__[/* history */ "a"]._pushRoute(_routing_Paths__WEBPACK_IMPORTED_MODULE_5__[/* AUTH_FLOW */ "a"]);
    } else {
      _routing_History__WEBPACK_IMPORTED_MODULE_6__[/* history */ "a"]._pushRoute(this.props.username + "/contratar");
    }
  }

  renderShimmerPublicVideoCards() {
    const shimmersCards = [];

    for (let index = 0; index < 8; index++) {
      shimmersCards.push(__jsx("div", {
        className: "item mr-4 mb-2 mx-auto",
        key: index
      }, __jsx(_celebrity_shimmer_card__WEBPACK_IMPORTED_MODULE_4__[/* CelebrityShimmerCardLayout */ "a"], {
        className: "public-contract-shimmer CelebrityPublicContractCardLayout"
      })));
    }

    return shimmersCards;
  }

  componentDidMount() {
    this.props.getSimilarContracts(this.props.celebrityUsername);
  }

  render() {
    const hasContracts = this.props.similarContracts.length > 0;
    return this.props.isLoading || hasContracts ? __jsx("section", {
      className: "SimilarCelebrityContractsSectionLayout"
    }, __jsx(_carousel_with_buttons__WEBPACK_IMPORTED_MODULE_7__[/* Container */ "a"], {
      buttonsStyles: {
        top: "2.75rem",
        height: "343px"
      },
      onScrollTo: this.registerSimilarCelebritiesContractsScrollButtonClick,
      onListScroll: this.registerListScroll
    }, __jsx(_carousel_with_buttons__WEBPACK_IMPORTED_MODULE_7__[/* Header */ "b"], null, __jsx(_carousel_with_buttons__WEBPACK_IMPORTED_MODULE_7__[/* Title */ "d"], {
      className: "text-black text-center mb-4 w-100"
    }, "Videos similares")), __jsx(_carousel_with_buttons__WEBPACK_IMPORTED_MODULE_7__[/* List */ "c"], null, __jsx("ul", {
      className: "SimilarCelebrityContractsSectionLayout__list",
      onMouseOver: this.registerListHover
    }, !this.props.isLoading ? this.props.similarContracts.map(similarContract => __jsx("li", {
      className: "mr-3",
      key: similarContract.contractReference
    }, __jsx(_video_card__WEBPACK_IMPORTED_MODULE_8__[/* VideoCardLayout */ "a"], {
      celebrityAvatar: similarContract.celebrityAvatar,
      celebrityFullName: similarContract.celebrityFullName,
      celebrityId: similarContract.celebrityId,
      celebrityUsername: similarContract.celebrityUsername,
      videoPosterUrl: similarContract.contractPosterUrl,
      videoUrl: similarContract.contractMediaUrl,
      videoKey: `similar-videos-${this.props.celebrityUsername}-${similarContract.contractReference}`
    }))) : Array(15).fill(null).map((item, index) => __jsx("li", {
      className: "mr-3",
      key: index
    }, __jsx(_video_shimmer_card__WEBPACK_IMPORTED_MODULE_9__[/* VideoShimmerCardLayout */ "a"], null))))))) : null;
    return this.props.isLoading || true
    /* hasContracts */
    ? __jsx("div", {
      className: "CelebrityPublicContractsSectionLayout"
    }, __jsx("div", {
      className: "f-container mb-2 pb-2"
    }, __jsx("div", {
      className: "f-main-padding"
    }, __jsx("div", {
      className: "clearfix ml-4"
    }, __jsx("h6", {
      className: "float-left font-weight-bold"
    }, "Videos")), __jsx("div", {
      className: "scrolling-wrapper"
    }, this.props.isLoading ? this.renderShimmerPublicVideoCards() : this.renderCelebrityPublicVideoCards()), __jsx("div", {
      className: "col-12"
    }, __jsx(_pagination__WEBPACK_IMPORTED_MODULE_3__[/* PaginationLayout */ "a"], {
      showFmainPadding: false,
      pagination: this.props.paginationData,
      onPaginationChange: this.onPaginationChange
    }))))) : null;
  }

} // Set propTypes


// Set defaultProps
SimilarCelebrityContractsSectionLayout.defaultProps = {
  celebrity: {},
  publicContracts: [],
  paginationData: {},
  similarContracts: []
}; // mapStateToProps

const mapStateToProps = state => ({
  isLoading: state.contracts.fetchSimilarContractsReducer.loading,
  similarContracts: state.contracts.fetchSimilarContractsReducer.data.results
}); // mapStateToProps


const mapDispatchToProps = {
  getSimilarContracts: _state_ducks_contracts_actions__WEBPACK_IMPORTED_MODULE_2__[/* fetchSimilarContracts */ "d"]
}; // Export Class

const _SimilarCelebrityContractsSectionLayout = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(SimilarCelebrityContractsSectionLayout);



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

/***/ "UZ3e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginationLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


class PaginationLayout extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
    this.changePagination = this.changePagination.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentPage: this.props.pagination.currentPage
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.pagination.currentPage !== this.state.currentPage) {
      this.setState({
        currentPage: nextProps.pagination.currentPage
      });
    }
  }

  previousPage() {
    if (this.props.pagination.currentPage >= 1) {
      const page = this.props.pagination.currentPage - 1;
      this.changePagination(page);
    }
  }

  nextPage() {
    const page = this.props.pagination.currentPage + 1;
    this.changePagination(page);
  }

  changePagination(page) {
    if (page > 0 && page <= this.props.pagination.totalPages) {
      this.props.onPaginationChange(page);
    }
  }

  render() {
    // const var1 = (this.props.pagination.totalItemsOnPage * (this.props.pagination.currentPage - 1)) + 1;
    // const var2 = (this.props.pagination.totalItemsOnPage * (this.props.pagination.currentPage - 1)) +
    //     this.props.pagination.totalItemsOnPage;
    // const var3 = var2 > this.props.pagination.totalItems ? this.props.pagination.totalItems : var2;
    return __jsx("div", {
      className: "PaginationLayout"
    }, this.props.pagination.totalPages > 1 ? __jsx("div", {
      className: this.props.showFmainPadding ? "f-main-padding" : "",
      style: {
        marginTop: "0"
      }
    }, __jsx("nav", null, __jsx("ul", {
      className: "pagination"
    }, __jsx("li", {
      className: "page-item" + (!this.props.pagination.previousPage ? " disabled " : "")
    }, __jsx("span", {
      className: "page-link cursor-pointer",
      onClick: this.previousPage.bind(this)
    }, "Anterior p\xE1gina")), __jsx("li", {
      className: "page-item" + (this.props.pagination.currentPage - this.props.pagination.totalPages >= 1 ? " disabled " : "")
    }, __jsx("span", {
      className: "page-link cursor-pointer",
      onClick: this.nextPage.bind(this)
    }, "Siguiente p\xE1gina"))))) : null);
  }

} // default Props


PaginationLayout.defaultProps = {
  showFmainPadding: true,
  pagination: {
    totalItems: 0
  },
  onPaginationChange: function () {},
  totalPages: 0
};


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

/***/ })

};;