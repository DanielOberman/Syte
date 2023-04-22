import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/user.create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { toUserDto } from './mappers';
import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel.name)
        private readonly userModel: Model<UserModel>,
    ) {}

    async login({ email, password }: UserLoginDto): Promise<UserDto> {
        const user = await this.userModel.findOne({ email }).exec();

        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        const isEqual = await compare(password, user.password);

        if (!isEqual) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

        return toUserDto(user);
    }

    async register(userDto: CreateUserDto): Promise<UserDto> {
        const { email, password } = userDto;

        const isUserExist = await this.userModel.findOne({ email }).exec();

        if (isUserExist) throw new HttpException('User already exists', HttpStatus.UNAUTHORIZED);

        const salt = await genSalt(10);
        const hashPassword = await hash(password, salt);

        const user: UserModel = new this.userModel({
            email,
            password: hashPassword,
        });

        await user.save();

        return toUserDto(user);
    }

    async findOne(_id: string): Promise<UserDto> {
        const user = await this.userModel.findOne({ _id }).exec();
        if (!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

        return toUserDto(user);
    }
}
