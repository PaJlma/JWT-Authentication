import { Module, forwardRef } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { SessionsModule } from "src/sessions/sessions.module";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./auth.service";

import { AuthController } from "./auth.controller";

@Module({
  imports: [
    JwtModule.register({}),
    forwardRef(() => UsersModule),
    SessionsModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, SessionsModule],
})
export class AuthModule {}
