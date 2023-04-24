import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CatalogDto, DeleteCatalogDto } from './dto/create-catalog-dto';
import { CatalogModel } from './models/catalog.model';
import { ClientModel } from '../client/models/client.model';
import { toClientDto } from '../client/mappers';
import { ClientDto } from '../client/dto/client.dto';

@Injectable()
export class CatalogService {
    constructor(
        @InjectModel(CatalogModel.name)
        private catalogModel: Model<CatalogModel>,
        @InjectModel(ClientModel.name)
        private readonly clientModel: Model<ClientModel>,
    ) {}

    async createCatalog(createCatalogDto: CatalogDto): Promise<ClientDto> {
        const { clientId, name, vertical, isPrimary } = createCatalogDto;
        const client = await this.clientModel.findOne({ _id: clientId }).exec();

        const catalog: CatalogModel = new this.catalogModel({
            name,
            vertical,
            isPrimary,
        });

        client.catalogs.push(catalog);

        await client.save();

        return toClientDto(client);
    }

    async deleteCatalogs(createCatalogDto: DeleteCatalogDto): Promise<ClientDto> {
        const { clientId, catalogIds } = createCatalogDto;
        const client = await this.clientModel.findOne({ _id: clientId }).exec();

        client.catalogs = client.catalogs.filter((catalog) => {
            return catalog.isPrimary || !catalogIds.includes(catalog._id.toString());
        });

        await client.save();

        return toClientDto(client);
    }

    async editCatalog(editCatalogDto: CatalogDto): Promise<ClientDto> {
        const { clientId, id, name, vertical, isPrimary } = editCatalogDto;
        const client = await this.clientModel.findOne({ _id: clientId }).exec();

        const catalog = client.catalogs.find((catalog) => catalog._id.toString() === id);

        if (!catalog) {
            throw new NotFoundException(`Catalog with ID ${id} not found`);
        }

        catalog.name = name;
        catalog.vertical = vertical;
        catalog.isPrimary = isPrimary;

        await client.save();

        return toClientDto(client);
    }
}
