import { Router } from "express";
import { makePrediction } from "../controllers/datasetPredictionController";
const router = Router();

router.post("/", makePrediction); 

export default router;