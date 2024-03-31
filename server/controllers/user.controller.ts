import linksService, { LinksService } from "../services/links.service.js";
import { Request, Response, NextFunction } from "express";
import customError from "../utils/error.js";

class UserController {
  private linksService: LinksService;

  constructor(linksService: LinksService) {
    this.linksService = linksService;
  }

  async findAllLinks(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.linksService.findAll(req.session.user._id);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(customError(error.message, 500));
    }
  }

  async createLink(req: Request, res: Response, next: NextFunction) {
    try {
      const { link } = req.body;
      const response = await this.linksService.create(
        link,
        req.session.user._id
      );
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(customError(error.message, 500));
    }
  }

  async deleteLink(req: Request, res: Response, next: NextFunction) {
    try {
      const { linkId } = req.params;
      const response = await this.linksService.deleteLink(
        linkId,
        req.session.user._id
      );
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(customError(error.message, 500));
    }
  }
}

export default new UserController(linksService);
