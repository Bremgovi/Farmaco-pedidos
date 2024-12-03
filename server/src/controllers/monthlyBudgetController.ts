import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMonthlyBudget = async (req: Request, res: Response): Promise<void> => {
    try {
        const montlyBudgets = await prisma.monthlyBudget.findMany();
        res.json(montlyBudgets);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving monthly budgets" });
    }
}