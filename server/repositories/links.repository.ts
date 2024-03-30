import linksModel from "../models/links.model.js";
import DatabaseId from "../types/databaseId.type.js";

class LinksRepository {
  private model = linksModel;

  async create(data: {
    originalLink: string;
    shortLink: string;
    user: DatabaseId | string;
  }) {
    try {
      return await this.model.create(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(query: object) {
    try {
      return await this.model.findOne(query);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async find(query: object) {
    try {
      return await this.model.find(query);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteOne(query: object) {
    try {
      return await this.model.deleteOne(query);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async exists(query: object) {
    try {
      return await this.model.exists(query);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default LinksRepository;
