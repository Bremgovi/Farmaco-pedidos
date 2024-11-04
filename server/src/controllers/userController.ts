import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10; 

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.users.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users" });
    }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { userId, userTypeId, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    try {
        const user = await prisma.users.create({
            data: { userId, userTypeId, username, email, password: hashedPassword },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error creating usera: " + error });
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { userTypeId, username, email, password } = req.body;
    try {
        let updateData: any = { userTypeId, username, email };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            updateData.password = hashedPassword;
        }
        const user = await prisma.users.update({
            where: {  userId: id },
            data: updateData,
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error updating user: " + error });
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.users.delete({
            where: { userId: id },
        });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user: " + error });
    }
}

