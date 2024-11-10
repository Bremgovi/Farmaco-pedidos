import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPurchaseDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId, purchaseId, quantity, unitCost, totalCost, added_at, updated_at } = req.body;
        const purchaseDetails = await prisma.purchaseDetails.create({
            data: {
                productId, purchaseId, quantity, unitCost, totalCost, added_at, updated_at
            }
        });
        const serializedData = {
            ...purchaseDetails,
            purchaseDetailsId: purchaseDetails.purchaseDetailsId.toString(),
        };
        res.status(200).json(serializedData);
    } catch (error) {
        res.status(500).json({ message: "Error creating purchase details" + error });
    }
}

export const getPurchaseDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const purchaseDetails = await prisma.purchaseDetails.findMany();
        const serializedData = purchaseDetails.map((detail) => ({
            ...detail,
            purchaseDetailsId: detail.purchaseDetailsId.toString(), 
        }));
        res.status(200).json(serializedData);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving purchase details" + error });
    }
}

export const getPurchaseDetailsByPurchaseId = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Hola")
        const { purchaseId } = req.params;
        const purchaseDetails = await prisma.purchaseDetails.findMany({
            where: { purchaseId: purchaseId } 
        });
        const serializedData = purchaseDetails.map((detail) => ({
            ...detail,
            purchaseDetailsId: detail.purchaseDetailsId.toString(),
        }));
        res.status(200).json(serializedData);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving purchase details by purchase ID" + error });
    }
}

export const deletePurchaseDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.purchaseDetails.delete({
            where: { purchaseDetailsId: Number(id) }
        });
        res.status(200).json({ message: "Purchase details deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting purchase details" + error });
    }
}
