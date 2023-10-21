import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";

import { IConfig } from "src/configuration/config";

import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { SessionsService } from "src/sessions/sessions.service";

import { User } from "src/types/schemas/user.schema";

import CreateUserDto from "src/types/dtos/user/createUser.dto";
import LoginUserDto from "src/types/dtos/user/loginUser.dto";

import * as bcrypt from "bcryptjs";

export interface ITokens {
  access: string;
  refresh: string;
}

@Injectable()
export class AuthService {
  constructor (
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
  ) {}

  async register(dto: CreateUserDto): Promise<ITokens> {
    const hashedPassword = await bcrypt.hash(dto.password, 8);

    const candidate = await this.usersService.create({ ...dto, password: hashedPassword });
    const tokens = await this.generateTokens(candidate);

    await this.sessionsService.create(candidate["_id"], tokens.access, tokens.refresh);

    return tokens;
  }

  async login(dto: LoginUserDto): Promise<ITokens> {
    const user = await this.validate(dto.email, dto.password);

    if (!user) {
      throw new UnauthorizedException("Неправильный пароль");
    }

    const tokens = await this.generateTokens(user);

    try {
      await this.sessionsService.create(user["_id"], tokens.access, tokens.refresh);
    } catch {
      await this.sessionsService.update(user["_id"], tokens.access, tokens.refresh);
    }

    return tokens;
  }

  async refresh(userId: string): Promise<ITokens> {
    const user = await this.usersService.getById(userId);

    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    const tokens = await this.generateTokens(user);

    await this.sessionsService.update(userId, tokens.access, tokens.refresh);

    return tokens;
  }

  async logout(userId: string): Promise<void> {
    await this.sessionsService.remove(userId);
  }

  private async validate(email: string, password: string): Promise<User | undefined> {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new NotFoundException("Пользователь с таким email не существует");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return undefined;
    }

    return user;
  }

  private async generateTokens(user: User): Promise<ITokens> {
    const payload: Omit<User, "password"> = {
      nick: user.nick,
      email: user.email,
      createdAt: user.createdAt,
    }

    return {
      access: await this.jwtService.signAsync(payload, { secret: this.configService.get<IConfig>("app").access_secret, expiresIn: "1m" }),
      refresh: await this.jwtService.signAsync(payload, { secret: this.configService.get<IConfig>("app").refresh_secret, expiresIn: "30d" }),
    }
  }
}
