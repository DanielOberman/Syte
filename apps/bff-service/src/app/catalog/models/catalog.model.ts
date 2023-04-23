import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { ICatalog } from '@myworkspace/common';

@Schema({ collection: 'catalog', timestamps: true })
export class CatalogModel extends Document implements ICatalog {
    id?: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    vertical: string;

    @Prop({ required: true })
    isPrimary: boolean;
}

export const CatalogSchema = SchemaFactory.createForClass(CatalogModel);
