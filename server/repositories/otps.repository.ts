import otpsModel from "../models/otps.model.js";

export class OtpsRepository {
  private model = otpsModel;

  async create(data: { email: string; code: number }) {
    try {
      return await this.model.create(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteOne(email: string) {
    try {
      return await this.model.deleteOne({ email });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(data: { email: string; code?: number }) {
    try {
      return await this.model.findOne(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
