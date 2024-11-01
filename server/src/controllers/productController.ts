import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getProducts = async (req: Request, res: Response): Promise<void> =>{
    try {
        const search = req.query.search?.toString();
        const products = await prisma.products.findMany({
            where: {
                name:{
                    contains: search
                }
            }
        })
        res.json(products);
    } catch (error) {
        res.status(500).json({message: "Error retrieving products"})
    }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const {productId, productTypeId, supplierId, name, price, rating, stockQuantity, minimumStock, maximumStock} = req.body;
        const product = await prisma.products.create({
            data:{
                productId,
                productTypeId,
                supplierId,
                name,
                price,
                rating,
                stockQuantity,
                minimumStock,
                maximumStock
            }
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: "Error creating product" + error})
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.products.delete({
            where: {
                productId: id
            },
        });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
};