import express from "express";
import { getThreats , detectAndStoreThreat} from "../controllers/threat.controllers.js";

const router = express.Router();

router.get("/", getThreats);
router.post("/detect", detectAndStoreThreat);

export default router;
