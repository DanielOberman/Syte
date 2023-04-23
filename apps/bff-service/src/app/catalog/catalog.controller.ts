import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CatalogService } from './catalog.service';
import { AuthGuard } from '../guards/authGuard';
import { EVertical } from '@myworkspace/common';

@Controller('catalog')
export class CatalogController {
    constructor(private readonly CatalogService: CatalogService, private jwtService: JwtService) {}

    @Post('create')
    @UseGuards(AuthGuard)
    async register(
        @Body('userId') userId: string,
        @Body('name') name: string,
        @Body('vertical') vertical: EVertical,
        @Body('isPrimary') isPrimary: boolean,
    ) {
        return await this.CatalogService.create({ userId, name, vertical, isPrimary });
    }
}
