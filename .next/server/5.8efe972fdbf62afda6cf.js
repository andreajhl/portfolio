exports.ids = [5];
exports.modules = {

/***/ "AFvu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CelebrityHeroSlideshow", function() { return _CelebrityHeroSlideshow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap_Carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("//R+");
/* harmony import */ var react_bootstrap_Carousel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Carousel__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var fscreen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("iN9a");
/* harmony import */ var fscreen__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fscreen__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _state_utils_gtm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("HkHs");
/* harmony import */ var _video_slide__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("u7XR");
/* harmony import */ var _state_ducks_contracts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("bJxI");
/* harmony import */ var _utils_useCurrentVideoPlaying__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("i3sA");
/* harmony import */ var react_app_src_utils_getWindow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("V08N");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const CelebrityHeroSlideshow = ({
  celebrityAvatar,
  celebrityMainVideo,
  celebrityPublicContracts,
  setPlayingVideo
}) => {
  const {
    0: slideshowIsPlaying,
    1: setSlideshowIsPlaying
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const {
    0: activeSlideIndex,
    1: setActiveSlideIndex
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const {
    0: videoIsMuted,
    1: setVideoIsMuted
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const {
    0: videoIsFullscreen,
    1: setVideoIsFullscreen
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [currentVideoPlayingKey] = Object(_utils_useCurrentVideoPlaying__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])();

  const handleSelect = (selectedIndex, event) => {
    setActiveSlideIndex(selectedIndex);
    _state_utils_gtm__WEBPACK_IMPORTED_MODULE_4__[/* tagManagerDataLayer */ "b"]("CHANGE_CELEBRITY_HERO_SLIDESHOW_SLIDE", _objectSpread(_objectSpread({}, analyticsData), {}, {
      selectedIndex
    }));
  };

  const analyticsData = {
    widget: "CelebrityHeroSlideshow",
    path: Object(react_app_src_utils_getWindow__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])().location.pathname,
    activeSlideIndex,
    videoIsMuted,
    videoIsFullscreen,
    isPlayingVideo: slideshowIsPlaying
  };
  const sectionRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!fscreen__WEBPACK_IMPORTED_MODULE_3___default.a.fullscreenEnabled) return;

    const onFullscreenChange = () => {
      if (fscreen__WEBPACK_IMPORTED_MODULE_3___default.a.fullscreenElement === sectionRef.current) {
        setVideoIsFullscreen(true);
        _state_utils_gtm__WEBPACK_IMPORTED_MODULE_4__[/* tagManagerDataLayer */ "b"]("ENTER_FULLSCREEN_VIDEO_SLIDE", _objectSpread(_objectSpread({}, analyticsData), {}, {
          videoIsFullscreen: true
        }));
      } else {
        setVideoIsFullscreen(false);
        _state_utils_gtm__WEBPACK_IMPORTED_MODULE_4__[/* tagManagerDataLayer */ "b"]("EXIT_FULLSCREEN_VIDEO_SLIDE", _objectSpread(_objectSpread({}, analyticsData), {}, {
          videoIsFullscreen: false
        }));
      }
    };

    fscreen__WEBPACK_IMPORTED_MODULE_3___default.a.addEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    const sectionElement = sectionRef.current;

    if (fscreen__WEBPACK_IMPORTED_MODULE_3___default.a.fullscreenElement === sectionElement) {
      fscreen__WEBPACK_IMPORTED_MODULE_3___default.a.exitFullscreen();
    } else {
      fscreen__WEBPACK_IMPORTED_MODULE_3___default.a.requestFullscreen(sectionElement);
    }
  };

  const registerCelebrityHeroSlideshowHover = () => {
    _state_utils_gtm__WEBPACK_IMPORTED_MODULE_4__[/* tagManagerDataLayer */ "b"]("HOVER_CELEBRITY_HERO_SLIDESHOW_SLIDE", analyticsData);
  };

  const slidesVideosReferences = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => celebrityPublicContracts.map(({
    contract_reference
  }) => "SLIDESHOW-" + contract_reference).concat("SLIDESHOW-MAIN_VIDEO"), [celebrityPublicContracts]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!currentVideoPlayingKey) return;
    if (currentVideoPlayingKey.video_key === null) return;
    if (slidesVideosReferences.includes(currentVideoPlayingKey)) return;
    setSlideshowIsPlaying(false);
  }, [currentVideoPlayingKey, slidesVideosReferences]);
  return __jsx("section", {
    className: `CelebrityHeroSlideshow container p-0 bg-dark ${videoIsFullscreen ? "CelebrityHeroSlideshow--is-fullscreen" : ""}`,
    onMouseOver: registerCelebrityHeroSlideshowHover,
    ref: sectionRef
  }, __jsx(react_bootstrap_Carousel__WEBPACK_IMPORTED_MODULE_1___default.a, {
    activeIndex: activeSlideIndex,
    onSelect: handleSelect,
    fade: true,
    interval: null,
    prevIcon: __jsx("i", {
      className: "fa fa-chevron-left controls-icon"
    }),
    prevLabel: "Anterior",
    nextIcon: __jsx("i", {
      className: "fa fa-chevron-right controls-icon"
    }),
    nextLabel: "Siguiente"
  }, celebrityMainVideo ? __jsx(react_bootstrap_Carousel__WEBPACK_IMPORTED_MODULE_1___default.a.Item, null, __jsx(_video_slide__WEBPACK_IMPORTED_MODULE_5__[/* VideoSlideLayout */ "a"], {
    videoPosterUrl: celebrityAvatar,
    videoUrl: celebrityMainVideo,
    videoReference: "SLIDESHOW-MAIN_VIDEO",
    autoPlayOnCanPlay: true,
    autoPlayVideo: activeSlideIndex === 0 && slideshowIsPlaying,
    videoIsMuted: videoIsMuted,
    setVideoIsMuted: setVideoIsMuted,
    setSlideshowIsPlaying: setSlideshowIsPlaying,
    slideshowIsPlaying: slideshowIsPlaying,
    videoIsFullscreen: videoIsFullscreen,
    toggleFullscreen: toggleFullscreen,
    showFullscreenToggler: fscreen__WEBPACK_IMPORTED_MODULE_3___default.a.fullscreenEnabled
  })) : null, celebrityPublicContracts.map((publicContract, index) => __jsx(react_bootstrap_Carousel__WEBPACK_IMPORTED_MODULE_1___default.a.Item, {
    key: publicContract.contract_reference
  }, __jsx(_video_slide__WEBPACK_IMPORTED_MODULE_5__[/* VideoSlideLayout */ "a"], {
    shouldLoadPoster: index < activeSlideIndex + 2,
    videoUrl: publicContract.contract_media,
    videoReference: "SLIDESHOW-" + publicContract.contract_reference,
    videoPosterUrl: publicContract.video_poster_url || celebrityAvatar,
    autoPlayVideo: (celebrityMainVideo ? index + 1 : index) === activeSlideIndex && slideshowIsPlaying,
    videoIsMuted: videoIsMuted,
    setVideoIsMuted: setVideoIsMuted,
    setSlideshowIsPlaying: setSlideshowIsPlaying,
    slideshowIsPlaying: slideshowIsPlaying,
    videoIsFullscreen: videoIsFullscreen,
    toggleFullscreen: toggleFullscreen,
    showFullscreenToggler: fscreen__WEBPACK_IMPORTED_MODULE_3___default.a.fullscreenEnabled
  })))));
};

const mapStateToProps = ({
  celebrities
}) => ({
  celebrityMainVideo: celebrities.getCelebrityReducer.data.mainVideo,
  celebrityPublicContracts: celebrities.fetchPublicContractsReducer.data.results
});

const mapDispatchToProps = {
  setPlayingVideo: _state_ducks_contracts__WEBPACK_IMPORTED_MODULE_6__[/* contractOperations */ "a"].playVideo
};

const _CelebrityHeroSlideshow = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(CelebrityHeroSlideshow);



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

/***/ "u7XR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoSlideLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_app_src_utils_getWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("V08N");
/* harmony import */ var _state_utils_gtm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("HkHs");
/* harmony import */ var _utils_useLoad__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("au9z");
/* harmony import */ var _utils_useVideoPlayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("zQG+");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const VideoSlideLayout = ({
  videoUrl,
  videoReference,
  shouldLoadPoster,
  videoIsMuted,
  setVideoIsMuted,
  autoPlayVideo,
  setSlideshowIsPlaying,
  slideshowIsPlaying,
  preload,
  videoPosterUrl,
  showFullscreenToggler,
  videoIsFullscreen,
  toggleFullscreen,
  classNameVideoSlideButtons,
  classNameSlideLayoutVideo
}) => {
  const analyticsData = {
    widget: "VideoSlideLayout",
    path: Object(react_app_src_utils_getWindow__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])().location.pathname,
    videoUrl,
    videoReference,
    videoIsFullscreen,
    videoIsMuted,
    slideshowIsPlaying
  };
  const {
    videoRef,
    videoIsPlaying,
    playVideo,
    togglePlay
  } = Object(_utils_useVideoPlayer__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(videoReference, {
    onPlayVideo() {
      _state_utils_gtm__WEBPACK_IMPORTED_MODULE_2__[/* tagManagerDataLayer */ "b"]("PLAY_VIDEO_SLIDE", _objectSpread(_objectSpread({}, analyticsData), {}, {
        videoIsPlaying: true
      }));
      setSlideshowIsPlaying(true);
    },

    onPauseVideo() {
      _state_utils_gtm__WEBPACK_IMPORTED_MODULE_2__[/* tagManagerDataLayer */ "b"]("PAUSE_VIDEO_SLIDE", _objectSpread(_objectSpread({}, analyticsData), {}, {
        videoIsPlaying: false
      }));
      setSlideshowIsPlaying(false);
    }

  });
  const [videoIsLoaded, onVideoLoadedData] = Object(_utils_useLoad__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(videoRef);

  const toggleVideoIsMuted = () => {
    _state_utils_gtm__WEBPACK_IMPORTED_MODULE_2__[/* tagManagerDataLayer */ "b"](`${videoIsMuted ? "UN" : ""}MUTE_VIDEO_SLIDE`, _objectSpread(_objectSpread({}, analyticsData), {}, {
      videoIsMuted: !videoIsMuted
    }));
    setVideoIsMuted(videoIsMuted => !videoIsMuted);
  }; // const playVideoWhenHasGoodConnection = useCallback(() => {
  //   setIsPlayingVideo(true);
  //   playVideo();
  // }, [playVideo, setIsPlayingVideo]);


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!autoPlayVideo) return;
    setSlideshowIsPlaying(true);
    playVideo();
  }, [autoPlayVideo]);
  return __jsx("section", {
    className: "VideoSlideLayout"
  }, __jsx("div", {
    className: `VideoSlideLayout__buttons  ${classNameVideoSlideButtons ? classNameVideoSlideButtons : ""}`
  }, __jsx("div", {
    className: `d-flex align-items-center justify-content-end`
  }, __jsx("i", {
    className: `fa fa-2x fa-volume-${videoIsMuted ? "mute" : "up"} volume-icon cursor-pointer`,
    onClick: toggleVideoIsMuted
  }), __jsx("i", {
    className: `fa fa-${videoIsPlaying || slideshowIsPlaying ? "pause" : "play"} play-pause cursor-pointer`,
    onClick: togglePlay
  }), showFullscreenToggler ? __jsx("i", {
    className: `fa fa-${videoIsFullscreen ? "compress" : "expand"} fullscreen-icon cursor-pointer`,
    onClick: toggleFullscreen
  }) : null)), __jsx("div", {
    className: "VideoSlideLayout__media-container"
  }, shouldLoadPoster && preload === "none" && !videoIsLoaded ? __jsx("img", {
    className: "VideoSlideLayout__poster",
    src: videoPosterUrl || "/assets/img/avatar-blank.png",
    alt: `Poster de vídeo de famoso`,
    onClick: togglePlay
  }) : null, __jsx("video", {
    className: `VideoSlideLayout__video  ${classNameSlideLayoutVideo ? classNameSlideLayoutVideo : ""}`,
    ref: videoRef,
    controls: false,
    playsInline: true,
    onClick: togglePlay,
    preload: preload,
    muted: videoIsMuted,
    src: videoUrl,
    onLoadedData: onVideoLoadedData
  }, "Your browser does not support the video tag.")));
};

VideoSlideLayout.defaultProps = {
  shouldLoadPoster: true,
  videoIsMuted: true,
  setVideoIsMuted: () => {},
  autoPlayVideo: false,
  setIsPlayingVideo: () => {},
  isPlayingVideo: false,
  preload: "none",
  classNameVideoSlideButtons: "",
  classNameSlideLayoutVideo: ""
};


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