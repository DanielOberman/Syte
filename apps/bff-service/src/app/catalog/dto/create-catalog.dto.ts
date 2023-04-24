import { IsNotEmpty } from 'class-validator';

export class CreateCatalogDto {
    @IsNotEmpty()
    clientId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    vertical: string;

    @IsNotEmpty()
    isPrimary: boolean;
}
