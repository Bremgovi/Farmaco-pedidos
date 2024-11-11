import { Router } from "express";
import { createSale, deleteSale, getSales, updateSale } from "../controllers/saleController";

const router = Router();

router.get("/", getSales); 
router.post("/", createSale); 
router.delete("/:id", deleteSale);
router.put("/:id", updateSale);

export default router;