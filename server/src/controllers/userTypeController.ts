import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserTypes = async (req: Request, res: Response): Promise<void> => {
    try {
        const userTypes = await prisma.userTypes.findMany();
        res.json(userTypes);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user types" });
    }
}
