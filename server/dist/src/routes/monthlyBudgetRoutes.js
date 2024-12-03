"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const monthlyBudgetController_1 = require("../controllers/monthlyBudgetController");
const router = (0, express_1.Router)();
router.get("/", monthlyBudgetController_1.getMonthlyBudget);
exports.default = router;
