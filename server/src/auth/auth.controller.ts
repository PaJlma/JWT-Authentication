import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthService, ITokens } from "src/auth/auth.service";

import CreateUserDto from "src/types/dtos/user/createUser.dto";
import LoginUserDto from "src/types/dtos/user/loginUser.dto";

@ApiTags("Операции с аутентификацией")
@Controller("auth")
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @ApiOperation({
    summary: "Регистрация",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @Post("register")
  register(@Body() dto: CreateUserDto): Promise<ITokens> {
    return this.authService.register(dto);
  }
  
  @ApiOperation({
    summary: "Авторизация",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @Post("login")
  login(@Body() dto: LoginUserDto): Promise<ITokens> {
    return this.authService.login(dto);
  }
}
