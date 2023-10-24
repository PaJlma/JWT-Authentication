import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({
    description: "Псевдоним пользователя",
    example: "PaJlma",
    required: true,
  })
  @Prop({ required: true })
  nick: string;
  
  @ApiProperty({
    description: "Электронный почтовый адрес",
    example: "example@gmail.com",
    required: true,
    uniqueItems: true,
  })
  @Prop({ required: true, unique: true })
  email: string;
  
  @ApiProperty({
    description: "Пароль пользователя",
    example: "123456",
    minLength: 6,
    maxLength: 25,
    required: true,
  })
  @Prop({ required: true })
  password: string;
  
  @ApiProperty({
    description: "Дата и время создания аккаунта пользователя",
    example: "21-10-2023 18:43:12",
    format: "DD-MM-YYYY HH:mm:ss",
  })
  @Prop({ required: true })
  createdAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);