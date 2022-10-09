import { Router } from "express";
import { getTemplates } from "../controllers/getTemplates";

// create routes here...

const router = Router();

router.get("/", getTemplates);

export default router;
