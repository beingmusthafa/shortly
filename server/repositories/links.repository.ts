import linksModel from "../models/links.model.js";
import DatabaseId from "../types/databaseId.type.js";

class LinksRepository {
  private model = linksModel;

  async create(data: {
    originalLink: string;
    shortLink: string;
    user: DatabaseId | string;
  }) {
    return await this.model.create(data);
  }

  async findOne(query: object) {
    return await this.model.findOne(query);
  }

  async find(query: object) {
    return await this.model.find(query);
  }

  async deleteOne(query: object) {
    return await this.model.deleteOne(query);
  }
}

export default LinksRepository;
