exports.ids = [61];
exports.modules = {

/***/ "f2we":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CelebrityProfileLayoutA", function() { return _CelebrityProfileLayoutA; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("/T1H");
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_2__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const CelebrityHeroSlideshow = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(() => __webpack_require__.e(/* import() */ 5).then(__webpack_require__.bind(null, "AFvu")).then(mod => mod.CelebrityHeroSlideshow), {
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("AFvu")],
    modules: ["../celebrity-hero-slideshow"]
  }
});
const HowToGetAVideoMessageLayout = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(() => __webpack_require__.e(/* import() */ 2).then(__webpack_require__.bind(null, "qKq/")).then(mod => mod.HowToGetAVideoMessageLayout), {
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("qKq/")],
    modules: ["../how-to-get-a-video-message"]
  }
});
const ResizableMainVideo = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(() => __webpack_require__.e(/* import() */ 0).then(__webpack_require__.bind(null, "f8fD")).then(mod => mod.ResizableMainVideo), {
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("f8fD")],
    modules: ["../resizable-main-video"]
  }
});
const CelebrityDetails = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(() => __webpack_require__.e(/* import() */ 50).then(__webpack_require__.bind(null, "i/n7")).then(mod => mod.CelebrityDetails), {
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("i/n7")],
    modules: ["../celebrity-details"]
  }
});
const CelebrityReviewsSectionLayout = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(() => __webpack_require__.e(/* import() */ 1).then(__webpack_require__.bind(null, "0ubG")).then(mod => mod.CelebrityReviewsSectionLayout), {
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("0ubG")],
    modules: ["../celebrity-reviews-section"]
  }
});
const CelebrityPublicContractsSectionLayout = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(() => __webpack_require__.e(/* import() */ 51).then(__webpack_require__.bind(null, "2aTP")).then(mod => mod.CelebrityPublicContractsSectionLayout), {
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("2aTP")],
    modules: ["../celebrity-public-contracts-section"]
  }
});
const SimilarCelebritiesCardsSectionLayout = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(() => __webpack_require__.e(/* import() */ 49).then(__webpack_require__.bind(null, "bASm")).then(mod => mod.SimilarCelebritiesCardsSectionLayout), {
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("bASm")],
    modules: ["../similar-celebrities-cards-section"]
  }
});
const HireThisCelebrityButton = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(() => __webpack_require__.e(/* import() */ 54).then(__webpack_require__.bind(null, "RFYS")).then(mod => mod.HireThisCelebrityButton), {
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("RFYS")],
    modules: ["../hire-this-celebrity-button"]
  }
});
const CelebrityProfileLayoutB = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(() => __webpack_require__.e(/* import() */ 3).then(__webpack_require__.bind(null, "0/+u")).then(mod => mod.CelebrityProfileLayoutB), {
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("0/+u")],
    modules: ["../celebrity-profile-b"]
  }
});
const SimilarCelebrityContractsSectionLayout = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(() => __webpack_require__.e(/* import() */ 48).then(__webpack_require__.bind(null, "P6rR")).then(mod => mod.SimilarCelebrityContractsSectionLayout), {
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("P6rR")],
    modules: ["../similar-celebrity-contracts-section"]
  }
});

const CelebrityProfileLayoutA = ({
  celebrity,
  hasPublicContracts
}) => {
  return celebrity.mainVideo || hasPublicContracts ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "row container mx-auto py-lg-4 p-0"
  }, __jsx("div", {
    className: "col-12 col-lg-4 p-0 m-0 px-sm-3"
  }, hasPublicContracts ? __jsx(CelebrityHeroSlideshow, {
    celebrityAvatar: celebrity.avatar,
    celebrityMainVideo: celebrity.mainVideo
  }) : __jsx(ResizableMainVideo, {
    mainVideoUrl: celebrity.mainVideo,
    videoPosterUrl: celebrity.avatar
  })), __jsx("div", {
    className: "col-12 col-lg-8 p-0 m-0 px-sm-3"
  }, __jsx(CelebrityDetails, {
    celebrity: celebrity,
    variant: "2"
  }))), __jsx(CelebrityReviewsSectionLayout, {
    celebrityId: celebrity.id
  }), __jsx(HowToGetAVideoMessageLayout, null), __jsx("div", {
    className: "py-4"
  }, __jsx(SimilarCelebrityContractsSectionLayout, {
    celebrityUsername: celebrity.username
  }))) : __jsx(CelebrityProfileLayoutB, {
    celebrity: celebrity
  });
};

CelebrityProfileLayoutA.defaultProps = {
  celebrity: {},
  hasPublicContracts: true
};

const mapStateToProps = ({
  celebrities: {
    fetchPublicContractsReducer
  }
}) => {
  return {
    hasPublicContracts: !fetchPublicContractsReducer.completed || fetchPublicContractsReducer.data.results.length > 0
  };
};

const _CelebrityProfileLayoutA = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(CelebrityProfileLayoutA);



/***/ })

};;