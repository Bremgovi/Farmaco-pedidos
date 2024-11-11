import { Router } from "express";
import { createPurchase, deletePurchase, getPurchases, updatePurchase } from "../controllers/purchaseController";

const router = Router();

router.get("/", getPurchases); 
router.post("/", createPurchase); 
router.delete("/:id", deletePurchase);
router.put("/:id", updatePurchase);

export default router;