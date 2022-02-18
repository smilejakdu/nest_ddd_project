import { Controller, Get, Post } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import dayjs from 'dayjs';

// UseCase
import { CreateThisMonthBoardHistoryUseCase } from '../application/CreateThisMonthBoardHistoryUseCase/CreateThisMonthBoardHistoryUseCase';
import { FindThisMonthBoardHistoryUseCase } from '../application/FindThisMonthBoardHistoryUseCase/FindThisMonthBoardHistoryUseCase';

@Controller('')
export class HistoryCronController {
	constructor(
		private readonly createThisMonthBoardHistoryUseCase: CreateThisMonthBoardHistoryUseCase,
		private readonly findThisMonthBoardHistoryUseCase: FindThisMonthBoardHistoryUseCase,
	) {}

	/**
	 * Topic: Board History
	 * Description: 매월 1 일 게시판 갯수를 history 테이블에 insert
	 * Rule: 매월 오전1시 00분
	 */
	@Cron('0 0 1 1 * *')
	async saveBoardHistory() {
		await this.createThisMonthBoardHistoryUseCase.execute();
	}
}
