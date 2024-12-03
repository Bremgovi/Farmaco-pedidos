"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const datasetPredictionController_1 = require("../controllers/datasetPredictionController");
const router = (0, express_1.Router)();
router.post("/", datasetPredictionController_1.makePrediction);
exports.default = router;
