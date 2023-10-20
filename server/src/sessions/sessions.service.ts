import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { Session } from "src/types/schemas/session.schema";

import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";

dayjs.extend(utc);

@Injectable()
export class SessionsService {
  constructor (@InjectModel(Session.name) private readonly sessionModel: Model<Session>) {}

  async getByUserId(user: string): Promise<Session> {
    return this.sessionModel.findOne({ user }).exec();
  }

  async getByAccessToken(accessToken: string): Promise<Session> {
    return this.sessionModel.findOne({ accessToken }).exec();
  }
  
  async getByRefreshToken(refreshToken: string): Promise<Session> {
    return this.sessionModel.findOne({ refreshToken }).exec();
  }
  
  async create(user: string, accessToken: string, refreshToken: string): Promise<Session> {
    if (await this.getByUserId(user)) {
      throw new ConflictException("Сессия для этого пользователя уже создана");
    }

    if ((await this.getByAccessToken(accessToken)) || (await this.getByRefreshToken(refreshToken))) {
      throw new ConflictException("Этот токен уже используется");
    }

    const createdSession = new this.sessionModel({ user, accessToken, refreshToken });
    return createdSession.save();
  }

  async remove(user: string): Promise<Session> {
    return this.sessionModel.findOneAndDelete({ user }).exec();
  }

  async update(user: string, accessToken: string, refreshToken: string): Promise<Session> {
    return this.sessionModel.findOneAndUpdate({ user }, {
      $set: {
        accessToken,
        refreshToken,
        createdAt: dayjs().utc().unix(),
        expiresAt: dayjs().utc().add(30, "day").unix(),
      }
    });
  }
}
