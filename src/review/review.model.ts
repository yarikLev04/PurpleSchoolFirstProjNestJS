import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductModel } from '../product/product.model';

@Schema({ timestamps: true })
export class ReviewModel {
	@Prop()
	name: string;

	@Prop()
	title: string;

	@Prop()
	description: string;

	@Prop()
	rating: number;

	@Prop({ type: Types.ObjectId, ref: ProductModel.name })
	productId: Types.ObjectId;
}

export type ReviewDocument = HydratedDocument<ReviewModel>;

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
