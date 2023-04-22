/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3000;
    const globalPrefix = 'api';

    app.enableCors({
        origin: `http://localhost:${process.env.PORT || 3000}`,
        credentials: true,
    });
    app.use(cookieParser());

    app.setGlobalPrefix(globalPrefix);
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
