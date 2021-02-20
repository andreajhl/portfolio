exports.ids = [60];
exports.modules = {

/***/ "2Yyq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkConnectionErrorLayout", function() { return NetworkConnectionErrorLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _call_to_action_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("iWI7");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const NetworkConnectionErrorLayout = ({
  onTryAgain
}) => {
  return __jsx("div", {
    className: "NetworkConnectionErrorLayout"
  }, __jsx("section", {
    className: "NetworkConnectionErrorLayout__section"
  }, __jsx("div", {
    className: "NetworkConnectionErrorLayout__container mx-auto text-center p-4"
  }, __jsx("img", {
    width: "200px",
    style: {
      marginBottom: "0.35rem"
    },
    src: "/assets/img/wifi-connection-error.svg",
    alt: "Error de conexi\xF3n"
  }), __jsx("br", null), __jsx("h3", {
    className: "text-center font-weight-bold"
  }, "Ha ocurrido un error"), __jsx("p", {
    className: "NetworkConnectionErrorLayout__text"
  }, "Por favor, comprueba tu conexi\xF3n a ", __jsx("br", null), " internet e intenta nuevamente."), __jsx(_call_to_action_button__WEBPACK_IMPORTED_MODULE_1__[/* CallToActionButton */ "a"], {
    width: "200px",
    onClick: onTryAgain
  }, "Reintentar"))));
};

NetworkConnectionErrorLayout.defaultProps = {
  onTryAgain: () => window.location.reload()
};


/***/ }),

/***/ "iWI7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CallToActionButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IZS3");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const CallToActionButton = ({
  fontSize,
  width,
  className,
  children,
  onClick,
  onHover
}) => {
  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    style: {
      fontSize,
      width
    },
    className: `CallToActionButton ${className}`,
    onClick: onClick
  }, children);
};

CallToActionButton.defaultProps = {
  fontSize: "1rem",
  width: "auto",
  className: "",
  children: null,
  onClick: () => {},
  onClick: () => {}
};


/***/ })

};;