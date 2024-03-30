import { Router, Request, Response, NextFunction } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import userController from "../controllers/user.controller.js";

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) =>
  authMiddleware.userAuth(req, res, next)
);

router.get(
  "/get-all-links",
  (req: Request, res: Response, next: NextFunction) =>
    userController.findAllLinks(req, res, next)
);

router.post("/create-link", (req: Request, res: Response, next: NextFunction) =>
  userController.createLink(req, res, next)
);
export default router;
