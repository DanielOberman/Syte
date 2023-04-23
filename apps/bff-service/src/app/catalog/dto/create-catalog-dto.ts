import { IsNotEmpty } from 'class-validator';

export class CatalogDto {
    id?: string;

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    vertical: string;

    @IsNotEmpty()
    isPrimary: boolean;
}
