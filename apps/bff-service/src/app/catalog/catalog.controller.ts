import { Body, Controller, Get, NotFoundException, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CatalogService } from './catalog.service';
import { AuthGuard } from '../guards/authGuard';
import { CatalogDto } from './dto/create-catalog-dto';

@Controller('catalog')
export class CatalogController {
    constructor(private readonly CatalogService: CatalogService, private jwtService: JwtService) {}

    @Post()
    @UseGuards(AuthGuard)
    async createCatalog(@Body() createCatalogDto: CatalogDto): Promise<CatalogDto> {
        const catalog = await this.CatalogService.createCatalog(createCatalogDto);
        return catalog;
    }

    @Patch()
    @UseGuards(AuthGuard)
    async editCatalog(@Body() editCatalogDto: CatalogDto): Promise<CatalogDto[]> {
        const catalog = await this.CatalogService.editCatalog(editCatalogDto);

        if (!catalog) {
            throw new NotFoundException('Catalog not found');
        }

        return catalog;
    }

    @Get('')
    @UseGuards(AuthGuard)
    async getCatalogs(@Body('userId') userId: string) {
        const catalogs = await this.CatalogService.getCatalogsByUserId(userId);
        return catalogs;
    }
}
