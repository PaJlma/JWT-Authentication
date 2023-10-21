import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

import { User } from "src/types/schemas/user.schema";

import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
  @ApiProperty({
    description: "ObjectId Пользователя",
    example: "6532ce6b31029f284130d5b4",
    required: true,
    uniqueItems: true,
  })
  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: User;
  
  @ApiProperty({
    description: "Access токен, который действует для этого пользователя в данный момент",
    required: true,
    uniqueItems: true,
  })
  @Prop({ required: true, unique: true })
  accessToken: string;
  
  @ApiProperty({
    description: "Refresh токен, который действует для этого пользователя в данный момент",
    required: true,
    uniqueItems: true,
  })
  @Prop({ required: true, unique: true })
  refreshToken: string;
  
  @ApiProperty({
    description: "Время, когда был создан Refresh токен в формате unix",
    example: 1697828965,
    format: "unix",
  })
  @Prop({ default: dayjs().utc().unix() })
  createdAt: number;
  
  @ApiProperty({
    description: "Время, когда умрет Refresh токен в формате unix",
    example: 1700420965,
    format: "unix",
  })
  @Prop( { default: dayjs().utc().add(30, "day").unix() } )
  expiresAt: number;
}

export const SessionSchema = SchemaFactory.createForClass(Session);