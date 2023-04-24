import { IsNotEmpty } from 'class-validator';

export class CatalogDto {
    id: string;

    @IsNotEmpty()
    clientId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    vertical: string;

    @IsNotEmpty()
    isPrimary: boolean;
}

export class DeleteCatalogDto {
    @IsNotEmpty()
    clientId: string;

    @IsNotEmpty()
    catalogIds: string[];
}