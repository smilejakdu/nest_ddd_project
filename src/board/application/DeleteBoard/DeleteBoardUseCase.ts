import { Inject } from '@nestjs/common';

import { IUseCase } from 'src/shared/core/IUseCase';
import { IBoardRepository } from 'src/board/infra/interface/IBoardRepository';
import { DeleteBoardRequest, DeleteBoardResponse } from './dto/DeleteBoard.dto';
import { ReturningStatementNotSupportedError } from 'typeorm';
import { log } from 'console';

export class DeleteBoardUseCase implements IUseCase<DeleteBoardRequest, DeleteBoardResponse> {
	constructor(
		@Inject('BOARD_REPOSITORY')
		private readonly boardRepository: IBoardRepository,
	) {}

	async execute(boardId: DeleteBoardRequest, userId: any): Promise<DeleteBoardResponse> {
		log(boardId);
		const findBoard = await this.boardRepository.findByBoardId(boardId.id);
		if (!findBoard) {
			return {
				ok: false,
				error: 'does_not_board',
			};
		}
		return;
	}
}
