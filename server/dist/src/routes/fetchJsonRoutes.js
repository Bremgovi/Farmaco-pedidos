"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fetchJson_1 = require("../controllers/fetchJson");
const router = (0, express_1.Router)();
router.get("/fetch/:year/:month", fetchJson_1.fetchJson);
exports.default = router;
