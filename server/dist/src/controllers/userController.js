"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const SALT_ROUNDS = 10;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.users.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving users" });
    }
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, userTypeId, username, email, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
    try {
        const user = yield prisma.users.create({
            data: { userId, userTypeId, username, email, password: hashedPassword },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating usera: " + error });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userTypeId, username, email, password } = req.body;
    try {
        let updateData = { userTypeId, username, email };
        if (password) {
            const hashedPassword = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
            updateData.password = hashedPassword;
        }
        const user = yield prisma.users.update({
            where: { userId: id },
            data: updateData,
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user: " + error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.users.delete({
            where: { userId: id },
        });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user: " + error });
    }
});
exports.deleteUser = deleteUser;
