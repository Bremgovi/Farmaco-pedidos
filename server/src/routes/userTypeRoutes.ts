import { Router } from "express";
import { createUserType, deleteUserType, getUserTypes, updateUserType } from "../controllers/userTypeController";

const router = Router();

router.get("/", getUserTypes);
router.post("/", createUserType); 
router.delete("/:id", deleteUserType);
router.put("/:id", updateUserType);

export default router;
