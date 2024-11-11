import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPurchases= async (req: Request, res: Response): Promise<void> => {
    try {
        const purchases = await prisma.purchases.findMany();
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving purchases: " + error});
    }
}

export const createPurchase = async (req: Request, res: Response): Promise<void> => {
    try {
        const {purchaseId, userId, transactionStatusId, created_at, updated_at} = req.body;
        const purchase = await prisma.purchases.create({
            data:{
                purchaseId, userId, transactionStatusId, created_at, updated_at
            }
        })
        res.status(200).json(purchase)
    } catch (error) {
        res.status(500).json({message: "Error creating purchase" + error})
    }
}

export const deletePurchase = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.purchases.delete({
            where: { purchaseId: id }
        });
        res.status(200).json({ message: "Purchase deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting purchase: " + error });
    }
}

export const updatePurchase = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { purchaseId, userId, transactionStatusId, created_at, updated_at } = req.body;
        const updatedPurchase = await prisma.purchases.update({
            where: { purchaseId: id },
            data: { purchaseId, userId, transactionStatusId, created_at, updated_at }
        });
        res.status(200).json(updatedPurchase);
    } catch (error) {
        res.status(500).json({ message: "Error updating purchase: " + error });
    }
}