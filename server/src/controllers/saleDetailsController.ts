import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSaleDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId, saleId, quantity, unitCost, totalCost, created_at, updated_at } = req.body;
        const saleDetails = await prisma.saleDetails.create({
            data: {
                productId, saleId, quantity, unitCost, totalCost, created_at, updated_at
            }
        });
        const serializedData = {
            ...saleDetails,
            saleDetailsId: saleDetails.saleDetailsId.toString(),
        };
        res.status(200).json(serializedData);
    } catch (error) {
        res.status(500).json({ message: "Error creating sale details" + error });
    }
}

export const getSaleDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const saleDetails = await prisma.saleDetails.findMany();
        const serializedData = saleDetails.map((detail) => ({
            ...detail,
            saleDetailsId: detail.saleDetailsId.toString(), 
        }));
        res.status(200).json(serializedData);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving sale details" + error });
    }
}

export const getSaleDetailsBySaleId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { saleId } = req.params;
        const saleDetails = await prisma.saleDetails.findMany({
            where: { saleId: saleId } 
        });
        const serializedData = saleDetails.map((detail) => ({
            ...detail,
            saleDetailsId: detail.saleDetailsId.toString(),
        }));
        res.status(200).json(serializedData);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving sale details by sale ID" + error });
    }
}

export const deleteSaleDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.saleDetails.delete({
            where: { saleDetailsId: Number(id) }
        });
        res.status(200).json({ message: "Sale details deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting sale details" + error });
    }
}
