import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategories {
	Courses,
	Services,
	Books,
	Products,
}

export class HhData {
	@Prop()
	count: number;

	@Prop()
	juniorSalary: number;

	@Prop()
	middleSalary: number;

	@Prop()
	seniorSalary: number;
}

export class TopPageAdvantage {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

@Schema({ timestamps: true })
export class TopPageModel {
	@Prop({ enum: TopLevelCategories })
	firstCategory: TopLevelCategories;

	@Prop()
	secondCategory: string;

	@Prop({ unique: true })
	alias: string;

	@Prop({ index: true })
	title: string;

	@Prop()
	category: string;

	@Prop({ type: () => HhData })
	hh?: HhData;

	@Prop({ type: () => [TopPageAdvantage] })
	advantages: TopPageAdvantage[];

	@Prop({ index: true })
	seoText: string;

	@Prop()
	tagsTitle: string;

	@Prop({ type: () => [String] })
	tags: string[];

	@Prop()
	createdAt?: Date;

	@Prop()
	updatedAt?: Date;
}

export type TopPageDocument = HydratedDocument<TopPageModel>;

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
