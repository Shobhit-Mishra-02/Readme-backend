import { Router } from "express";
import { getTemplates } from "../controllers/getTemplates";
import healthCheck from "../controllers/healthCheck";

// create routes here...

const router = Router();

router.get("/", getTemplates);
router.get("/healthCheck", healthCheck);

export default router;
