import { Inject } from '@nestjs/common';

import { isNil } from 'lodash';
import { IUseCase } from 'src/shared/core/IUseCase';
import { IBoardRepository } from 'src/board/infra/IBoardRepository';

import { DeleteBoardRequest, DeleteBoardResponse } from './dto/DeleteBoardUseCase.dto';

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
				statusCode: 400,
				message: 'does_not_board',
			};
		}

		await this.boardRepository.deleteBoard(boardId);

		return {
			ok: true,
			message: 'SUCCESS',
			statusCode: 200,
		};
	}
}
