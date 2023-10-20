import { Controller, Get } from "@nestjs/common";

import { UsersService } from "src/users/users.service";

import { User } from "src/types/schemas/user.schema";

@Controller("users")
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }
}
