import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { CatalogModel, CatalogSchema } from './models/catalog.model';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: CatalogModel.name,
                schema: CatalogSchema,
            },
        ]),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [CatalogController],
    providers: [CatalogService],
    exports: [CatalogService],
})
export class CatalogModule {}
