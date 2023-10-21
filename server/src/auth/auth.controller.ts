import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

import { AuthService } from "src/auth/auth.service";

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
  async register(@Body() dto: CreateUserDto, @Res({ passthrough: true }) response: Response): Promise<string> {
    const { access, refresh } = await this.authService.register(dto);
    response.cookie("refresh", refresh);
    return access;
  }
  
  @ApiOperation({
    summary: "Авторизация",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @Post("login")
  async login(@Body() dto: LoginUserDto, @Res({ passthrough: true }) response: Response): Promise<string> {
    const { access, refresh } = await this.authService.login(dto);
    response.cookie("refresh", refresh);
    return access;
  }

  @ApiOperation({
    summary: "Обновление Refresh токена",
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Patch("refresh/:userId")
  async refresh(@Param("userId") userId: string, @Res({ passthrough: true }) response: Response): Promise<string> {
    const { access, refresh } = await this.authService.refresh(userId);
    response.cookie("refresh", refresh);
    return access;
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
