import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ClientModel } from '../client/models/client.model';
import { toClientDto } from '../client/mappers';
import { ClientDto } from '../client/dto/client.dto';

import { CatalogDto } from './dto/catalog.dto';
import { DeleteCatalogDto } from './dto/delete-catalog.dto';
import { CatalogModel } from './models/catalog.model';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { MESSAGE } from '@myworkspace/common';

@Injectable()
export class CatalogService {
    constructor(
        @InjectModel(CatalogModel.name)
        private catalogModel: Model<CatalogModel>,
        @InjectModel(ClientModel.name)
        private readonly clientModel: Model<ClientModel>,
    ) {}

    async createCatalog(createCatalogDto: CreateCatalogDto): Promise<ClientDto> {
        const { clientId, name, vertical, isPrimary } = createCatalogDto;

        const client = await this.clientModel.findById(clientId).exec();

        const nameExist = client?.catalogs.find((i) => i.name === name);

        if (nameExist) throw new HttpException(MESSAGE.CATALOG.EXIST, HttpStatus.FORBIDDEN);

        if (isPrimary) {
            const existPrimaryCatalog = client.catalogs.find(
                (catalog) => catalog.vertical === vertical && catalog.isPrimary,
            );

            if (existPrimaryCatalog) {
                existPrimaryCatalog.isPrimary = false;
                await existPrimaryCatalog.save();
            }
        }

        const catalog = new this.catalogModel({
            name,
            vertical,
            isPrimary: client?.catalogs.length ? isPrimary : true,
        });

        client.catalogs.push(catalog);
        await client.save();

        return toClientDto(client);
    }

    async updateCatalog(editCatalogDto: CatalogDto): Promise<ClientDto> {
        const { clientId, id, name, vertical, isPrimary } = editCatalogDto;
        const client = await this.clientModel.findOne({ _id: clientId }).exec();

        const catalog = client.catalogs.find((catalog) => catalog._id.toString() === id);

        if (!catalog) {
            throw new NotFoundException(`Catalog with ID ${id} not found`);
        }

        if (isPrimary) {
            const existPrimaryCatalog = client.catalogs.find(
                (catalog) => catalog.vertical === vertical && catalog.isPrimary,
            );

            if (existPrimaryCatalog) {
                existPrimaryCatalog.isPrimary = false;
                await existPrimaryCatalog.save();
            }
        }

        catalog.name = name;
        catalog.vertical = vertical;
        catalog.isPrimary = client?.catalogs.length <= 1 ? true : isPrimary;

        await client.save();

        return toClientDto(client);
    }

    async deleteCatalogs(createCatalogDto: DeleteCatalogDto): Promise<ClientDto> {
        const { clientId, catalogIds } = createCatalogDto;
        const client = await this.clientModel.findOne({ _id: clientId }).exec();

        if (catalogIds.length === client.catalogs.length) {
            throw new HttpException(MESSAGE.CATALOG.DELETE_ERROR, HttpStatus.FORBIDDEN);
        }

        client.catalogs = client.catalogs.filter((catalog) => {
            return catalog.isPrimary || !catalogIds.includes(catalog.id.toString());
        });

        await client.save();

        return toClientDto(client);
    }
}
