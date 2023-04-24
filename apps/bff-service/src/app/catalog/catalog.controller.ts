import { Body, Controller, Delete, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CatalogService } from './catalog.service';
import { AuthGuard } from '../guards/authGuard';
import { ClientDto } from '../client/dto/client.dto';

import { CatalogDto } from './dto/catalog.dto';
import { DeleteCatalogDto } from './dto/delete-catalog.dto';
import { CreateCatalogDto } from './dto/create-catalog.dto';

@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService, private jwtService: JwtService) {}

    @Post('create')
    @UseGuards(AuthGuard)
    async createCatalog(@Body() createCatalogDto: CreateCatalogDto): Promise<ClientDto> {
        const client = await this.catalogService.createCatalog(createCatalogDto);

        return client;
    }

    @Delete('delete')
    @UseGuards(AuthGuard)
    async deleteCatalog(@Body() deleteCatalogDto: DeleteCatalogDto): Promise<ClientDto> {
        const client = await this.catalogService.deleteCatalogs(deleteCatalogDto);

        return client;
    }

    @Patch('udpate')
    @UseGuards(AuthGuard)
    async editCatalog(@Body() editCatalogDto: CatalogDto): Promise<ClientDto> {
        const client = await this.catalogService.udpateCatalog(editCatalogDto);

        return client;
    }
}
