"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(dashboard)/purchases/page",{

/***/ "(app-pages-browser)/./src/app/(dashboard)/purchases/page.tsx":
/*!************************************************!*\
  !*** ./src/app/(dashboard)/purchases/page.tsx ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app_components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/(components)/Header */ \"(app-pages-browser)/./src/app/(components)/Header/index.tsx\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ \"(app-pages-browser)/./node_modules/react-toastify/dist/react-toastify.esm.mjs\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"(app-pages-browser)/./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var _components_ImageWithFallback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../(components)/ImageWithFallback */ \"(app-pages-browser)/./src/app/(components)/ImageWithFallback/index.tsx\");\n/* harmony import */ var _withAuth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../withAuth */ \"(app-pages-browser)/./src/app/(dashboard)/withAuth.tsx\");\n/* harmony import */ var _state_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/state/api */ \"(app-pages-browser)/./src/state/api.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nconst Products = ()=>{\n    _s();\n    const [searchTerm, setSearchTerm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [cart, setCart] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const { data: products, isLoading, isError, refetch } = (0,_state_api__WEBPACK_IMPORTED_MODULE_7__.useGetProductsQuery)(searchTerm);\n    const handleAddToCart = (product)=>{\n        setCart((prevCart)=>{\n            const existingItem = prevCart.find((item)=>item.product.productId === product.productId);\n            if (existingItem) {\n                return prevCart.map((item)=>item.product.productId === product.productId ? {\n                        ...item,\n                        quantity: item.quantity + 1\n                    } : item);\n            }\n            return [\n                ...prevCart,\n                {\n                    product,\n                    quantity: 1\n                }\n            ];\n        });\n    };\n    const handleQuantityChange = (productId, quantity)=>{\n        setCart((prevCart)=>prevCart.map((item)=>item.product.productId === productId ? {\n                    ...item,\n                    quantity: Math.max(1, quantity)\n                } : item));\n    };\n    if (isLoading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Loading...\"\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n        lineNumber: 43,\n        columnNumber: 25\n    }, undefined);\n    if (isError || !products) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Error al cargar los productos\"\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n        lineNumber: 44,\n        columnNumber: 36\n    }, undefined);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex mx-auto w-full pb-5\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"w-2/3 p-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_components_Header__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        name: \"Productos\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                        lineNumber: 50,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"text\",\n                        placeholder: \"Buscar productos...\",\n                        value: searchTerm,\n                        onChange: (e)=>setSearchTerm(e.target.value),\n                        className: \"w-full p-2 mb-4 mt-5 border rounded\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                        lineNumber: 51,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"grid grid-cols-1 sm:grid-cols-2 gap-4\",\n                        children: products.map((product)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"border p-4 rounded-lg cursor-pointer\",\n                                onClick: ()=>handleAddToCart(product),\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ImageWithFallback__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                        src: \"/\".concat(product.name.toLowerCase(), \".png\"),\n                                        alt: product.name,\n                                        fallback: \"/fallback.png\",\n                                        width: 200,\n                                        height: 200,\n                                        className: \"w-50\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                                        lineNumber: 55,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                        className: \"text-lg font-semibold\",\n                                        children: product.name\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                                        lineNumber: 56,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        children: [\n                                            \"Precio: $\",\n                                            Number(product.price).toFixed(2)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                                        lineNumber: 57,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        children: [\n                                            \"Stock: \",\n                                            product.stockQuantity\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                                        lineNumber: 58,\n                                        columnNumber: 15\n                                    }, undefined)\n                                ]\n                            }, product.productId, true, {\n                                fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                                lineNumber: 54,\n                                columnNumber: 13\n                            }, undefined))\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                        lineNumber: 52,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"w-1/3 p-4 border-l\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        className: \"text-xl font-semibold mb-4\",\n                        children: \"Carrito de Compras\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                        lineNumber: 66,\n                        columnNumber: 9\n                    }, undefined),\n                    cart.length === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: \"No hay productos en el carrito\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                        lineNumber: 68,\n                        columnNumber: 11\n                    }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                        children: cart.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                className: \"mb-4\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex justify-between\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                                children: item.product.name\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                                                lineNumber: 74,\n                                                columnNumber: 19\n                                            }, undefined),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                type: \"number\",\n                                                min: \"1\",\n                                                value: item.quantity,\n                                                onChange: (e)=>handleQuantityChange(item.product.productId, parseInt(e.target.value)),\n                                                className: \"w-16 border rounded\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                                                lineNumber: 75,\n                                                columnNumber: 19\n                                            }, undefined)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                                        lineNumber: 73,\n                                        columnNumber: 17\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        className: \"text-sm text-gray-500\",\n                                        children: [\n                                            \"Subtotal: $\",\n                                            Number(item.product.price * item.quantity).toFixed(2)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                                        lineNumber: 83,\n                                        columnNumber: 17\n                                    }, undefined)\n                                ]\n                            }, item.product.productId, true, {\n                                fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                                lineNumber: 72,\n                                columnNumber: 15\n                            }, undefined))\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                        lineNumber: 70,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                lineNumber: 65,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_3__.ToastContainer, {\n                position: \"top-right\",\n                autoClose: 5000,\n                theme: \"light\",\n                transition: react_toastify__WEBPACK_IMPORTED_MODULE_3__.Bounce\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n                lineNumber: 90,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Brand\\\\Desktop\\\\POS\\\\client\\\\src\\\\app\\\\(dashboard)\\\\purchases\\\\page.tsx\",\n        lineNumber: 47,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Products, \"/6X2xiY8QQzjHFfXWIg6owW5I5c=\", false, function() {\n    return [\n        _state_api__WEBPACK_IMPORTED_MODULE_7__.useGetProductsQuery\n    ];\n});\n_c = Products;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_c1 = (0,_withAuth__WEBPACK_IMPORTED_MODULE_6__.withAuth)(Products));\nvar _c, _c1;\n$RefreshReg$(_c, \"Products\");\n$RefreshReg$(_c1, \"%default%\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvKGRhc2hib2FyZCkvcHVyY2hhc2VzL3BhZ2UudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVpQztBQUNjO0FBQ1M7QUFDVDtBQUNzQjtBQUM5QjtBQUNXO0FBY2xELE1BQU1PLFdBQVc7O0lBQ2YsTUFBTSxDQUFDQyxZQUFZQyxjQUFjLEdBQUdULCtDQUFRQSxDQUFDO0lBQzdDLE1BQU0sQ0FBQ1UsTUFBTUMsUUFBUSxHQUFHWCwrQ0FBUUEsQ0FBeUQsRUFBRTtJQUUzRixNQUFNLEVBQUVZLE1BQU1DLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxPQUFPLEVBQUVDLE9BQU8sRUFBRSxHQUFHViwrREFBbUJBLENBQUNFO0lBRTVFLE1BQU1TLGtCQUFrQixDQUFDQztRQUN2QlAsUUFBUSxDQUFDUTtZQUNQLE1BQU1DLGVBQWVELFNBQVNFLElBQUksQ0FBQyxDQUFDQyxPQUFTQSxLQUFLSixPQUFPLENBQUNLLFNBQVMsS0FBS0wsUUFBUUssU0FBUztZQUN6RixJQUFJSCxjQUFjO2dCQUNoQixPQUFPRCxTQUFTSyxHQUFHLENBQUMsQ0FBQ0YsT0FBVUEsS0FBS0osT0FBTyxDQUFDSyxTQUFTLEtBQUtMLFFBQVFLLFNBQVMsR0FBRzt3QkFBRSxHQUFHRCxJQUFJO3dCQUFFRyxVQUFVSCxLQUFLRyxRQUFRLEdBQUc7b0JBQUUsSUFBSUg7WUFDM0g7WUFDQSxPQUFPO21CQUFJSDtnQkFBVTtvQkFBRUQ7b0JBQVNPLFVBQVU7Z0JBQUU7YUFBRTtRQUNoRDtJQUNGO0lBRUEsTUFBTUMsdUJBQXVCLENBQUNILFdBQW1CRTtRQUMvQ2QsUUFBUSxDQUFDUSxXQUFhQSxTQUFTSyxHQUFHLENBQUMsQ0FBQ0YsT0FBVUEsS0FBS0osT0FBTyxDQUFDSyxTQUFTLEtBQUtBLFlBQVk7b0JBQUUsR0FBR0QsSUFBSTtvQkFBRUcsVUFBVUUsS0FBS0MsR0FBRyxDQUFDLEdBQUdIO2dCQUFVLElBQUlIO0lBQ3RJO0lBRUEsSUFBSVIsV0FBVyxxQkFBTyw4REFBQ2U7a0JBQUk7Ozs7OztJQUMzQixJQUFJZCxXQUFXLENBQUNGLFVBQVUscUJBQU8sOERBQUNnQjtrQkFBSTs7Ozs7O0lBRXRDLHFCQUNFLDhEQUFDQTtRQUFJQyxXQUFVOzswQkFFYiw4REFBQ0Q7Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDN0IsOERBQU1BO3dCQUFDOEIsTUFBSzs7Ozs7O2tDQUNiLDhEQUFDQzt3QkFBTUMsTUFBSzt3QkFBT0MsYUFBWTt3QkFBc0JDLE9BQU8zQjt3QkFBWTRCLFVBQVUsQ0FBQ0MsSUFBTTVCLGNBQWM0QixFQUFFQyxNQUFNLENBQUNILEtBQUs7d0JBQUdMLFdBQVU7Ozs7OztrQ0FDbEksOERBQUNEO3dCQUFJQyxXQUFVO2tDQUNaakIsU0FBU1csR0FBRyxDQUFDLENBQUNOLHdCQUNiLDhEQUFDVztnQ0FBNEJDLFdBQVU7Z0NBQXVDUyxTQUFTLElBQU10QixnQkFBZ0JDOztrREFDM0csOERBQUNkLHFFQUFpQkE7d0NBQUNvQyxLQUFLLElBQStCLE9BQTNCdEIsUUFBUWEsSUFBSSxDQUFDVSxXQUFXLElBQUc7d0NBQU9DLEtBQUt4QixRQUFRYSxJQUFJO3dDQUFFWSxVQUFTO3dDQUFnQkMsT0FBTzt3Q0FBS0MsUUFBUTt3Q0FBS2YsV0FBVTs7Ozs7O2tEQUM3SSw4REFBQ2dCO3dDQUFHaEIsV0FBVTtrREFBeUJaLFFBQVFhLElBQUk7Ozs7OztrREFDbkQsOERBQUNnQjs7NENBQUU7NENBQVVDLE9BQU85QixRQUFRK0IsS0FBSyxFQUFFQyxPQUFPLENBQUM7Ozs7Ozs7a0RBQzNDLDhEQUFDSDs7NENBQUU7NENBQVE3QixRQUFRaUMsYUFBYTs7Ozs7Ozs7K0JBSnhCakMsUUFBUUssU0FBUzs7Ozs7Ozs7Ozs7Ozs7OzswQkFXakMsOERBQUNNO2dCQUFJQyxXQUFVOztrQ0FDYiw4REFBQ3NCO3dCQUFHdEIsV0FBVTtrQ0FBNkI7Ozs7OztvQkFDMUNwQixLQUFLMkMsTUFBTSxLQUFLLGtCQUNmLDhEQUFDTjtrQ0FBRTs7Ozs7a0RBRUgsOERBQUNPO2tDQUNFNUMsS0FBS2MsR0FBRyxDQUFDLENBQUNGLHFCQUNULDhEQUFDaUM7Z0NBQWdDekIsV0FBVTs7a0RBQ3pDLDhEQUFDRDt3Q0FBSUMsV0FBVTs7MERBQ2IsOERBQUMwQjswREFBTWxDLEtBQUtKLE9BQU8sQ0FBQ2EsSUFBSTs7Ozs7OzBEQUN4Qiw4REFBQ0M7Z0RBQ0NDLE1BQUs7Z0RBQ0x3QixLQUFJO2dEQUNKdEIsT0FBT2IsS0FBS0csUUFBUTtnREFDcEJXLFVBQVUsQ0FBQ0MsSUFBTVgscUJBQXFCSixLQUFLSixPQUFPLENBQUNLLFNBQVMsRUFBRW1DLFNBQVNyQixFQUFFQyxNQUFNLENBQUNILEtBQUs7Z0RBQ3JGTCxXQUFVOzs7Ozs7Ozs7Ozs7a0RBR2QsOERBQUNpQjt3Q0FBRWpCLFdBQVU7OzRDQUF3Qjs0Q0FBWWtCLE9BQU8xQixLQUFLSixPQUFPLENBQUMrQixLQUFLLEdBQUczQixLQUFLRyxRQUFRLEVBQUV5QixPQUFPLENBQUM7Ozs7Ozs7OytCQVg3RjVCLEtBQUtKLE9BQU8sQ0FBQ0ssU0FBUzs7Ozs7Ozs7Ozs7Ozs7OzswQkFrQnZDLDhEQUFDcEIsMERBQWNBO2dCQUFDd0QsVUFBUztnQkFBWUMsV0FBVztnQkFBTUMsT0FBTTtnQkFBUUMsWUFBWTVELGtEQUFNQTs7Ozs7Ozs7Ozs7O0FBRzVGO0dBdEVNSzs7UUFJb0RELDJEQUFtQkE7OztLQUp2RUM7QUF3RU4sK0RBQWUsTUFBQUYsbURBQVFBLENBQUNFLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC8oZGFzaGJvYXJkKS9wdXJjaGFzZXMvcGFnZS50c3g/ZWJhOSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuXHJcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBIZWFkZXIgZnJvbSBcIkAvYXBwLyhjb21wb25lbnRzKS9IZWFkZXJcIjtcclxuaW1wb3J0IHsgQm91bmNlLCBUb2FzdENvbnRhaW5lciB9IGZyb20gXCJyZWFjdC10b2FzdGlmeVwiO1xyXG5pbXBvcnQgXCJyZWFjdC10b2FzdGlmeS9kaXN0L1JlYWN0VG9hc3RpZnkuY3NzXCI7XHJcbmltcG9ydCBJbWFnZVdpdGhGYWxsYmFjayBmcm9tIFwiLi4vLi4vKGNvbXBvbmVudHMpL0ltYWdlV2l0aEZhbGxiYWNrXCI7XHJcbmltcG9ydCB7IHdpdGhBdXRoIH0gZnJvbSBcIi4uL3dpdGhBdXRoXCI7XHJcbmltcG9ydCB7IHVzZUdldFByb2R1Y3RzUXVlcnkgfSBmcm9tIFwiQC9zdGF0ZS9hcGlcIjtcclxuXHJcbnR5cGUgUHJvZHVjdEZvcm1EYXRhID0ge1xyXG4gIHByb2R1Y3RUeXBlSWQ6IG51bWJlcjtcclxuICBzdXBwbGllcklkOiBudW1iZXI7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIHByaWNlOiBudW1iZXI7XHJcbiAgc3RvY2tRdWFudGl0eTogbnVtYmVyO1xyXG4gIG1pbmltdW1TdG9jazogbnVtYmVyO1xyXG4gIG1heGltdW1TdG9jazogbnVtYmVyO1xyXG59O1xyXG5cclxudHlwZSBQcm9kdWN0Rm9ybURhdGFXaXRoSUQgPSBQcm9kdWN0Rm9ybURhdGEgJiB7IHByb2R1Y3RJZDogc3RyaW5nIH07XHJcblxyXG5jb25zdCBQcm9kdWN0cyA9ICgpID0+IHtcclxuICBjb25zdCBbc2VhcmNoVGVybSwgc2V0U2VhcmNoVGVybV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbY2FydCwgc2V0Q2FydF0gPSB1c2VTdGF0ZTx7IHByb2R1Y3Q6IFByb2R1Y3RGb3JtRGF0YVdpdGhJRDsgcXVhbnRpdHk6IG51bWJlciB9W10+KFtdKTtcclxuXHJcbiAgY29uc3QgeyBkYXRhOiBwcm9kdWN0cywgaXNMb2FkaW5nLCBpc0Vycm9yLCByZWZldGNoIH0gPSB1c2VHZXRQcm9kdWN0c1F1ZXJ5KHNlYXJjaFRlcm0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVBZGRUb0NhcnQgPSAocHJvZHVjdDogUHJvZHVjdEZvcm1EYXRhV2l0aElEKSA9PiB7XHJcbiAgICBzZXRDYXJ0KChwcmV2Q2FydCkgPT4ge1xyXG4gICAgICBjb25zdCBleGlzdGluZ0l0ZW0gPSBwcmV2Q2FydC5maW5kKChpdGVtKSA9PiBpdGVtLnByb2R1Y3QucHJvZHVjdElkID09PSBwcm9kdWN0LnByb2R1Y3RJZCk7XHJcbiAgICAgIGlmIChleGlzdGluZ0l0ZW0pIHtcclxuICAgICAgICByZXR1cm4gcHJldkNhcnQubWFwKChpdGVtKSA9PiAoaXRlbS5wcm9kdWN0LnByb2R1Y3RJZCA9PT0gcHJvZHVjdC5wcm9kdWN0SWQgPyB7IC4uLml0ZW0sIHF1YW50aXR5OiBpdGVtLnF1YW50aXR5ICsgMSB9IDogaXRlbSkpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBbLi4ucHJldkNhcnQsIHsgcHJvZHVjdCwgcXVhbnRpdHk6IDEgfV07XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVRdWFudGl0eUNoYW5nZSA9IChwcm9kdWN0SWQ6IHN0cmluZywgcXVhbnRpdHk6IG51bWJlcikgPT4ge1xyXG4gICAgc2V0Q2FydCgocHJldkNhcnQpID0+IHByZXZDYXJ0Lm1hcCgoaXRlbSkgPT4gKGl0ZW0ucHJvZHVjdC5wcm9kdWN0SWQgPT09IHByb2R1Y3RJZCA/IHsgLi4uaXRlbSwgcXVhbnRpdHk6IE1hdGgubWF4KDEsIHF1YW50aXR5KSB9IDogaXRlbSkpKTtcclxuICB9O1xyXG5cclxuICBpZiAoaXNMb2FkaW5nKSByZXR1cm4gPGRpdj5Mb2FkaW5nLi4uPC9kaXY+O1xyXG4gIGlmIChpc0Vycm9yIHx8ICFwcm9kdWN0cykgcmV0dXJuIDxkaXY+RXJyb3IgYWwgY2FyZ2FyIGxvcyBwcm9kdWN0b3M8L2Rpdj47XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggbXgtYXV0byB3LWZ1bGwgcGItNVwiPlxyXG4gICAgICB7LyogQ2F0w6Fsb2dvIGRlIFByb2R1Y3RvcyAqL31cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTIvMyBwLTRcIj5cclxuICAgICAgICA8SGVhZGVyIG5hbWU9XCJQcm9kdWN0b3NcIiAvPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQnVzY2FyIHByb2R1Y3Rvcy4uLlwiIHZhbHVlPXtzZWFyY2hUZXJtfSBvbkNoYW5nZT17KGUpID0+IHNldFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfSBjbGFzc05hbWU9XCJ3LWZ1bGwgcC0yIG1iLTQgbXQtNSBib3JkZXIgcm91bmRlZFwiIC8+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC00XCI+XHJcbiAgICAgICAgICB7cHJvZHVjdHMubWFwKChwcm9kdWN0OiBQcm9kdWN0Rm9ybURhdGFXaXRoSUQpID0+IChcclxuICAgICAgICAgICAgPGRpdiBrZXk9e3Byb2R1Y3QucHJvZHVjdElkfSBjbGFzc05hbWU9XCJib3JkZXIgcC00IHJvdW5kZWQtbGcgY3Vyc29yLXBvaW50ZXJcIiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVBZGRUb0NhcnQocHJvZHVjdCl9PlxyXG4gICAgICAgICAgICAgIDxJbWFnZVdpdGhGYWxsYmFjayBzcmM9e2AvJHtwcm9kdWN0Lm5hbWUudG9Mb3dlckNhc2UoKX0ucG5nYH0gYWx0PXtwcm9kdWN0Lm5hbWV9IGZhbGxiYWNrPVwiL2ZhbGxiYWNrLnBuZ1wiIHdpZHRoPXsyMDB9IGhlaWdodD17MjAwfSBjbGFzc05hbWU9XCJ3LTUwXCIgLz5cclxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LXNlbWlib2xkXCI+e3Byb2R1Y3QubmFtZX08L2gzPlxyXG4gICAgICAgICAgICAgIDxwPlByZWNpbzogJHtOdW1iZXIocHJvZHVjdC5wcmljZSkudG9GaXhlZCgyKX08L3A+XHJcbiAgICAgICAgICAgICAgPHA+U3RvY2s6IHtwcm9kdWN0LnN0b2NrUXVhbnRpdHl9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHsvKiBDYXJyaXRvIGRlIENvbXByYXMgKi99XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xLzMgcC00IGJvcmRlci1sXCI+XHJcbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1zZW1pYm9sZCBtYi00XCI+Q2Fycml0byBkZSBDb21wcmFzPC9oMj5cclxuICAgICAgICB7Y2FydC5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgICA8cD5ObyBoYXkgcHJvZHVjdG9zIGVuIGVsIGNhcnJpdG88L3A+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAge2NhcnQubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgICAgICAgPGxpIGtleT17aXRlbS5wcm9kdWN0LnByb2R1Y3RJZH0gY2xhc3NOYW1lPVwibWItNFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxyXG4gICAgICAgICAgICAgICAgICA8c3Bhbj57aXRlbS5wcm9kdWN0Lm5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcclxuICAgICAgICAgICAgICAgICAgICBtaW49XCIxXCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17aXRlbS5xdWFudGl0eX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZVF1YW50aXR5Q2hhbmdlKGl0ZW0ucHJvZHVjdC5wcm9kdWN0SWQsIHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xNiBib3JkZXIgcm91bmRlZFwiXHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTUwMFwiPlN1YnRvdGFsOiAke051bWJlcihpdGVtLnByb2R1Y3QucHJpY2UgKiBpdGVtLnF1YW50aXR5KS50b0ZpeGVkKDIpfTwvcD5cclxuICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8VG9hc3RDb250YWluZXIgcG9zaXRpb249XCJ0b3AtcmlnaHRcIiBhdXRvQ2xvc2U9ezUwMDB9IHRoZW1lPVwibGlnaHRcIiB0cmFuc2l0aW9uPXtCb3VuY2V9IC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aEF1dGgoUHJvZHVjdHMpO1xyXG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJIZWFkZXIiLCJCb3VuY2UiLCJUb2FzdENvbnRhaW5lciIsIkltYWdlV2l0aEZhbGxiYWNrIiwid2l0aEF1dGgiLCJ1c2VHZXRQcm9kdWN0c1F1ZXJ5IiwiUHJvZHVjdHMiLCJzZWFyY2hUZXJtIiwic2V0U2VhcmNoVGVybSIsImNhcnQiLCJzZXRDYXJ0IiwiZGF0YSIsInByb2R1Y3RzIiwiaXNMb2FkaW5nIiwiaXNFcnJvciIsInJlZmV0Y2giLCJoYW5kbGVBZGRUb0NhcnQiLCJwcm9kdWN0IiwicHJldkNhcnQiLCJleGlzdGluZ0l0ZW0iLCJmaW5kIiwiaXRlbSIsInByb2R1Y3RJZCIsIm1hcCIsInF1YW50aXR5IiwiaGFuZGxlUXVhbnRpdHlDaGFuZ2UiLCJNYXRoIiwibWF4IiwiZGl2IiwiY2xhc3NOYW1lIiwibmFtZSIsImlucHV0IiwidHlwZSIsInBsYWNlaG9sZGVyIiwidmFsdWUiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJvbkNsaWNrIiwic3JjIiwidG9Mb3dlckNhc2UiLCJhbHQiLCJmYWxsYmFjayIsIndpZHRoIiwiaGVpZ2h0IiwiaDMiLCJwIiwiTnVtYmVyIiwicHJpY2UiLCJ0b0ZpeGVkIiwic3RvY2tRdWFudGl0eSIsImgyIiwibGVuZ3RoIiwidWwiLCJsaSIsInNwYW4iLCJtaW4iLCJwYXJzZUludCIsInBvc2l0aW9uIiwiYXV0b0Nsb3NlIiwidGhlbWUiLCJ0cmFuc2l0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/(dashboard)/purchases/page.tsx\n"));

/***/ })

});