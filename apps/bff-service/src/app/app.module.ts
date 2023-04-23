import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { getMongoConfig } from '../config/db-connect.config';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig,
        }),
        UserModule,
        CatalogModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
