import { Router } from "express";
import { getUserTypes } from "../controllers/userTypeController";

const router = Router();

router.get("/", getUserTypes);

export default router;
