import { Router } from "express";
import { addRegistry } from "../controllers/datasetController";
const router = Router();

router.post("/", addRegistry); 

export default router;