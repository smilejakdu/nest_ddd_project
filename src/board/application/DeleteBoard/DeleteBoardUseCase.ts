import { Inject } from '@nestjs/common';

import { IUseCase } from 'src/shared/core/IUseCase';
import { IBoardRepository } from 'src/board/infra/interface/IBoardRepository';
import { DeleteBoardRequest, DeleteBoardResponse } from './dto/DeleteBoard.dto';
import { ReturningStatementNotSupportedError } from 'typeorm';

export class DeleteBoardUseCase implements IUseCase<DeleteBoardRequest, DeleteBoardResponse> {
	constructor(
		@Inject('BOARD_REPOSITORY')
		private readonly boardRepository: IBoardRepository,
	) {}

	async execute(request: DeleteBoardRequest, userId?: string): Promise<DeleteBoardResponse> {
		return;
	}
}
