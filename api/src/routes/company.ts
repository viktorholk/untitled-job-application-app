import { Router, Request, Response } from "express";

import { getAll } from "@/controllers/company";
import AuthMiddleware from "@/middlewares/auth";

const router = Router();

router.get("/", AuthMiddleware, getAll);

export default router;
