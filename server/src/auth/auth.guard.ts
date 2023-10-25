import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IConfig } from 'src/configuration/config';
import { SessionsService } from 'src/sessions/sessions.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (
    private readonly sessionsService: SessionsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [ userId, token ] = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    if (!await this.sessionsService.getByUserIdAndAccessToken(userId, token)) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<IConfig>("app").access_secret,
        }
      );

      request["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): [ userId: string, token: string ] | undefined {
    const [ type, userId, token ] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? [ userId, token ] : undefined;
  }
}
