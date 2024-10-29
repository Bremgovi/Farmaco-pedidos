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
exports.getProductTypes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProductTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productTypes = yield prisma.productTypes.findMany();
        res.json(productTypes);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving product types" });
    }
});
exports.getProductTypes = getProductTypes;
/*
export const createProductType = async (req: Request, res: Response): Promise<void> => {
    try {
        const { type } = req.body;
        const productType = await prisma.productTypes.create({
            data: { type }
        });
        res.status(201).json(productType);
    } catch (error) {
        res.status(500).json({ message: "Error creating product type" });
    }
}
*/ 
