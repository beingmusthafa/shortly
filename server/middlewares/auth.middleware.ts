import { Request, Response, NextFunction } from "express";
import customError from "../utils/error.js";
import jwt from "jsonwebtoken";
import DatabaseId from "../types/databaseId.type.js";
import UsersRepository from "../repositories/users.repository.js";

declare global {
  namespace Express {
    interface Request {
      session: {
        user?: { _id: string | DatabaseId; name: string; email: string };
      };
    }
  }
}

class AuthMiddleware {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async userAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        throw customError("Unauthorized", 401);
      }
      const { id } = jwt.verify(token, process.env.JWT_SECRET) as {
        id: string;
      };
      if (req.session.user) return next();
      req.session.user = await this.usersRepository.findOne(
        { _id: id },
        { password: 0 }
      );
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
export default new AuthMiddleware(new UsersRepository());
