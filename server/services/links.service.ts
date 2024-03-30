import LinksRepository from "../repositories/links.repository.js";
import DatabaseId from "../types/databaseId.type.js";
import ServiceResponse from "../types/serviceResponse.type.js";
import { nanoid } from "nanoid";
export class LinksService {
  private linksRepository: LinksRepository;

  constructor(linksRepository: LinksRepository) {
    this.linksRepository = linksRepository;
  }

  async create(
    originalLink: string,
    userId: string | DatabaseId
  ): ServiceResponse {
    try {
      if (originalLink.length < 7) {
        return {
          success: false,
          message: "Invalid URL",
          statusCode: 400,
        };
      }
      let shortLink = nanoid(11);
      while (await this.linksRepository.exists({ shortLink })) {
        shortLink = nanoid(11);
      }
      await this.linksRepository.create({
        originalLink,
        shortLink,
        user: userId,
      });
      return { success: true, message: "Link created", statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(
    userId: string | DatabaseId
  ): ServiceResponse<{ links: object[] }> {
    try {
      const links = await this.linksRepository.find({ user: userId });
      return {
        success: true,
        message: "Fetched all link details successfully",
        statusCode: 200,
        data: { links },
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new LinksService(new LinksRepository());
