import { isNil } from 'lodash';
import { Inject } from '@nestjs/common';

import { IBoardRepository } from 'src/board/infra/IBoardRepository';
import { IUseCase } from 'src/shared/core/IUseCase';
import { FindMyBoardRequest, FindMyBoardResponse } from './dto/FindMyBoardUseCase.dto';

export class FindMyBoardUseCase implements IUseCase<FindMyBoardRequest, FindMyBoardResponse> {
	private FAIL_FIND = 'Can`t find user board.';

	constructor(
		@Inject('BOARD_REPOSITORY')
		private readonly boardRepository: IBoardRepository,
	) {}

	async execute(userId): Promise<FindMyBoardResponse> {
		const foundBoards = await this.boardRepository.myBoard(userId);

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
