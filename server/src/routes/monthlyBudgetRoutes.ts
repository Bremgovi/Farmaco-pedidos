import { Router } from "express";
import { getMonthlyBudget } from "../controllers/monthlyBudgetController";

const router = Router();

router.get("/", getMonthlyBudget);

export default router;
