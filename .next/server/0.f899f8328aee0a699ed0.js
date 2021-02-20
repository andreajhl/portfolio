exports.ids = [0];
exports.modules = {

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

/***/ "f8fD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "ResizableMainVideo", function() { return /* binding */ ResizableMainVideo; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-resizable"
var external_react_resizable_ = __webpack_require__("Qfv/");

// EXTERNAL MODULE: ./react-app/src/utils/useLoad.js
var useLoad = __webpack_require__("au9z");

// EXTERNAL MODULE: ./react-app/src/utils/useVideoPlayer.js
var useVideoPlayer = __webpack_require__("zQG+");

// EXTERNAL MODULE: ./react-app/src/state/utils/gtm.js
var gtm = __webpack_require__("HkHs");

// EXTERNAL MODULE: ./react-app/src/utils/getWindow.js
var getWindow = __webpack_require__("V08N");

// CONCATENATED MODULE: ./react-app/src/components/layouts/main-video-section/index.js
var __jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const CelebrityMainVideoSection = ({
  mainVideoUrl,
  videoPosterUrl
}) => {
  const {
    0: IsFinished,
    1: setIsFinished
  } = Object(external_react_["useState"])(false);
  const mainVideoReference = "mainVideo " + mainVideoUrl;
  const analyticsData = {
    widget: "CelebrityMainVideoSection",
    path: Object(getWindow["a" /* default */])().location.pathname,
    mainVideoUrl
  };
  const {
    videoRef,
    playVideo,
    togglePlay
  } = Object(useVideoPlayer["a" /* default */])(mainVideoReference, {
    onPlayVideo() {
      gtm["b" /* tagManagerDataLayer */]("PLAY_MAIN_VIDEO_SECTION", _objectSpread(_objectSpread({}, analyticsData), {}, {
        videoIsPlaying: true
      }));
    },

    onPauseVideo() {
      gtm["b" /* tagManagerDataLayer */]("PAUSE_MAIN_VIDEO_SECTION", _objectSpread(_objectSpread({}, analyticsData), {}, {
        videoIsPlaying: false
      }));
    }

  });
  const [videoIsLoaded, onVideoLoadedData] = Object(useLoad["a" /* default */])(videoRef);
  const {
    0: videoIsMuted,
    1: setVideoIsMuted
  } = Object(external_react_["useState"])(true);

  const toggleVideoIsMuted = () => setVideoIsMuted(videoIsMuted => !videoIsMuted); // const autoPlayMainVideo = (event) => {
  //   const userHasGoodInternet = navigator?.connection?.effectiveType === "4g";
  //   if (userHasGoodInternet) {
  //     playVideo({
  //       contract_reference: mainVideoReference
  //     });
  //   }
  // };


  Object(external_react_["useEffect"])(() => {
    if (!videoIsLoaded) return;
    playVideo();
  }, [videoIsLoaded]);

  const showRestartButton = () => {
    setIsFinished(true);
    togglePlay();
  };

  const hideRestartButton = () => {
    const {
      currentTime,
      duration
    } = videoRef.current;
    if (currentTime >= duration || IsFinished === false) return;
    setIsFinished(false);
  };

  return __jsx("section", {
    className: "CelebrityMainVideoSection container p-0"
  }, __jsx("div", {
    className: `CelebrityMainVideoSection__buttons ${IsFinished ? "h-100" : ""}`
  }, IsFinished ? __jsx("i", {
    className: `fa fa-undo-alt restart-icon cursor-pointer`,
    onClick: togglePlay
  }) : null, __jsx("i", {
    className: `fa fa-volume-${videoIsMuted ? "mute" : "up"} volume-icon cursor-pointer`,
    onClick: toggleVideoIsMuted
  })), __jsx("div", {
    className: "CelebrityMainVideoSection__media-container"
  }, !videoIsLoaded ? __jsx("img", {
    className: "CelebrityMainVideoSection__poster",
    src: videoPosterUrl || "/assets/img/avatar-blank.png",
    alt: `Poster de vídeo de famoso`,
    onClick: playVideo
  }) : null, __jsx("video", {
    className: "CelebrityMainVideoSection__video",
    ref: videoRef,
    controls: false,
    playsInline: true,
    onClick: togglePlay,
    preload: "metadata",
    src: mainVideoUrl,
    muted: videoIsMuted,
    autoPlay: true,
    onEnded: showRestartButton,
    onTimeUpdate: hideRestartButton,
    onLoadedData: onVideoLoadedData
  })));
};


// EXTERNAL MODULE: ./react-app/src/utils/useGetViewportWidthOnResize.js
var useGetViewportWidthOnResize = __webpack_require__("SLhP");

// EXTERNAL MODULE: ./react-app/src/utils/getContainerWidthFromWindowWidth.js + 1 modules
var getContainerWidthFromWindowWidth = __webpack_require__("DmEG");

// EXTERNAL MODULE: ./react-app/src/constants/bootstrapBreakpoint.js
var bootstrapBreakpoint = __webpack_require__("baxW");

// EXTERNAL MODULE: ./node_modules/react-resizable/css/styles.css
var styles = __webpack_require__("oidH");

// CONCATENATED MODULE: ./react-app/src/components/layouts/resizable-main-video/index.js
var resizable_main_video_jsx = external_react_default.a.createElement;








const getWidthForDesktop = windowWidth => {
  const fourthPartOfViewport = windowWidth * 0.25;
  const minimumWidth = 370;
  return fourthPartOfViewport >= minimumWidth ? minimumWidth : fourthPartOfViewport;
};

const ResizableMainVideo = ({
  mainVideoUrl,
  videoPosterUrl
}) => {
  const windowWidth = Object(useGetViewportWidthOnResize["a" /* default */])();
  const {
    0: isInDesktop,
    1: setIsInDesktop
  } = Object(external_react_["useState"])(false);
  const containerWidth = isInDesktop ? getWidthForDesktop(windowWidth) : Object(getContainerWidthFromWindowWidth["a" /* default */])(windowWidth);
  Object(external_react_["useEffect"])(() => {
    setIsInDesktop(windowWidth > bootstrapBreakpoint["b" /* largeBreakPoint */]);
  }, [windowWidth]);
  return resizable_main_video_jsx(external_react_resizable_["ResizableBox"], {
    width: containerWidth,
    height: isInDesktop ? 445 : 252,
    minConstraints: [containerWidth, 252],
    maxConstraints: [containerWidth, 445],
    axis: "y",
    handle: resizable_main_video_jsx("button", {
      type: "button",
      className: "btn handle-button d-lg-none"
    }, resizable_main_video_jsx("img", {
      src: "assets/img/resize-handle.svg",
      draggable: false,
      alt: "resize-icon"
    }))
  }, resizable_main_video_jsx(CelebrityMainVideoSection, {
    mainVideoUrl: mainVideoUrl,
    videoPosterUrl: videoPosterUrl
  }));
};



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

/***/ "oidH":
/***/ (function(module, exports) {



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