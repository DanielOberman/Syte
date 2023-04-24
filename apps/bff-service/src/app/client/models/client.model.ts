import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { IClient } from '@myworkspace/common';
import { CatalogModel, CatalogSchema } from '../../catalog/models/catalog.model';

@Schema({ collection: 'client', timestamps: true })
export class ClientModel extends Document implements IClient {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [CatalogSchema], default: [] })
    catalogs: CatalogModel[];
}

export const ClientSchema = SchemaFactory.createForClass(ClientModel);
