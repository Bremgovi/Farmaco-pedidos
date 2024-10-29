import { Router } from "express";
import { getSuppliers } from "../controllers/supplierControler";

const router = Router();

router.get("/", getSuppliers);

export default router;
