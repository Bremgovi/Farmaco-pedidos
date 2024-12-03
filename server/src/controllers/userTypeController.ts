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

export const createUserType = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userType } = req.body;
        const newUserType = await prisma.userTypes.create({
            data: { userType }
        });
        res.status(201).json(newUserType);
    } catch (error) {
        res.status(500).json({ message: "Error creating user type" });
    }
}

export const updateUserType = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedUserType = await prisma.userTypes.update({
            where: { userTypeId: Number(id) },
            data: { userType: name}
        });
        res.json(updatedUserType);
    } catch (error) {
        res.status(500).json({ message: "Error updating user type" });
    }
}

export const deleteUserType = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.userTypes.delete({
            where: { userTypeId: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting user type" });
    }
}
