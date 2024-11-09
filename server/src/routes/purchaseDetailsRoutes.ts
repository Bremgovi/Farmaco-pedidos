import { Router } from "express";
import { createPurchaseDetails, deletePurchaseDetails, getPurchaseDetails } from "../controllers/purchaseDetailsController";

const router = Router();

router.get("/", getPurchaseDetails); 
router.post("/", createPurchaseDetails); 
router.delete("/:id", deletePurchaseDetails);

export default router;