import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoPass = (configService: ConfigService): string => {
  const dbLogin = configService.get<string>('DB_LOGIN');
  const dbPassword = configService.get<string>('DB_PASSWORD');
  const dbHost = configService.get<string>('DB_HOST');
  const dbPort = configService.get<string>('DB_PORT');
  const dbAuthDatabase = configService.get<string>('DB_AUTHDATABASE');

  return `mongodb://${dbLogin}:${dbPassword}@${dbHost}:${dbPort}/${dbAuthDatabase}`;
};
const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const getMongoConfig = async (
  configService: ConfigService
): Promise<MongooseModuleOptions> => {
  console.log(getMongoPass(configService));
  return {
    uri: getMongoPass(configService),
    ...getMongoOptions(),
  };
};
