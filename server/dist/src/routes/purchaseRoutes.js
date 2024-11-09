"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchaseController_1 = require("../controllers/purchaseController");
const router = (0, express_1.Router)();
router.get("/", purchaseController_1.getPurchases);
router.post("/", purchaseController_1.createPurchase);
router.delete("/:id", purchaseController_1.deletePurchase);
exports.default = router;
