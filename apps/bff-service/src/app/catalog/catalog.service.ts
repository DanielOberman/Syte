import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCatalogDto } from './dto/create-catalog-dto';
import { toCatalogDto } from './mappers';
import { CatalogModel } from './models/catalog.model';

@Injectable()
export class CatalogService {
    constructor(
        @InjectModel(CatalogModel.name)
        private readonly catalogModel: Model<CatalogModel>,
    ) {}

    async create(createCatalogDto: CreateCatalogDto): Promise<CreateCatalogDto> {
        const { userId, name, vertical, isPrimary } = createCatalogDto;

        const catalog: CatalogModel = new this.catalogModel({
            userId,
            name,
            vertical,
            isPrimary,
        });

        const test = await catalog.save();

        return toCatalogDto(test);
    }
}
