
import { Router } from "express";
import * as controller from "./auth.controller.js"
import validate from "../../common/middleware/validate.middleware.js";
const router = Router();

router.post("/register",controller.register)

export default router;
