import UsersRepository from "../repositories/users.repository.js";
import DatabaseId from "../types/databaseId.type.js";
import ServiceResponse from "../types/serviceResponse.type.js";

export class UsersService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async updateName(
    userId: string | DatabaseId,
    newName: string
  ): ServiceResponse<{ user: object }> {
    try {
      if (newName.length < 3) {
        return {
          success: false,
          message: "Name must be at least 3 characters",
          statusCode: 400,
        };
      }
      const user = await this.usersRepository.updateOne(
        { _id: userId },
        { name: newName }
      );
      return {
        success: true,
        message: "Profile updated",
        statusCode: 200,
        data: { user },
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new UsersService(new UsersRepository());
