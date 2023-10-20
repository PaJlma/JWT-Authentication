import { Body, Controller, Post } from "@nestjs/common";

import { AuthService, ITokens } from "src/auth/auth.service";

import CreateUserDto from "src/types/dtos/user/createUser.dto";
import LoginUserDto from "src/types/dtos/user/loginUser.dto";

@Controller("auth")
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() dto: CreateUserDto): Promise<ITokens> {
    return this.authService.register(dto);
  }

  @Post("login")
  login(@Body() dto: LoginUserDto): Promise<ITokens> {
    return this.authService.login(dto);
  }
}
