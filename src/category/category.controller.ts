import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BadRequestParameterResponse } from '../shared/dto/BadRequestParameterResponse';
import { ServerErrorResponse } from '../shared/dto/ServerErrorResponse';

@ApiBadRequestResponse({
	description: 'bad request parameter',
	type: BadRequestParameterResponse,
})
@ApiInternalServerErrorResponse({ description: 'server error', type: ServerErrorResponse })
@ApiTags('CATEGORY')
@Controller('category')
export class CategoryController {
	constructor() {}

	@ApiCreatedResponse({ description: 'create category' })
	@ApiOperation({ summary: 'create category' })
	@Post('')
	async createCategory(@Body() categoryName: string): Promise<void> {
		try {
		} catch (error) {
			console.log(error);
		}
		return;
	}
}
