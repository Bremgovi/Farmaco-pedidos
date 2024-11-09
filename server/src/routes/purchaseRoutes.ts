import { Router } from "express";
import { createPurchase, deletePurchase, getPurchases } from "../controllers/purchaseController";

const router = Router();

router.get("/", getPurchases); 
router.post("/", createPurchase); 
router.delete("/:id", deletePurchase);

export default router;