import { Router } from "express";
import { createClient, deleteClient, getClients, updateClient } from "../controllers/clientController";

const router = Router();

router.get("/", getClients); 
router.post("/", createClient); 
router.delete("/:id", deleteClient);
router.put("/:id", updateClient);

export default router;