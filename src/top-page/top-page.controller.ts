import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { FindProductDto } from '../product/dto/find-product.dto';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
	constructor() {}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Post('create')
	async create(@Body() dto: Omit<TopPageModel, '_id'>) {}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindProductDto) {}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: FindTopPageDto) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}
}
