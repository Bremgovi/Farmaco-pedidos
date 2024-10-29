"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productTypeController_1 = require("../controllers/productTypeController");
const router = (0, express_1.Router)();
router.get("/", productTypeController_1.getProductTypes);
exports.default = router;
