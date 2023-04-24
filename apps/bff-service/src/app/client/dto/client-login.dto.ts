import { IsNotEmpty } from 'class-validator';

export class ClientLoginDto {
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}
