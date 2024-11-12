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
exports.updateSale = exports.deleteSale = exports.createSale = exports.getSales = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield prisma.sales.findMany();
        res.status(200).json(sales);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving sales: " + error });
    }
});
exports.getSales = getSales;
const createSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { saleId, userId, transactionStatusId, clientId, created_at, updated_at } = req.body;
        const sale = yield prisma.sales.create({
            data: {
                saleId, userId, transactionStatusId, clientId, created_at, updated_at
            }
        });
        res.status(200).json(sale);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating sale" + error });
    }
});
exports.createSale = createSale;
const deleteSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.saleDetails.deleteMany({
            where: { saleId: id }
        });
        yield prisma.sales.delete({
            where: { saleId: id }
        });
        res.status(200).json({ message: "Sale deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting sale: " + error });
    }
});
exports.deleteSale = deleteSale;
const updateSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { saleId, userId, transactionStatusId, clientId, created_at, updated_at } = req.body;
        const updatedsale = yield prisma.sales.update({
            where: { saleId: id },
            data: { saleId, userId, transactionStatusId, created_at, clientId, updated_at }
        });
        res.status(200).json(updatedsale);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating sale: " + error });
    }
});
exports.updateSale = updateSale;
