import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { CatalogModel, CatalogSchema } from './models/catalog.model';
import { ClientModel, ClientSchema } from '../client/models/client.model';
import { ClientModule } from '../client/client.module';

@Module({
    imports: [
        ClientModule,
        MongooseModule.forFeature([
            {
                name: CatalogModel.name,
                schema: CatalogSchema,
            },
            {
                name: ClientModel.name,
                schema: ClientSchema,
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
