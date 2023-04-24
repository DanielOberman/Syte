import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { getMongoConfig } from '../config/db-connect.config';

import { AppController } from './app.controller';
import { ClientModule } from './client/client.module';
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
        ClientModule,
        CatalogModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
