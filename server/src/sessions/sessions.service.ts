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

  async getByUserId(userId: string): Promise<Session> {
    return this.sessionModel.findOne({ userId }).exec();
  }

  async getByAccessToken(accessToken: string): Promise<Session> {
    return this.sessionModel.findOne({ accessToken }).exec();
  }
  
  async getByRefreshToken(refreshToken: string): Promise<Session> {
    return this.sessionModel.findOne({ refreshToken }).exec();
  }

  async getByUserIdAndAccessToken(userId: string, accessToken: string): Promise<Session> {
    return this.sessionModel.findOne({ userId, accessToken }).exec();
  }

  async getByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<Session> {
    return this.sessionModel.findOne({ userId, refreshToken }).exec();
  }
  
  async create(userId: string, accessToken: string, refreshToken: string): Promise<Session> {
    if (await this.getByUserId(userId)) {
      throw new ConflictException("Сессия для этого пользователя уже создана");
    }

    if ((await this.getByAccessToken(accessToken)) || (await this.getByRefreshToken(refreshToken))) {
      throw new ConflictException("Этот токен уже используется");
    }

    const createdSession = new this.sessionModel({ userId, accessToken, refreshToken, createdAt: dayjs().utc().unix(), expiresAt: dayjs().utc().add(30, "day").unix() });
    return createdSession.save();
  }

  async remove(userId: string): Promise<Session> {
    return this.sessionModel.findOneAndDelete({ userId }).exec();
  }

  async update(userId: string, accessToken: string, refreshToken: string): Promise<Session> {
    return this.sessionModel.findOneAndUpdate({ userId }, {
      $set: {
        accessToken,
        refreshToken,
        createdAt: dayjs().utc().unix(),
        expiresAt: dayjs().utc().add(30, "day").unix(),
      }
    });
  }
}
