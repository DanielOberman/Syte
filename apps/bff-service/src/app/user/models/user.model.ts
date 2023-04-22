import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { IUser } from '../interfaces/user.interface';

@Schema({ collection: 'users', timestamps: true })
export class UserModel extends Document implements IUser {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
