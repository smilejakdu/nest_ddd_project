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
				status_code: 400,
				error: this.FAIL_FIND,
			};
		}

		return {
			ok: true,
			status_code: 200,
			boards: foundBoards,
		};
	}
}
