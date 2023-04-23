import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CatalogDto } from './dto/create-catalog-dto';
import { toCreateCatalogDto, toCatalogsDto } from './mappers';
import { CatalogModel } from './models/catalog.model';

@Injectable()
export class CatalogService {
    constructor(
        @InjectModel(CatalogModel.name)
        private readonly catalogModel: Model<CatalogModel>,
    ) {}

    async createCatalog(createCatalogDto: CatalogDto): Promise<CatalogDto> {
        const { userId, name, vertical, isPrimary } = createCatalogDto;

        const catalog: CatalogModel = new this.catalogModel({
            userId,
            name,
            vertical,
            isPrimary,
        });

        await catalog.save();

        return toCreateCatalogDto(catalog);
    }

    async editCatalog(createCatalogDto: CatalogDto): Promise<CatalogDto[]> {
        const { id, userId } = createCatalogDto;

        const updatedCatalog = await this.catalogModel.findOneAndUpdate({ id }, createCatalogDto);

        await updatedCatalog.save();

        if (updatedCatalog) {
            const catalogs = await this.catalogModel.find({ userId }).exec();

            return toCatalogsDto(catalogs);
        }
    }

    async getCatalogsByUserId(userId: string): Promise<CatalogDto[]> {
        const catalogs = await this.catalogModel.find({ userId }).exec();

        return toCatalogsDto(catalogs);
    }
}
