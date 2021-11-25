import { isNil } from 'lodash';
import { Inject } from '@nestjs/common';

import { IUseCase } from 'src/shared/core/IUseCase';
import { IBoardRepository } from 'src/board/infra/IBoardRepository';
import { DeleteBoardRequest, DeleteBoardResponse } from './dto/DeleteBoard.dto';

export class DeleteBoardUseCase implements IUseCase<DeleteBoardRequest, DeleteBoardResponse> {
	constructor(
		@Inject('BOARD_REPOSITORY')
		private readonly boardRepository: IBoardRepository,
	) {}

	async execute(boardId): Promise<DeleteBoardResponse> {
		const findBoard = await this.boardRepository.findByBoardId(boardId);

		if (!findBoard) {
			return {
				ok: false,
				error: 'does_not_board',
			};
		}

		await this.boardRepository.deleteBoard(boardId);

		return {
			ok: true,
		};
	}
}
