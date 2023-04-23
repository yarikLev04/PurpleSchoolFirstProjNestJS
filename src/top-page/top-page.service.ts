import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
	TopLevelCategories,
	TopPageDocument,
	TopPageModel,
} from './top-page.model';
import { Model, Types } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { addDays } from 'date-fns';

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPageModel.name) private topPageModel: Model<TopPageDocument>
	) {}

	async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec();
	}

	async findByAlias(alias: string) {
		return this.topPageModel.findOne({ alias }).exec();
	}

	async findAll() {
		return this.topPageModel.find({}).exec();
	}

	async findByCategory(firstCategory: TopLevelCategories) {
		return this.topPageModel
			.aggregate()
			.match({ firstCategory })
			.group({
				_id: { secondCategory: '$secondCategory' },
				pages: { $push: { alias: '$alias', title: '$title' } },
			})
			.exec();
	}

	async findByText(text: string) {
		return this.topPageModel
			.find({ $text: { $search: text, $caseSensitive: false } })
			.exec();
	}

	async delete(id: string) {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string | Types.ObjectId, dto: CreateTopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findForHhUpdate(date: Date) {
		return this.topPageModel
			.find({
				firstCategory: TopLevelCategories.Courses,
				$or: [
					{ 'hh.updatedAt': { $lt: addDays(date, -1).toString() } },
					{ 'hh.updatedAt': { $exists: false } },
				],
			})
			.exec();
	}
}
