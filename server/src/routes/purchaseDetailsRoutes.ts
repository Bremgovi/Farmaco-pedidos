import { Router } from "express";
import { createPurchaseDetails, deletePurchaseDetails, getPurchaseDetails, getPurchaseDetailsByPurchaseId } from "../controllers/purchaseDetailsController";

const router = Router();

router.get("/", getPurchaseDetails);
router.get("/purchase/:purchaseId", getPurchaseDetailsByPurchaseId); 
router.post("/", createPurchaseDetails);
router.delete("/:id", deletePurchaseDetails);

export default router;