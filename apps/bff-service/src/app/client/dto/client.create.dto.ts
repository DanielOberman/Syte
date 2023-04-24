import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateClientDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
