import { ICatalog } from '@myworkspace/common';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class ClientDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    catalogs: ICatalog[];
}
