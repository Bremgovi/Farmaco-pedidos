import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/userController";
import authenticateToken from "../authMiddleware";

const router = Router();

router.get("/", authenticateToken, getUsers); 
router.post("/", authenticateToken,createUser); 
router.delete("/:id", authenticateToken, deleteUser);
router.put("/:id", authenticateToken, updateUser);

export default router;