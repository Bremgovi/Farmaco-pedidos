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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserType = exports.updateUserType = exports.createUserType = exports.getUserTypes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userTypes = yield prisma.userTypes.findMany();
        res.json(userTypes);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving user types" });
    }
});
exports.getUserTypes = getUserTypes;
const createUserType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userType } = req.body;
        const newUserType = yield prisma.userTypes.create({
            data: { userType }
        });
        res.status(201).json(newUserType);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user type" });
    }
});
exports.createUserType = createUserType;
const updateUserType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedUserType = yield prisma.userTypes.update({
            where: { userTypeId: Number(id) },
            data: { userType: name }
        });
        res.json(updatedUserType);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user type" });
    }
});
exports.updateUserType = updateUserType;
const deleteUserType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.userTypes.delete({
            where: { userTypeId: Number(id) }
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user type" });
    }
});
exports.deleteUserType = deleteUserType;
