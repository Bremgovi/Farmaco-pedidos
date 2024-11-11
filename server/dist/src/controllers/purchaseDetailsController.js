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
exports.deletePurchaseDetails = exports.getPurchaseDetailsByPurchaseId = exports.getPurchaseDetails = exports.createPurchaseDetails = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPurchaseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, purchaseId, quantity, unitCost, totalCost, created_at, updated_at } = req.body;
        const purchaseDetails = yield prisma.purchaseDetails.create({
            data: {
                productId, purchaseId, quantity, unitCost, totalCost, created_at, updated_at
            }
        });
        const serializedData = Object.assign(Object.assign({}, purchaseDetails), { purchaseDetailsId: purchaseDetails.purchaseDetailsId.toString() });
        res.status(200).json(serializedData);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating purchase details" + error });
    }
});
exports.createPurchaseDetails = createPurchaseDetails;
const getPurchaseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchaseDetails = yield prisma.purchaseDetails.findMany();
        const serializedData = purchaseDetails.map((detail) => (Object.assign(Object.assign({}, detail), { purchaseDetailsId: detail.purchaseDetailsId.toString() })));
        res.status(200).json(serializedData);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving purchase details" + error });
    }
});
exports.getPurchaseDetails = getPurchaseDetails;
const getPurchaseDetailsByPurchaseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Hola");
        const { purchaseId } = req.params;
        const purchaseDetails = yield prisma.purchaseDetails.findMany({
            where: { purchaseId: purchaseId }
        });
        const serializedData = purchaseDetails.map((detail) => (Object.assign(Object.assign({}, detail), { purchaseDetailsId: detail.purchaseDetailsId.toString() })));
        res.status(200).json(serializedData);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving purchase details by purchase ID" + error });
    }
});
exports.getPurchaseDetailsByPurchaseId = getPurchaseDetailsByPurchaseId;
const deletePurchaseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.purchaseDetails.delete({
            where: { purchaseDetailsId: Number(id) }
        });
        res.status(200).json({ message: "Purchase details deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting purchase details" + error });
    }
});
exports.deletePurchaseDetails = deletePurchaseDetails;
