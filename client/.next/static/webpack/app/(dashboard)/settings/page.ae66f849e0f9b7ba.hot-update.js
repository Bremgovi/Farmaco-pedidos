"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(dashboard)/settings/page",{

/***/ "(app-pages-browser)/./src/app/(dashboard)/withAuth.tsx":
/*!******************************************!*\
  !*** ./src/app/(dashboard)/withAuth.tsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   withAuth: function() { return /* binding */ withAuth; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _app_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/redux */ \"(app-pages-browser)/./src/app/redux.tsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n// hoc/withAuth.tsx\n\n\n\n\nfunction withAuth(Component) {\n    var _s = $RefreshSig$();\n    return _s(function AuthenticatedComponent(props) {\n        _s();\n        const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n        const userToken = (0,_app_redux__WEBPACK_IMPORTED_MODULE_2__.useAppSelector)((state)=>state.global.userToken);\n        (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n            if (!userToken && localStorage.getItem(\"userToken\") == null) {\n                router.push(\"/login\");\n            }\n        }, [\n            userToken,\n            router\n        ]);\n        if (!userToken) {\n            return hola;\n        }\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...props\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\withAuth.tsx\",\n            lineNumber: 21,\n            columnNumber: 12\n        }, this);\n    }, \"LADIcbRPkI2MAlGNtK9iMKIalOo=\", false, function() {\n        return [\n            next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter,\n            _app_redux__WEBPACK_IMPORTED_MODULE_2__.useAppSelector\n        ];\n    });\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvKGRhc2hib2FyZCkvd2l0aEF1dGgudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1CQUFtQjs7QUFDeUI7QUFDQztBQUNYO0FBRTNCLFNBQVNHLFNBQVNDLFNBQThCOztJQUNyRCxVQUFPLFNBQVNDLHVCQUF1QkMsS0FBVTs7UUFDL0MsTUFBTUMsU0FBU1AsMERBQVNBO1FBQ3hCLE1BQU1RLFlBQVlQLDBEQUFjQSxDQUFDLENBQUNRLFFBQVVBLE1BQU1DLE1BQU0sQ0FBQ0YsU0FBUztRQUVsRU4sZ0RBQVNBLENBQUM7WUFDUixJQUFJLENBQUNNLGFBQWFHLGFBQWFDLE9BQU8sQ0FBQyxnQkFBZ0IsTUFBTTtnQkFDM0RMLE9BQU9NLElBQUksQ0FBQztZQUNkO1FBQ0YsR0FBRztZQUFDTDtZQUFXRDtTQUFPO1FBRXRCLElBQUksQ0FBQ0MsV0FBVztZQUNkLE9BQU9NO1FBQ1Q7UUFFQSxxQkFBTyw4REFBQ1Y7WUFBVyxHQUFHRSxLQUFLOzs7Ozs7SUFDN0I7O1lBZGlCTixzREFBU0E7WUFDTkMsc0RBQWNBOzs7QUFjcEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC8oZGFzaGJvYXJkKS93aXRoQXV0aC50c3g/ZjAzMyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBob2Mvd2l0aEF1dGgudHN4XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L25hdmlnYXRpb25cIjtcclxuaW1wb3J0IHsgdXNlQXBwU2VsZWN0b3IgfSBmcm9tIFwiQC9hcHAvcmVkdXhcIjtcclxuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd2l0aEF1dGgoQ29tcG9uZW50OiBSZWFjdC5Db21wb25lbnRUeXBlKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIEF1dGhlbnRpY2F0ZWRDb21wb25lbnQocHJvcHM6IGFueSkge1xyXG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgICBjb25zdCB1c2VyVG9rZW4gPSB1c2VBcHBTZWxlY3Rvcigoc3RhdGUpID0+IHN0YXRlLmdsb2JhbC51c2VyVG9rZW4pO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgIGlmICghdXNlclRva2VuICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlclRva2VuXCIpID09IG51bGwpIHtcclxuICAgICAgICByb3V0ZXIucHVzaChcIi9sb2dpblwiKTtcclxuICAgICAgfVxyXG4gICAgfSwgW3VzZXJUb2tlbiwgcm91dGVyXSk7XHJcblxyXG4gICAgaWYgKCF1c2VyVG9rZW4pIHtcclxuICAgICAgcmV0dXJuIGhvbGE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcclxuICB9O1xyXG59XHJcbiJdLCJuYW1lcyI6WyJ1c2VSb3V0ZXIiLCJ1c2VBcHBTZWxlY3RvciIsInVzZUVmZmVjdCIsIndpdGhBdXRoIiwiQ29tcG9uZW50IiwiQXV0aGVudGljYXRlZENvbXBvbmVudCIsInByb3BzIiwicm91dGVyIiwidXNlclRva2VuIiwic3RhdGUiLCJnbG9iYWwiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicHVzaCIsImhvbGEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/(dashboard)/withAuth.tsx\n"));

/***/ })

});