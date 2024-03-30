import { OtpsRepository } from "../repositories/otps.repository.js";
import UsersRepository from "../repositories/users.repository.js";
import ServiceResponse from "../types/serviceResponse.type.js";
import mailer from "../utils/mailer.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  private usersRepository: UsersRepository;
  private otpsRepository: OtpsRepository;
  private hashPassword(password: string) {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
  }
  private comparePassword(password: string, hash: string) {
    return bcryptjs.compareSync(password, hash);
  }
  private generateToken(payload: { id: string }) {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }

  constructor(
    usersRepository: UsersRepository,
    otpsRepository: OtpsRepository
  ) {
    this.usersRepository = usersRepository;
    this.otpsRepository = otpsRepository;
  }

  async signIn(
    email: string,
    password: string
  ): ServiceResponse<{ user: object; token: string }> {
    try {
      const user = await this.usersRepository.findOne({ email });
      if (!user) {
        return {
          success: false,
          message: "User not found",
          statusCode: 404,
        };
      }
      if (!this.comparePassword(password, user.password)) {
        return {
          success: false,
          message: "Invalid password",
          statusCode: 401,
        };
      }
      const { password: _, ...rest } = user;
      return {
        success: true,
        message: "User signed in",
        statusCode: 200,
        data: {
          user: rest,
          token: this.generateToken({ id: user._id.toString() }),
        },
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async startSignUp(
    email: string
  ): ServiceResponse<{ formError?: { email: string } }> {
    try {
      const user = await this.usersRepository.findOne({ email });
      if (user) {
        return {
          success: false,
          message: "Email already exists",
          statusCode: 400,
          data: { formError: { email: "Email already exists" } },
        };
      }
      const code = Math.floor(100000 + Math.random() * 900000);
      await this.otpsRepository.deleteOne(email);
      await mailer.sendVerificationMail(email, code);
      await this.otpsRepository.create({ email, code });
      return {
        success: true,
        message: "Verification code sent",
        statusCode: 201,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async finishSignUp(data: {
    name: string;
    email: string;
    password: string;
    code: number;
  }): ServiceResponse<{ user: object; token: string }> {
    try {
      const otp = await this.otpsRepository.findOne({
        email: data.email,
        code: data.code,
      });
      if (!otp) {
        return {
          success: false,
          message: "Invalid verification code",
          statusCode: 400,
        };
      }
      const hashedPassword = this.hashPassword(data.password);
      const user = await this.usersRepository.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      });
      const { password: _, ...rest } = user;
      return {
        success: true,
        message: "User created",
        statusCode: 201,
        data: {
          user: rest,
          token: this.generateToken({ id: user._id.toString() }),
        },
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new AuthService(new UsersRepository(), new OtpsRepository());
