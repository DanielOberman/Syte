import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { ClientModel, ClientSchema } from './models/client.model';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
    imports: [
        MongooseModule.forFeature([
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
    controllers: [ClientController],
    providers: [ClientService],
    exports: [ClientService],
})
export class ClientModule {}
