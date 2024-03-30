import { QueryOptions } from "mongoose";
import usersModel from "../models/users.model.js";

class UsersRepository {
  private model = usersModel;

  async create(data: { name: string; email: string; password: string }) {
    try {
      return await this.model.create(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(query: object, select?: object) {
    try {
      return await this.model.findOne(query, select);
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
}

export default UsersRepository;
