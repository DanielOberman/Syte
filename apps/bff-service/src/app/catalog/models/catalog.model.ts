import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { ICatalog } from '@myworkspace/common';

@Schema({
    collection: 'catalog',
    timestamps: true,
    toJSON: {
        transform: (_, ret) => {
            ret.id = ret._id;
            delete ret._id;
        },
    },
})
export class CatalogModel extends Document implements ICatalog {
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    vertical: string;

    @Prop({ required: true })
    isPrimary: boolean;
}

export const CatalogSchema = SchemaFactory.createForClass(CatalogModel);
