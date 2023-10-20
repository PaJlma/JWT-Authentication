import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

import { User } from "src/types/schemas/user.schema";

import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ required: true, unique: true })
  accessToken: string;

  @Prop({ required: true, unique: true })
  refreshToken: string;

  @Prop({ default: dayjs().utc().unix() })
  createdAt: number;

  @Prop( { default: dayjs().utc().add(30, "day").unix() } )
  expiresAt: number;
}

export const SessionSchema = SchemaFactory.createForClass(Session);