import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

import { Response } from 'express';
import { isNil } from 'lodash';

import { BadRequestParameterResponse } from '../../shared/dto/BadRequestParameterResponse';
import { ServerErrorResponse } from '../../shared/dto/ServerErrorResponse';
import { FindUserUseCase } from '../../user/application/FindUserUseCase/FindUserUseCase';
import { CreateCategoryUseCase } from '../application/CreateCategoryUseCase/CreateCategoryUseCase';
import { CreateCategoryUseCaseRequest, CreateCategoryUseCaseResponse } from '../application/CreateCategoryUseCase/dto/CreateCategoryUseCase.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UpdateCategoryUseCase } from '../application/UpdateCategoryUseCase/UpdateCategoryUseCase';
import { UpdateCategoryUseCaseRequest, UpdateCategoryUseCaseResponse } from '../application/UpdateCategoryUseCase/dto/UpdateCategoryUseCase.dto';
import { FindCategoryUseCase } from '../application/FindCategoryUseCase/FindCategoryUseCase';
import { FindCategoryUseCaseRequest, FindCategoryUseCaseResponse } from '../application/FindCategoryUseCase/dto/FindCategoryUseCase.dto';

@ApiBadRequestResponse({
	description: 'bad request parameter',
	type: BadRequestParameterResponse,
})
@ApiInternalServerErrorResponse({ description: 'server error', type: ServerErrorResponse })
@ApiTags('CATEGORY')
@Controller('category')
export class CategoryController {
	constructor(
		private createCategoryUseCase: CreateCategoryUseCase,
		private updateCategoryUseCase: UpdateCategoryUseCase,
		private findCategoryUseCase: FindCategoryUseCase,
		private findUserUseCase: FindUserUseCase,
	) {}

	@ApiCreatedResponse({ description: 'create category', type: CreateCategoryUseCaseResponse })
	@ApiOperation({ summary: 'create category' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('access-token')
	@Post('create')
	async createCategory(@Request() req, @Body() createCategoryUseCaseRequeset: CreateCategoryUseCaseRequest, @Res() res: Response) {
		const responseFoundUser = await this.findUserUseCase.execute(req.user);
		if (!responseFoundUser.ok || responseFoundUser.user['user_name'] !== process.env.ADMIN) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				ok: responseFoundUser.ok,
				statusCode: responseFoundUser.statusCode,
				message: responseFoundUser.message,
			});
		}

		const responseCreateCategory = await this.createCategoryUseCase.execute(createCategoryUseCaseRequeset);
		return res.status(HttpStatus.CREATED).json({
			ok: responseCreateCategory.ok,
			statusCode: responseCreateCategory.statusCode,
			message: responseCreateCategory.message,
			category: responseCreateCategory.category,
		});
	}

	@ApiOperation({ summary: 'update category' })
	@ApiOkResponse({ description: 'update category', type: UpdateCategoryUseCaseResponse })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('access-token')
	@Put(':id/update')
	async updateCategory(
		@Request() req,
		@Param('id', ParseIntPipe) id: number,
		@Body() updateCategoryUseCaseRequest: UpdateCategoryUseCaseRequest,
		@Res() res: Response,
	) {
		const responseFoundUser = await this.findUserUseCase.execute(req.user);
		if (!responseFoundUser.ok || responseFoundUser.user['user_name'] !== process.env.ADMIN) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				ok: responseFoundUser.ok,
				statusCode: responseFoundUser.statusCode,
				message: responseFoundUser.message,
			});
		}

		const responseUpdateCategory = await this.updateCategoryUseCase.execute(updateCategoryUseCaseRequest);
		return res.status(HttpStatus.OK).json({
			ok: responseUpdateCategory.ok,
			statusCode: responseUpdateCategory.statusCode,
			message: responseUpdateCategory.message,
			category: responseUpdateCategory.category,
		});
	}

	@ApiOperation({ summary: 'get category' })
	@ApiOkResponse({ description: 'get category', type: FindCategoryUseCaseResponse })
	@Get(':id')
	async findCategory(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
		let request;
		request.category_idx = id;
		const responseFoundCategory = await this.findCategoryUseCase.execute(request);
		return res.status(HttpStatus.OK).json({
			ok: responseFoundCategory.ok,
			statusCode: responseFoundCategory.statusCode,
			message: responseFoundCategory.message,
			category: responseFoundCategory.category,
		});
	}
}
