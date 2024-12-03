"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (requiredTypes) => (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ message: "Token is invalid" + err });
            return;
        }
        const userTypeId = user.user.userTypeId;
        if (requiredTypes !== undefined) {
            const typesArray = Array.isArray(requiredTypes) ? requiredTypes : [requiredTypes];
            if (!typesArray.includes(userTypeId)) {
                return res.status(403).json({ message: 'Access forbidden: insufficient privileges' });
            }
        }
        req.user = user;
        next();
    });
};
exports.default = authenticateToken;
