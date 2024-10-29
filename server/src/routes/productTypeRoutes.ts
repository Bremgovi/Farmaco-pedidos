import { Router } from "express";
import { getProductTypes } from "../controllers/productTypeController";

const router = Router();

router.get("/", getProductTypes);

export default router;
