import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';

import { CatalogService } from './catalog.service';
import { ClientDto } from '../client/dto/client.dto';

import { CatalogDto } from './dto/catalog.dto';
import { DeleteCatalogDto } from './dto/delete-catalog.dto';
import { CreateCatalogDto } from './dto/create-catalog.dto';

@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    @Post('create')
    async createCatalog(@Body() createCatalogDto: CreateCatalogDto): Promise<ClientDto> {
        const client = await this.catalogService.createCatalog(createCatalogDto);

        return client;
    }

    @Delete('delete')
    async deleteCatalog(@Body() deleteCatalogDto: DeleteCatalogDto): Promise<ClientDto> {
        const client = await this.catalogService.deleteCatalogs(deleteCatalogDto);

        return client;
    }

    @Patch('udpate')
    async editCatalog(@Body() editCatalogDto: CatalogDto): Promise<ClientDto> {
        const client = await this.catalogService.updateCatalog(editCatalogDto);

        return client;
    }
}
