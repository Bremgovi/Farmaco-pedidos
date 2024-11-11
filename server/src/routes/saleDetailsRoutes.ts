import { Router } from "express";
import { createSaleDetails, deleteSaleDetails, getSaleDetails, getSaleDetailsBySaleId } from "../controllers/saleDetailsController";

const router = Router();

router.get("/", getSaleDetails);
router.get("/sale/:saleId", getSaleDetailsBySaleId); 
router.post("/", createSaleDetails);
router.delete("/:id", deleteSaleDetails);

export default router;