export interface IConfig {
  port: string;
  mongo_uri: string;
  access_secret: string;
  refresh_secret: string;
}

interface IConfigReturns {
  app: IConfig;
}

export const config = (): IConfigReturns => ({
  app: {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    access_secret: process.env.ACCESS_SECRET,
    refresh_secret: process.env.REFRESH_SECRET,
  }  
});