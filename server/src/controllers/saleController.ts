import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSales= async (req: Request, res: Response): Promise<void> => {
    try {
        const sales = await prisma.sales.findMany();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving sales: " + error});
    }
}

export const createSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const {saleId, userId, transactionStatusId, clientId, created_at, updated_at} = req.body;
        const sale = await prisma.sales.create({
            data:{
                saleId, userId, transactionStatusId, clientId, created_at, updated_at
            }
        })
        res.status(200).json(sale)
    } catch (error) {
        res.status(500).json({message: "Error creating sale" + error})
    }
}

export const deleteSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.sales.delete({
            where: { saleId: id }
        });
        res.status(200).json({ message: "Sale deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting sale: " + error });
    }
}

export const updateSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { saleId, userId, transactionStatusId, clientId, created_at, updated_at } = req.body;
        const updatedsale = await prisma.sales.update({
            where: { saleId: id },
            data: { saleId, userId, transactionStatusId, created_at, clientId, updated_at }
        });
        res.status(200).json(updatedsale);
    } catch (error) {
        res.status(500).json({ message: "Error updating sale: " + error });
    }
}