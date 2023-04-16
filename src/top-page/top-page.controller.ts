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
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { PAGE_NOT_FOUND_ERROR } from './top-page.consts';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
	constructor(private topPageService: TopPageService) {}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const topPage = await this.topPageService.findById(id);

		if (!topPage) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
		}

		return topPage;
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const topPage = await this.topPageService.findByAlias(alias);

		if (!topPage) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
		}

		return topPage;
	}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: CreateTopPageDto
	) {
		const updatedPage = await this.topPageService.updateById(id, dto);

		if (!updatedPage) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
		}

		return updatedPage;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const topPage = await this.topPageService.delete(id);

		if (!topPage) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
		}
	}
}
