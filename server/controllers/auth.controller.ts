import { Request, Response, NextFunction, response } from "express";
import authService, { AuthService } from "../services/auth.service.js";
import customError from "../utils/error.js";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const response = await this.authService.signIn(email, password);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(customError(error.message, 500));
    }
  }

  async startSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const response = await this.authService.startSignUp(email);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(customError(error.message, 500));
    }
  }

  async finishSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, code, name, password } = req.body;
      const reponse = await this.authService.finishSignUp({
        email,
        code,
        name,
        password,
      });
      res.status(200).json(reponse);
    } catch (error) {
      console.log(error);
      next(customError(error.message, 500));
    }
  }
}

export default new AuthController(authService);
