import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateCatalogDto {
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    @IsEmail()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    vertical: string;

    @IsNotEmpty()
    @IsEmail()
    isPrimary: boolean;
}
