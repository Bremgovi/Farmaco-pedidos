import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/userController";
import authenticateToken from "../authMiddleware";

const router = Router();

router.get("/",  getUsers); 
router.post("/", createUser); 
router.delete("/:id",  deleteUser);
router.put("/:id",  updateUser);

export default router;