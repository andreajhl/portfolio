exports.ids = [57];
exports.modules = {

/***/ "2aTP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "CelebrityPublicContractsSectionLayout", function() { return /* binding */ _CelebrityPublicContractsSectionLayout; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./react-app/src/routing/History.js
var History = __webpack_require__("u3u/");

// EXTERNAL MODULE: ./react-app/src/routing/Paths.js
var Paths = __webpack_require__("c5JF");

// EXTERNAL MODULE: ./react-app/src/components/layouts/contract-favs/index.js
var contract_favs = __webpack_require__("wyJ6");

// EXTERNAL MODULE: ./react-app/src/components/layouts/contract-comments/index.js
var contract_comments = __webpack_require__("KRz/");

// EXTERNAL MODULE: ./react-app/src/state/ducks/contracts/index.js + 2 modules
var contracts = __webpack_require__("bJxI");

// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrity-public-contract-card/index.js
var __jsx = external_react_default.a.createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class celebrity_public_contract_card_CelebrityPublicContractCardLayout extends external_react_["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "returnPoster", videoURL => {
      const posterURL = videoURL.includes("watermark") ? videoURL.replace(".mp4", ".jpg").replace("watermark", "poster") : null;

      if (posterURL) {
        return __jsx("video", {
          ref: this.videoDesktopRef,
          poster: posterURL,
          controls: false,
          onClick: this.goToContract.bind(this),
          playsInline: true,
          onDoubleClick: e => {
            e.preventDefault();
            this.contractFav.current.addOrRemoveFav();
          },
          preload: "metadata",
          src: videoURL + "#t=0.5"
        });
        return __jsx("img", {
          className: "poster",
          width: "100%",
          onClick: this.goToContract.bind(this),
          src: posterURL,
          alt: "video-poster"
        });
      } else {
        return __jsx("video", {
          ref: this.videoDesktopRef,
          controls: false,
          onClick: this.goToContract.bind(this),
          playsInline: true,
          onDoubleClick: e => {
            e.preventDefault();
            this.contractFav.current.addOrRemoveFav();
          },
          preload: "metadata",
          src: videoURL + "#t=0.5"
        });
      }
    });

    this.state = {
      imageLoaded: false,
      videoDesktopPlayIcon: "fa-play"
    };
    this.playDesktopContract = this.playDesktopContract.bind(this);
    this.goToContract = this.goToContract.bind(this);
    this.videoDesktopRef = /*#__PURE__*/external_react_default.a.createRef();
    this.contractFav = /*#__PURE__*/external_react_default.a.createRef();
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.props.currentVideoPlaying !== null && nextProps.currentVideoPlaying !== this.props.publicContract.contract_reference && this.state.videoDesktopPlayIcon === "fa-pause") {
      this.setState({
        videoDesktopPlayIcon: "fa-play"
      }, () => {
        this.videoDesktopRef.current.pause();
      });
    }
  }

  playDesktopContract() {
    if (this.videoDesktopRef.current.paused) {
      this.setState({
        videoDesktopPlayIcon: "fa-pause"
      }, () => {
        this.videoDesktopRef.current.play();
        this.props.playVideo({
          contract_reference: this.props.publicContract.contract_reference
        });
      });
    } else {
      this.setState({
        videoDesktopPlayIcon: "fa-play"
      }, () => {
        this.videoDesktopRef.current.pause();
      });
    }
  }

  goToContract() {
    History["a" /* history */]._pushRoute(Paths["s" /* HIRING_PREVIEW */].replace(":contract_reference", this.props.publicContract.contract_reference));
  }

  render() {
    return __jsx("div", {
      className: "CelebrityPublicContractCardLayout mr-2 card f-card f-rounded hover cursor-pointer"
    }, __jsx("div", {
      className: "video"
    }, this.returnPoster(this.props.publicContract.contract_media)), __jsx("div", {
      className: "body px-4 py-3 justify-content-between d-flex"
    }, __jsx("div", {
      className: "title",
      onClick: this.goToContract
    }, __jsx("h6", {
      className: "font-weight-bold text-with-ellipsis"
    }, "Para: ", this.props.publicContract.contract_delivery_to)), __jsx("i", {
      className: "text-black fa fa-2x play-pause " + this.state.videoDesktopPlayIcon,
      onClick: this.playDesktopContract.bind(this)
    })));
  }

} // Set defaultProps


celebrity_public_contract_card_CelebrityPublicContractCardLayout.defaultProps = {
  publicContract: {}
}; // mapStateToProps

const mapStateToProps = state => ({
  currentVideoPlaying: state.contracts.playVideoReducer.contract_reference
}); // mapStateToProps


const mapDispatchToProps = {
  playVideo: contracts["a" /* contractOperations */].playVideo
}; // Export Class

const _CelebrityPublicContractCardLayout = Object(external_react_redux_["connect"])(mapStateToProps, mapDispatchToProps)(celebrity_public_contract_card_CelebrityPublicContractCardLayout);


// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrities/index.js + 1 modules
var celebrities = __webpack_require__("wsp3");

// EXTERNAL MODULE: ./react-app/src/components/layouts/pagination/index.js
var pagination = __webpack_require__("UZ3e");

// EXTERNAL MODULE: ./react-app/src/components/layouts/celebrity-shimmer-card/index.js
var celebrity_shimmer_card = __webpack_require__("ZWtG");

// EXTERNAL MODULE: ./react-app/src/components/layouts/contract-price/index.js
var contract_price = __webpack_require__("N39Q");

// EXTERNAL MODULE: ./react-app/src/components/layouts/carousel-with-buttons/index.js
var carousel_with_buttons = __webpack_require__("n87E");

// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrity-contract-video-shimmer-card/index.js
var celebrity_contract_video_shimmer_card_jsx = external_react_default.a.createElement;


const CelebrityContractVideoShimmerCardLayout = () => {
  return celebrity_contract_video_shimmer_card_jsx("div", {
    className: "CelebrityContractVideoShimmerCardLayout"
  }, celebrity_contract_video_shimmer_card_jsx("div", {
    className: "video-section"
  }), celebrity_contract_video_shimmer_card_jsx("div", {
    className: "body px-4 py-3 justify-content-between d-flex"
  }, celebrity_contract_video_shimmer_card_jsx("div", {
    className: "title"
  }, celebrity_contract_video_shimmer_card_jsx("div", {
    className: "line w-25 mr-2"
  }), celebrity_contract_video_shimmer_card_jsx("div", {
    className: "line w-75"
  })), celebrity_contract_video_shimmer_card_jsx("i", {
    className: "fa play-pause fa-play"
  })));
};


// EXTERNAL MODULE: ./react-app/src/components/common/routing/index.js + 3 modules
var routing = __webpack_require__("68Dr");

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrity-sections/actions.js
var actions = __webpack_require__("xQtr");

// EXTERNAL MODULE: ./react-app/src/state/utils/gtm.js
var gtm = __webpack_require__("HkHs");

// EXTERNAL MODULE: ./react-app/src/utils/getWindow.js
var getWindow = __webpack_require__("V08N");

// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrity-public-contract-card-alternative/index.js
var celebrity_public_contract_card_alternative_jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { celebrity_public_contract_card_alternative_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function celebrity_public_contract_card_alternative_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const CelebrityPublicContractCardAlternativeLayout = ({
  publicContract,
  celebrityFullName,
  celebrityAvatar,
  videoKey,
  currentVideoKey,
  setPlayingVideo
}) => {
  const videoRef = Object(external_react_["useRef"])();
  const {
    0: videoIsLoaded,
    1: setVideoIsLoaded
  } = Object(external_react_["useState"])(false);
  const {
    0: videoIsPlaying,
    1: setVideoIsPlaying
  } = Object(external_react_["useState"])(false);

  const analyticsData = _objectSpread(_objectSpread({
    widget: "CelebrityPublicContractCardAlternativeLayout",
    path: Object(getWindow["a" /* default */])().location.pathname
  }, publicContract), {}, {
    videoKey
  });

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
      gtm["b" /* tagManagerDataLayer */]("PAUSE_VIDEO_CARD", analyticsData);
      playVideo();
    } else {
      gtm["b" /* tagManagerDataLayer */]("PLAY_VIDEO_CARD", analyticsData);
      pauseVideo();
    }
  };

  Object(external_react_["useEffect"])(() => {
    if (currentVideoKey && currentVideoKey !== videoKey) pauseVideo();
    return () => {
      if (currentVideoKey === videoKey) setPlayingVideo(null);
    };
  }, [currentVideoKey]);

  const registerVideoCardHover = () => gtm["b" /* tagManagerDataLayer */]("HOVER_CELEBRITY_PUBLIC_CONTRACT_CARD_ALTERNATIVE", analyticsData);

  const registerCelebrityUsernameClick = () => gtm["b" /* tagManagerDataLayer */]("CLICK_CELEBRITY_PUBLIC_CONTRACT_CARD_ALTERNATIVE_CELEBRITY_NAME", analyticsData);

  const registerCelebrityUsernameHover = () => gtm["b" /* tagManagerDataLayer */]("HOVER_CELEBRITY_PUBLIC_CONTRACT_CARD_ALTERNATIVE_CELEBRITY_NAME", analyticsData);

  return celebrity_public_contract_card_alternative_jsx("div", {
    className: "CelebrityPublicContractCardAlternativeLayout",
    onMouseOver: registerVideoCardHover
  }, celebrity_public_contract_card_alternative_jsx("div", {
    className: "video-card"
  }, celebrity_public_contract_card_alternative_jsx("section", {
    className: "video-card__media"
  }, !videoIsLoaded ? celebrity_public_contract_card_alternative_jsx("img", {
    className: "video-card__poster",
    src: publicContract.video_poster_url || celebrityAvatar || "/assets/img/avatar-blank.png",
    alt: `Poster de vídeo de ${celebrityFullName}`,
    onClick: togglePlay
  }) : null, celebrity_public_contract_card_alternative_jsx("video", {
    className: "video-card__video",
    style: {
      opacity: videoIsLoaded ? 1 : 0
    },
    src: publicContract.contract_media,
    preload: "none",
    playsInline: true,
    onClick: togglePlay,
    onLoadedData: () => setVideoIsLoaded(true),
    ref: videoRef
  })), celebrity_public_contract_card_alternative_jsx("section", {
    className: "video-card__overlay"
  }, celebrity_public_contract_card_alternative_jsx("header", {
    className: "d-flex justify-content-between align-items-center"
  }, celebrity_public_contract_card_alternative_jsx("i", {
    className: `fa fa-2x text-white fa-${videoIsPlaying ? "pause" : "play"} ml-2 mt-2`,
    onClick: togglePlay
  })), celebrity_public_contract_card_alternative_jsx("footer", {
    className: "d-flex align-items-center px-2 video-card__footer"
  }, celebrity_public_contract_card_alternative_jsx(routing["a" /* NavLink */], {
    className: "d-flex align-items-center video-card__celebrity-profile-link",
    to: Paths["s" /* HIRING_PREVIEW */].replace(":contract_reference", publicContract.contract_reference),
    onClick: registerCelebrityUsernameClick,
    onMouseOver: registerCelebrityUsernameHover
  }, celebrity_public_contract_card_alternative_jsx("h6", {
    className: "video-card__delivery-to text-with-ellipsis"
  }, "Para: ", publicContract.contract_delivery_to.toLowerCase()))))));
};

CelebrityPublicContractCardAlternativeLayout.defaultProps = {
  publicContract: {}
};

const celebrity_public_contract_card_alternative_mapStateToProps = ({
  celebritySections
}) => ({
  currentVideoKey: celebritySections.playVideoReducer
});

const celebrity_public_contract_card_alternative_mapDispatchToProps = {
  setPlayingVideo: actions["b" /* setPlayingVideo */]
};

const _CelebrityPublicContractCardAlternativeLayout = Object(external_react_redux_["connect"])(celebrity_public_contract_card_alternative_mapStateToProps, celebrity_public_contract_card_alternative_mapDispatchToProps)(CelebrityPublicContractCardAlternativeLayout);


// EXTERNAL MODULE: ./react-app/src/components/layouts/video-shimmer-card/index.js
var video_shimmer_card = __webpack_require__("7ssJ");

// EXTERNAL MODULE: ./react-app/src/state/utils/session.js + 1 modules
var utils_session = __webpack_require__("hVVe");

// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrity-public-contracts-section/index.js
var celebrity_public_contracts_section_jsx = external_react_default.a.createElement;

function celebrity_public_contracts_section_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function celebrity_public_contracts_section_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { celebrity_public_contracts_section_ownKeys(Object(source), true).forEach(function (key) { celebrity_public_contracts_section_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { celebrity_public_contracts_section_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function celebrity_public_contracts_section_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


















class celebrity_public_contracts_section_CelebrityPublicContractsSectionLayout extends external_react_["Component"] {
  constructor(props) {
    super(props);

    celebrity_public_contracts_section_defineProperty(this, "analyticsData", {
      widget: this.constructor.name,
      path: Object(getWindow["a" /* default */])().location.pathname,
      celebrityId: this.props.celebrityId,
      username: this.props.username
    });

    celebrity_public_contracts_section_defineProperty(this, "registerListHover", () => {
      gtm["b" /* tagManagerDataLayer */]("HOVER_CELEBRITY_PUBLIC_CONTRACTS_LIST", this.analyticsData);
    });

    celebrity_public_contracts_section_defineProperty(this, "registerListScroll", hasReachedListEnd => {
      gtm["b" /* tagManagerDataLayer */]("SCROLL_CELEBRITY_PUBLIC_CONTRACTS_LIST", celebrity_public_contracts_section_objectSpread(celebrity_public_contracts_section_objectSpread({}, this.analyticsData), {}, {
        hasReachedListEnd
      }));
    });

    celebrity_public_contracts_section_defineProperty(this, "registerCelebrityPublicContractsScrollButtonClick", direction => {
      gtm["b" /* tagManagerDataLayer */]("CLICK_CELEBRITY_PUBLIC_CONTRACTS_SECTION_SCROLL_BUTTON", celebrity_public_contracts_section_objectSpread(celebrity_public_contracts_section_objectSpread({}, this.analyticsData), {}, {
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
    gtm["b" /* tagManagerDataLayer */]("CLICK_ON_CONTRACT_BUTTON", this.props.celebrity);
    const session = new utils_session["a" /* Session */]();

    if (session.isDummy()) {
      localStorage.setItem("finalRedirect", "/" + this.props.username + "/contratar");

      History["a" /* history */]._pushRoute(Paths["a" /* AUTH_FLOW */]);
    } else {
      History["a" /* history */]._pushRoute(this.props.username + "/contratar");
    }
  }

  returnContractPrice() {
    const res = this.props.contractTypes.find(x => x.contractType === 1);
    let videoMessagePrice = 0;

    if (res) {
      videoMessagePrice = res.price;
    }

    if (this.props.currencyExchangeData.rate > 1) {
      return videoMessagePrice * this.props.currencyExchangeData.rate + videoMessagePrice;
    } else {
      return videoMessagePrice;
    }
  }

  renderCelebrityPublicVideoCards() {
    return this.props.publicContracts.map((publicContract, index) => {
      return celebrity_public_contracts_section_jsx("div", {
        className: "item mr-4 mb-2 mx-auto",
        key: index + "-" + publicContract.reference
      }, celebrity_public_contracts_section_jsx(_CelebrityPublicContractCardLayout, {
        publicContract: publicContract
      }), celebrity_public_contracts_section_jsx("div", {
        className: "col-12 p-0 m-0 d-md-none text-center pr-0"
      }, this.returnContractPrice() > 0 ? celebrity_public_contracts_section_jsx("div", {
        className: "mt-3 mb-3",
        onClick: this.goToCreateContract
      }, celebrity_public_contracts_section_jsx("button", {
        className: "btn btn-sm f-contract-button"
      }, "Comprar Video Personalizado por", " ", celebrity_public_contracts_section_jsx(contract_price["a" /* ContractPriceLayout */], {
        classes: "text-white font-weight-bold",
        price: this.returnContractPrice(),
        currency: this.props.currencyExchangeData.to,
        rounding: true
      }), celebrity_public_contracts_section_jsx("i", {
        className: "fa fa-arrow-right"
      }))) : null));
    });
  }

  renderShimmerPublicVideoCards() {
    const shimmersCards = [];

    for (let index = 0; index < 8; index++) {
      shimmersCards.push(celebrity_public_contracts_section_jsx("div", {
        className: "item mr-4 mb-2 mx-auto",
        key: index
      }, celebrity_public_contracts_section_jsx(celebrity_shimmer_card["a" /* CelebrityShimmerCardLayout */], {
        className: "public-contract-shimmer CelebrityPublicContractCardLayout"
      })));
    }

    return shimmersCards;
  }

  render() {
    const hasContracts = this.props.publicContracts.length > 0;
    return this.props.isLoading || hasContracts ? celebrity_public_contracts_section_jsx("div", {
      className: "CelebrityPublicContractsSectionLayout"
    }, celebrity_public_contracts_section_jsx(carousel_with_buttons["a" /* Container */], {
      buttonsStyles: {
        top: "1.25rem",
        height: "344px"
      },
      onScrollTo: this.registerCelebrityPublicContractsScrollButtonClick,
      onListScroll: this.registerListScroll
    }, celebrity_public_contracts_section_jsx(carousel_with_buttons["c" /* List */], null, celebrity_public_contracts_section_jsx("ul", {
      className: "CelebrityPublicContractsSectionLayout__list",
      onMouseOver: this.registerListHover
    }, !this.props.isLoading ? this.props.publicContracts.map(publicContract => celebrity_public_contracts_section_jsx("li", {
      className: "mr-3",
      key: publicContract.contract_id
    }, celebrity_public_contracts_section_jsx(_CelebrityPublicContractCardAlternativeLayout, {
      publicContract: publicContract,
      videoKey: `${this.props.celebrityId}-${this.props.username}-${publicContract.contract_reference}`,
      celebrityFullName: this.props.celebrityFullName,
      celebrityAvatar: this.props.celebrityAvatar
    }))) : Array(15).fill(null).map((item, index) => celebrity_public_contracts_section_jsx("li", {
      className: "mr-3",
      key: index
    }, celebrity_public_contracts_section_jsx(video_shimmer_card["a" /* VideoShimmerCardLayout */], null))))))) : null;
    return this.props.isLoading || hasContracts ? celebrity_public_contracts_section_jsx("div", {
      className: "CelebrityPublicContractsSectionLayout"
    }, celebrity_public_contracts_section_jsx("div", {
      className: "f-container mb-2 pb-2"
    }, celebrity_public_contracts_section_jsx("div", {
      className: "f-main-padding"
    }, celebrity_public_contracts_section_jsx("div", {
      className: "clearfix ml-4"
    }, celebrity_public_contracts_section_jsx("h6", {
      className: "float-left font-weight-bold"
    }, "Videos")), celebrity_public_contracts_section_jsx("div", {
      className: "scrolling-wrapper"
    }, this.props.isLoading ? this.renderShimmerPublicVideoCards() : this.renderCelebrityPublicVideoCards()), celebrity_public_contracts_section_jsx("div", {
      className: "col-12"
    }, celebrity_public_contracts_section_jsx(pagination["a" /* PaginationLayout */], {
      showFmainPadding: false,
      pagination: this.props.paginationData,
      onPaginationChange: this.onPaginationChange
    }))))) : null;
  }

} // Set propTypes


// Set defaultProps
celebrity_public_contracts_section_CelebrityPublicContractsSectionLayout.defaultProps = {
  celebrity: {},
  publicContracts: [],
  paginationData: {}
}; // mapStateToProps

const celebrity_public_contracts_section_mapStateToProps = state => ({
  currencyExchangeData: state.payments.currencyExchangeReducer.data,
  isLoading: state.celebrities.fetchPublicContractsReducer.loading,
  publicContracts: state.celebrities.fetchPublicContractsReducer.data.results,
  paginationData: state.celebrities.fetchPublicContractsReducer.data.informationPage
}); // mapStateToProps


const celebrity_public_contracts_section_mapDispatchToProps = {
  listPublicContracts: celebrities["a" /* celebrityOperations */].listPublicContracts
}; // Export Class

const _CelebrityPublicContractsSectionLayout = Object(external_react_redux_["connect"])(celebrity_public_contracts_section_mapStateToProps, celebrity_public_contracts_section_mapDispatchToProps)(celebrity_public_contracts_section_CelebrityPublicContractsSectionLayout);



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

/***/ "KRz/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContractCommentsLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _state_utils_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("hVVe");
/* harmony import */ var _routing_History__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("u3u/");
/* harmony import */ var _routing_Paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("c5JF");
/* harmony import */ var _state_ducks_contracts_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("UIGK");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






class ContractCommentsLayout extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      commentsCount: 0
    };
    this.goToContract = this.goToContract.bind(this);
    this.session = new _state_utils_session__WEBPACK_IMPORTED_MODULE_1__[/* Session */ "a"]();
  }

  componentDidMount() {
    Object(_state_ducks_contracts_actions__WEBPACK_IMPORTED_MODULE_4__[/* getContractCommentsData */ "f"])(this.props.contractReference).then(res => {
      this.setState({
        commentsCount: res.count
      });
    });
  }

  goToContract() {
    _routing_History__WEBPACK_IMPORTED_MODULE_2__[/* history */ "a"]._pushRoute(_routing_Paths__WEBPACK_IMPORTED_MODULE_3__[/* HIRING_PREVIEW */ "s"].replace(":contract_reference", this.props.contractReference));
  }

  render() {
    return __jsx("div", {
      className: "ContractCommentsLayout",
      onClick: this.goToContract
    }, __jsx("i", {
      className: "fa fa-2x fa-comment"
    }), __jsx("small", {
      className: "text-dark"
    }, this.state.commentsCount ? this.state.commentsCount : 0));
  }

} // Set defaultProps


ContractCommentsLayout.defaultProps = {
  contractReference: ""
};


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

/***/ "wyJ6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContractFavsLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _state_utils_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("hVVe");
/* harmony import */ var _state_ducks_contracts_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("UIGK");
/* harmony import */ var _routing_Paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("c5JF");
/* harmony import */ var _routing_History__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("u3u/");
/* harmony import */ var _state_utils_gtm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("HkHs");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class ContractFavsLayout extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      markedByMe: false,
      favCount: 0
    };
    this.session = new _state_utils_session__WEBPACK_IMPORTED_MODULE_1__[/* Session */ "a"]();
    this.addOrRemoveFav = this.addOrRemoveFav.bind(this);
  }

  componentDidMount() {
    Object(_state_ducks_contracts_actions__WEBPACK_IMPORTED_MODULE_2__[/* getContractLikesData */ "g"])(this.props.contractReference).then(data => {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        markedByMe: data.markedByMe,
        favCount: data.count
      }));
    });
  }

  addOrRemoveFav() {
    if (this.session.getSession()) {
      Object(_state_ducks_contracts_actions__WEBPACK_IMPORTED_MODULE_2__[/* addOrRemoveContractLike */ "c"])(this.props.contractReference).then(data => {
        this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
          markedByMe: data.markedByMe,
          favCount: data.count
        }));
        _state_utils_gtm__WEBPACK_IMPORTED_MODULE_5__[/* tagManagerDataLayer */ "b"](data.markedByMe ? "MARKED_FAV_CONTRACT" : "UNMARKED_FAV_CONTRACT", _objectSpread(_objectSpread({}, this.state), {}, {
          markedByMe: data.markedByMe,
          favCount: data.count
        }, this.props));
      });
    } else {
      localStorage.setItem("finalRedirect", window.location.pathname);

      _routing_History__WEBPACK_IMPORTED_MODULE_4__[/* history */ "a"]._pushRoute(_routing_Paths__WEBPACK_IMPORTED_MODULE_3__[/* SIGN_UP_PATH */ "B"]);
    }
  }

  render() {
    return __jsx("div", {
      className: "ContractFavsLayout"
    }, __jsx("i", {
      className: "fa fa-2x fa-heart" + (this.state.markedByMe ? " text-primary " : ""),
      onClick: this.addOrRemoveFav
    }), __jsx("small", {
      className: "text-dark"
    }, this.state.favCount ? this.state.favCount : 0));
  }

} // Set defaultProps


ContractFavsLayout.defaultProps = {
  contractReference: ""
};


/***/ })

};;