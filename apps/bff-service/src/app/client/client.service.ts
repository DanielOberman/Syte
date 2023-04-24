import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

import { ClientDto } from './dto/client.dto';
import { CreateClientDto } from './dto/client.create.dto';
import { ClientLoginDto } from './dto/client-login.dto';
import { toClientDto } from './mappers';
import { ClientModel } from './models/client.model';
import { CatalogModel } from '../catalog/models/catalog.model';

@Injectable()
export class ClientService {
    constructor(
        @InjectModel(ClientModel.name)
        private readonly clientModel: Model<ClientModel>,
        @InjectModel(ClientModel.name)
        private readonly catalogModel: Model<CatalogModel>,
    ) {}

    async login({ email, password }: ClientLoginDto): Promise<ClientDto> {
        const client = await this.clientModel.findOne({ email }).exec();

        if (!client) throw new HttpException('Client not found', HttpStatus.NOT_FOUND);

        const isEqual = await compare(password, client.password);

        if (!isEqual) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

        return toClientDto(client);
    }

    async register(clientDto: CreateClientDto): Promise<ClientDto> {
        const { email, password } = clientDto;

        const isClientExist = await this.clientModel.findOne({ email }).exec();

        if (isClientExist) throw new HttpException('Client already exists', HttpStatus.UNAUTHORIZED);

        const salt = await genSalt(10);
        const hashPassword = await hash(password, salt);

        const client: ClientModel = new this.clientModel({
            email,
            password: hashPassword,
        });

        await client.save();

        return toClientDto(client);
    }

    async findOne(id: string): Promise<ClientDto> {
        const client = await this.clientModel.findOne({ _id: id }).exec();
        if (!client) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

        return toClientDto(client);
    }
}
