exports.ids = [1];
exports.modules = {

/***/ "0ubG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "CelebrityReviewsSectionLayout", function() { return /* binding */ _CelebrityReviewsSectionLayout; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./react-app/src/state/utils/gtm.js
var gtm = __webpack_require__("HkHs");

// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrity-review-card/index.js
var __jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const CelebrityReviewCardLayout = ({
  review
}) => {
  const registerCelebrityReviewCardHover = () => {
    gtm["b" /* tagManagerDataLayer */]("HOVER_CELEBRITY_REVIEW_CARD", _objectSpread({
      widget: "CelebrityReviewCardLayout",
      path: window.location.pathname
    }, review));
  };

  return __jsx("div", {
    className: "CelebrityReviewCardLayout",
    onMouseOver: registerCelebrityReviewCardHover
  }, __jsx("div", {
    className: "card card-review px-4 py-3"
  }, __jsx("div", {
    className: "card-body p-0 d-flex justify-content-between align-items-center"
  }, __jsx("h6", {
    className: "font-weight-bold CelebrityReviewCardLayout__full-name text-with-ellipsis"
  }, review.user_full_name ? review.user_full_name : "Anónimo"), __jsx("h5", {
    className: "text-warning flex-shrink-0"
  }, [...Array(review.contract_stars)].map((i, index) => {
    return __jsx("i", {
      key: index,
      className: "fa fa-star text-warning fa-1x mr-2"
    });
  }), [...Array(5 - review.contract_stars)].map((i, index) => {
    return __jsx("img", {
      src: "assets/img/star-outlined.svg",
      width: "22.5",
      className: "mr-2",
      key: index,
      alt: "star-outlined"
    }); // return <i key={index} className="fa fa-star fa-1x mr-2" />;
  }))), __jsx("p", {
    className: "comment text-justify mb-0"
  }, review.contract_review)));
}; // default props


CelebrityReviewCardLayout.defaultProps = {
  review: {
    client: {
      user: {}
    }
  }
};

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./react-app/src/state/ducks/celebrities/index.js + 1 modules
var celebrities = __webpack_require__("wsp3");

// EXTERNAL MODULE: ./react-app/src/components/layouts/pagination/index.js
var pagination = __webpack_require__("UZ3e");

// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrity-shimmer-review-card/index.js
var celebrity_shimmer_review_card_jsx = external_react_default.a.createElement;


class celebrity_shimmer_review_card_CelebrityShimmerReviewCardLayout extends external_react_["Component"] {
  render() {
    return celebrity_shimmer_review_card_jsx("div", {
      className: "CelebrityShimmerReviewCardLayout"
    }, celebrity_shimmer_review_card_jsx("div", {
      className: "shimmer-card f-card f-rounded hover p-4 text-center mx-auto"
    }, celebrity_shimmer_review_card_jsx("div", {
      className: "d-flex align-items-center mb-3"
    }, celebrity_shimmer_review_card_jsx("div", {
      className: "title-line user-full-name"
    }), celebrity_shimmer_review_card_jsx("div", {
      className: "review-stars text-left"
    }, celebrity_shimmer_review_card_jsx("i", {
      className: "fa fa-star fa-1x mr-2 review-star-icon"
    }), celebrity_shimmer_review_card_jsx("i", {
      className: "fa fa-star fa-1x mr-2 review-star-icon"
    }), celebrity_shimmer_review_card_jsx("i", {
      className: "fa fa-star fa-1x mr-2 review-star-icon"
    }), celebrity_shimmer_review_card_jsx("i", {
      className: "fa fa-star fa-1x mr-2 review-star-icon"
    }), celebrity_shimmer_review_card_jsx("i", {
      className: "fa fa-star fa-1x mr-2 review-star-icon"
    }))), celebrity_shimmer_review_card_jsx("div", {
      className: "review-content mt-2"
    }, celebrity_shimmer_review_card_jsx("div", {
      className: "title-line mt-1 review__first-line"
    }), celebrity_shimmer_review_card_jsx("div", {
      className: "title-line mt-1 review__second-line"
    }))));
  }

}


// CONCATENATED MODULE: ./react-app/src/components/layouts/celebrity-reviews-section/index.js
var celebrity_reviews_section_jsx = external_react_default.a.createElement;







class celebrity_reviews_section_CelebrityReviewsSectionLayout extends external_react_["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        currentPage: 1
      }
    };
    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.updateParams = this.updateParams.bind(this);
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
    } // () => this.fetchReviews()
    );
  }

  renderShimmerReviewCards() {
    const shimmersCards = [];

    for (let index = 0; index < 3; index++) {
      shimmersCards.push(celebrity_reviews_section_jsx("div", {
        className: "col-12 col-md-6 col-xl-4 mb-3 CelebrityReviewsSectionLayout__review",
        key: index
      }, celebrity_reviews_section_jsx(celebrity_shimmer_review_card_CelebrityShimmerReviewCardLayout, null)));
    }

    return shimmersCards;
  }

  render() {
    const hasReviews = this.props.reviews.length > 0;
    return this.props.isLoading || hasReviews ? celebrity_reviews_section_jsx("div", {
      className: "CelebrityReviewsSectionLayout pt-3 pb-2"
    }, celebrity_reviews_section_jsx("div", {
      className: "container mb-2 pb-2"
    }, celebrity_reviews_section_jsx("div", {
      className: "row mx-auto pt-2"
    }, celebrity_reviews_section_jsx("h5", {
      className: "col-12 mb-4 CelebrityReviewsSectionLayout__title"
    }, "Calificaciones"), this.props.isLoading ? this.renderShimmerReviewCards() : this.props.reviews.map((review, index) => {
      return celebrity_reviews_section_jsx("div", {
        className: "col-12 col-md-6 col-xl-4 mb-3 CelebrityReviewsSectionLayout__review",
        key: review.id + "-" + index
      }, celebrity_reviews_section_jsx(CelebrityReviewCardLayout, {
        review: review
      }));
    }), celebrity_reviews_section_jsx("div", {
      className: "col-12"
    }, celebrity_reviews_section_jsx(pagination["a" /* PaginationLayout */], {
      showFmainPadding: false,
      pagination: this.props.paginationData,
      onPaginationChange: this.onPaginationChange
    }))))) : null;
  }

} // Set propTypes


// Set defaultProps
celebrity_reviews_section_CelebrityReviewsSectionLayout.defaultProps = {
  celebrity: {},
  reviews: [],
  paginationData: {}
}; // mapStateToProps

const mapStateToProps = state => ({
  isLoading: state.celebrities.fetchReviewsReducer.loading,
  reviews: state.celebrities.fetchReviewsReducer.data.results,
  paginationData: state.celebrities.fetchReviewsReducer.data.informationPage
}); // mapStateToProps


const mapDispatchToProps = {
  listReviews: celebrities["a" /* celebrityOperations */].listReviews
}; // Export Class

const _CelebrityReviewsSectionLayout = Object(external_react_redux_["connect"])(mapStateToProps, mapDispatchToProps)(celebrity_reviews_section_CelebrityReviewsSectionLayout);



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


/***/ })

};;