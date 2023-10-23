import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { User } from "src/types/schemas/user.schema";
import CreateUserDto from "src/types/dtos/user/createUser.dto";

@Injectable()
export class UsersService {
  constructor (@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find({}, { nick: true, email: true, createdAt: true }).exec();
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async getByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (await this.getByEmail(dto.email)) {
      throw new ConflictException("Пользователь с таким email уже существует");
    }

    const createdUser = new this.userModel(dto);
    return createdUser.save();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
