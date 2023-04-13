import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewDocument, ReviewModel } from './review.model';
import { HydratedDocument, Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(ReviewModel.name) private reviewModel: Model<ReviewDocument>
	) {}

	async create(dto: CreateReviewDto): Promise<HydratedDocument<ReviewModel>> {
		return this.reviewModel.create(dto);
	}

	async delete(id: string): Promise<HydratedDocument<ReviewModel> | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(
		productId: string
	): Promise<HydratedDocument<ReviewModel>[]> {
		return this.reviewModel.find({ productId: productId }).exec();
	}

	async deleteByProductId(productId: string) {
		return this.reviewModel
			.deleteMany({
				productId: productId,
			})
			.exec();
	}
}
