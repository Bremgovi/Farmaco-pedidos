"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supplierControler_1 = require("../controllers/supplierControler");
const router = (0, express_1.Router)();
router.get("/", supplierControler_1.getSuppliers);
exports.default = router;
