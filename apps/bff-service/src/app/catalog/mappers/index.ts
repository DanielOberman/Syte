import { CatalogDto } from '../dto/create-catalog-dto';
import { CatalogModel } from '../models/catalog.model';

export const toCreateCatalogDto = (data: CatalogModel): CatalogDto => {
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

export const toCatalogsDto = (data: CatalogModel[]): CatalogDto[] => {
    return data.map((catalog) => ({
        id: catalog.id,
        userId: catalog.userId,
        name: catalog.name,
        vertical: catalog.vertical,
        isPrimary: catalog.isPrimary,
    }));
};
