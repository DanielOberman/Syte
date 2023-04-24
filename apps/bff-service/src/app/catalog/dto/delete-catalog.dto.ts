import { IsNotEmpty } from 'class-validator';

export class DeleteCatalogDto {
    @IsNotEmpty()
    clientId: string;

    @IsNotEmpty()
    catalogIds: string[];
}
