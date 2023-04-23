import { CreateCatalogDto } from '../dto/create-catalog-dto';
import { CatalogModel } from '../models/catalog.model';

export const toCatalogDto = (data: CatalogModel): CreateCatalogDto => {
    const { id, userId, name, vertical, isPrimary } = data;

    const catalogDto = {
        id,
        userId,
        name,
        vertical,
        isPrimary,
    };

    return catalogDto;
};
