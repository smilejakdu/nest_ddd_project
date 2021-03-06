import { Inject } from '@nestjs/common';

import { isNil } from 'lodash';
import { IBoardRepository } from 'src/board/infra/IBoardRepository';
import { IUseCase } from 'src/shared/core/IUseCase';

import { FindBoardRequest, FindBoardResponse } from './dto/FindBoardUseCase.dto';

export class FindBoardUseCase implements IUseCase<FindBoardRequest, FindBoardResponse> {
	private FAIL_FIND = 'Can`t find board.';

	constructor(
		@Inject('BOARD_REPOSITORY')
		private readonly boardRepository: IBoardRepository,
	) {}

	async execute(): Promise<FindBoardResponse> {
		const foundBoards = await this.boardRepository.findBoard();

		if (isNil(foundBoards)) {
			return {
				ok: false,
				statusCode: 400,
				message: this.FAIL_FIND,
			};
		}

		return {
			ok: true,
			statusCode: 200,
			message: 'SUCCESS',
			boards: foundBoards,
		};
	}
}
