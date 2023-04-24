import { ClientDto } from '../dto/client.dto';
import { ClientModel } from '../models/client.model';

export const toClientDto = (data: ClientModel): ClientDto => {
    const { id, email, catalogs } = data;

    const clientDto = {
        id,
        email,
        catalogs,
    };

    return clientDto;
};
