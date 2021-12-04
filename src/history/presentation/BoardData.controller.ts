import dayjs from 'dayjs';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import {
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
// UseCase
import { FindThisMonthBoardHistoryUseCase } from '../application/FindThisMonthBoardHistoryUseCase/FindThisMonthBoardHistoryUseCase';
import { MonthBoardCountResponseDto } from './dto/MonthBoardCountResponse.dto';
import { AllMonthBoardCountResponse } from './dto/AllMonthBoardCountResponse.dto';
import { FindAllMonthBoardHistoryUseCase } from '../application/FindAllMonthBoardHistoryUseCase/FindAllMonthBoardHistoryUseCase';
import { BoardHistoryEntity } from '../infra/entity/BoardHistoryEntity';

@ApiInternalServerErrorResponse({ description: 'server error' })
@ApiTags('BOARD_HISTORY')
@Controller('board_history')
export class BoardHistoryController {
	constructor(
		private readonly findThisMonthBoardHistoryUseCase: FindThisMonthBoardHistoryUseCase,
		private readonly findAllMonthBoardHistoryUseCase: FindAllMonthBoardHistoryUseCase,
	) {}

	@ApiOkResponse({ description: 'success', type: MonthBoardCountResponseDto })
	@ApiOperation({ summary: 'this month board count' })
	@Get('find_this_month_board_count')
	async findThisMonthBoardCount(@Res() res: Response) {
		const thisMonth: string = dayjs(new Date()).format('YYYY-MM-DD');
		const foundThisMonthBoardCount: number = await this.findThisMonthBoardHistoryUseCase.execute();

		res.status(HttpStatus.OK).json({
			this_month: thisMonth,
			board_count: foundThisMonthBoardCount,
		});
	}

	@ApiOkResponse({ description: 'success', type: AllMonthBoardCountResponse })
	@ApiOperation({ summary: 'find board count all' })
	@Get('find_all')
	async findAll(@Res() res: Response) {
		const foundThisMonthBoardCount: BoardHistoryEntity[] =
			await this.findAllMonthBoardHistoryUseCase.execute();

		res.status(HttpStatus.OK).json({
			board_list: foundThisMonthBoardCount,
		});
	}
}