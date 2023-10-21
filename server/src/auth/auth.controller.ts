import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
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

  @ApiOperation({
    summary: "Обновление Refresh токена",
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Patch("refresh/:userId")
  refresh(@Param("userId") userId: string): Promise<ITokens> {
    return this.authService.refresh(userId);
  }
  
  @ApiOperation({
    summary: "Выход из аккаунта",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Delete("logout/:userId")
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Param("userId") userId: string): void {
    this.authService.logout(userId);
  }
}
