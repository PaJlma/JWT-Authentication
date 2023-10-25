import { Controller, Get, HttpStatus, UseGuards } from "@nestjs/common";

import { UsersService } from "src/users/users.service";

import { AuthGuard } from "src/auth/auth.guard";

import { User } from "src/types/schemas/user.schema";

import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Операции с пользователями")
@Controller("users")
export class UsersController {
  constructor (private readonly usersService: UsersService) {}
  
  @UseGuards(AuthGuard)
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
