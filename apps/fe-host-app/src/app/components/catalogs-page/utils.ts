import { ICatalog } from '@myworkspace/common';

export const canDeleteCatalog = (catalog: ICatalog[] | undefined, ids: string[]) => catalog?.length !== ids.length;
