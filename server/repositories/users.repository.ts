import usersModel from "../models/users.model.js";

class UsersRepository {
  private model = usersModel;

  async create(data: { name: string; email: string; password: string }) {
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

export default UsersRepository;
