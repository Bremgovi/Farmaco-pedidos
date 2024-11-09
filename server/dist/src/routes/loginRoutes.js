"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
const authMiddleware_1 = __importDefault(require("../authMiddleware"));
const router = (0, express_1.Router)();
router.post("/", loginController_1.login);
router.get("/", (0, authMiddleware_1.default)(1), loginController_1.getLoginInfo);
exports.default = router;
