import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getClients= async (req: Request, res: Response): Promise<void> => {
    try {
        const clients = await prisma.clients.findMany();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving clients: " + error});
    }
}

export const createClient = async (req: Request, res: Response) : Promise<void> =>  {
    try {
      const { name, paternalSurname, maternalSurname, email, phone } = req.body;
  
      const newClient = await prisma.clients.create({
        data: {
          name,
          paternalSurname,
          maternalSurname,
          email,
          phone,
        },
      });
      res.status(201).json(newClient);
    } catch (error) {
      res.status(500).json({ message: "Error creating client: " + error });
    }
}

export const updateClient = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, paternalSurname, maternalSurname, email, phone } = req.body;

        const updatedClient = await prisma.clients.update({
            where: { clientId: id },
            data: {
                name,
                paternalSurname,
                maternalSurname,
                email,
                phone,
            },
        });
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(500).json({ message: "Error updating client: " + error });
    }
}

export const deleteClient = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.clients.delete({
            where: { clientId: id },
        });
        res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting client: " + error });
    }
}