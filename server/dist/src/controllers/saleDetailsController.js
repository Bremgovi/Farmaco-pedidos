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
exports.deleteSaleDetails = exports.getSaleDetailsBySaleId = exports.getSaleDetails = exports.createSaleDetails = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createSaleDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, saleId, quantity, unitCost, totalCost, created_at, updated_at } = req.body;
        const saleDetails = yield prisma.saleDetails.create({
            data: {
                productId, saleId, quantity, unitCost, totalCost, created_at, updated_at
            }
        });
        const serializedData = Object.assign(Object.assign({}, saleDetails), { saleDetailsId: saleDetails.saleDetailsId.toString() });
        res.status(200).json(serializedData);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating sale details" + error });
    }
});
exports.createSaleDetails = createSaleDetails;
const getSaleDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saleDetails = yield prisma.saleDetails.findMany();
        const serializedData = saleDetails.map((detail) => (Object.assign(Object.assign({}, detail), { saleDetailsId: detail.saleDetailsId.toString() })));
        res.status(200).json(serializedData);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving sale details" + error });
    }
});
exports.getSaleDetails = getSaleDetails;
const getSaleDetailsBySaleId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { saleId } = req.params;
        const saleDetails = yield prisma.saleDetails.findMany({
            where: { saleId: saleId }
        });
        const serializedData = saleDetails.map((detail) => (Object.assign(Object.assign({}, detail), { saleDetailsId: detail.saleDetailsId.toString() })));
        res.status(200).json(serializedData);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving sale details by sale ID" + error });
    }
});
exports.getSaleDetailsBySaleId = getSaleDetailsBySaleId;
const deleteSaleDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.saleDetails.delete({
            where: { saleDetailsId: Number(id) }
        });
        res.status(200).json({ message: "Sale details deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting sale details" + error });
    }
});
exports.deleteSaleDetails = deleteSaleDetails;
