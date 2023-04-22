import { IsNotEmpty } from 'class-validator';

export class UserLoginDto {
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}
