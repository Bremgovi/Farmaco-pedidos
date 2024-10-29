import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSuppliers = async (req: Request, res: Response): Promise<void> => {
    try {
        const suppliers = await prisma.suppliers.findMany();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving suppliers" });
    }
}
