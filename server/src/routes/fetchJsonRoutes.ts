import { Router } from "express";
import { fetchJson } from "../controllers/fetchJson";
const router = Router();

router.get("/fetch/:year/:month", fetchJson); 

export default router;