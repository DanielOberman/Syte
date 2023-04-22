import { UserDto } from '../dto/user.dto';
import { UserModel } from '../models/user.model';

export const toUserDto = (data: UserModel): UserDto => {
    const { id, email } = data;

    const userDto = {
        id,
        email,
    };

    return userDto;
};
