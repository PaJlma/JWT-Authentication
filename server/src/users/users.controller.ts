import { Controller, Get, HttpStatus } from "@nestjs/common";

import { UsersService } from "src/users/users.service";

import { User } from "src/types/schemas/user.schema";

import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Операции с пользователями")
@Controller("users")
export class UsersController {
  constructor (private readonly usersService: UsersService) {}
  
  @ApiOperation({
    summary: "Получение списка всех пользователей",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [User],
  })
  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }
}
