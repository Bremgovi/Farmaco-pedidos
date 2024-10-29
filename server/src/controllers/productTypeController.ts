import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProductTypes = async (req: Request, res: Response): Promise<void> => {
    try {
        const productTypes = await prisma.productTypes.findMany();
        res.json(productTypes);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product types" });
    }
}

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