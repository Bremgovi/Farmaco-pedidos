"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const datasetController_1 = require("../controllers/datasetController");
const router = (0, express_1.Router)();
router.post("/", datasetController_1.addRegistry);
exports.default = router;
