import { Router } from "express";
import { getLoginInfo, login } from "../controllers/loginController";
import authenticateToken from "../authMiddleware";
const router = Router();

router.post("/", login); 
router.get("/", authenticateToken(1), getLoginInfo); 
 
export default router;