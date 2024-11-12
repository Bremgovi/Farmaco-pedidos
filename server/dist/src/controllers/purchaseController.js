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
exports.updatePurchase = exports.deletePurchase = exports.createPurchase = exports.getPurchases = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPurchases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchases = yield prisma.purchases.findMany();
        res.status(200).json(purchases);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving purchases: " + error });
    }
});
exports.getPurchases = getPurchases;
const createPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { purchaseId, userId, transactionStatusId, created_at, updated_at } = req.body;
        const purchase = yield prisma.purchases.create({
            data: {
                purchaseId, userId, transactionStatusId, created_at, updated_at
            }
        });
        res.status(200).json(purchase);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating purchase" + error });
    }
});
exports.createPurchase = createPurchase;
const deletePurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.purchaseDetails.deleteMany({
            where: { purchaseId: id }
        });
        yield prisma.purchases.delete({
            where: { purchaseId: id }
        });
        res.status(200).json({ message: "Purchase and related details deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting purchase: " + error });
    }
});
exports.deletePurchase = deletePurchase;
const updatePurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { purchaseId, userId, transactionStatusId, created_at, updated_at } = req.body;
        const updatedPurchase = yield prisma.purchases.update({
            where: { purchaseId: id },
            data: { purchaseId, userId, transactionStatusId, created_at, updated_at }
        });
        res.status(200).json(updatedPurchase);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating purchase: " + error });
    }
});
exports.updatePurchase = updatePurchase;
