"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchaseDetailsController_1 = require("../controllers/purchaseDetailsController");
const router = (0, express_1.Router)();
router.get("/", purchaseDetailsController_1.getPurchaseDetails);
router.post("/", purchaseDetailsController_1.createPurchaseDetails);
router.delete("/:id", purchaseDetailsController_1.deletePurchaseDetails);
exports.default = router;