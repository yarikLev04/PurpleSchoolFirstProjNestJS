import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND_ERROR } from './product.consts';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('product')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productService.findById(id);

		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}

		return product;
	}

	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto);
	}

	@Patch(':id')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: ProductModel
	) {
		const updatedProduct = await this.productService.updateById(id, dto);

		if (!updatedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}

		return updatedProduct;
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProduct = await this.productService.delete(id);

		if (!deletedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
	}
}
