import { Inject } from '@nestjs/common';

import { isNil } from 'lodash';
import { IBoardRepository } from 'src/board/infra/IBoardRepository';

// Domain
import { BoardTitle } from 'src/board/domain/BoardTitle';
import { BoardContent } from 'src/board/domain/BoardContent';
import { Board } from 'src/board/domain/Board';
import { JwtAuthrization } from 'src/shared/domain/JwtEntityId';

import { UpdateBoardRequest, UpdateBoardResponse } from './dto/UpdateBoardUseCase.dto';
import { IUseCase } from '../../../shared/core/IUseCase';

export class UpdateBoardUseCase implements IUseCase<UpdateBoardRequest, UpdateBoardResponse> {
	private FAIL_UPDATE = 'Can`t modify board.';
	private HAS_NOT_BOARD = 'Can`t found board.';

	constructor(
		@Inject('BOARD_REPOSITORY')
		private boardRepository: IBoardRepository,
	) {}

	async execute(request: UpdateBoardRequest, userId: number): Promise<UpdateBoardResponse> {
		const requestTitle = request.title;
		const requestContent = request.content;

		const foundBoard: Board = await this.boardRepository.findByBoardId(request.board_idx);
		if (isNil(foundBoard)) {
			return {
				ok: false,
				statusCode: 400,
				message: this.HAS_NOT_BOARD,
			};
		}

		try {
			const boardTitleOrError = BoardTitle.create(requestTitle);
			const boardContentOrError = BoardContent.create(requestContent);
			const jwtAuthrizationOrError = JwtAuthrization.create(userId);

			const board = Board.create(
				{
					boardTitle: boardTitleOrError.value,
					boardContent: boardContentOrError.value,
					userId: jwtAuthrizationOrError.value,
					createdAt: foundBoard.createdAt,
				},
				request.board_idx,
			).value;

			await this.boardRepository.save(board);
			return {
				ok: true,
				statusCode: 201,
				message: 'SUCCESS',
				board: {
					board_idx: board.props.userId.value,
					title: board.title.props.value,
					content: board.content.props.value,
				},
			};
		} catch (error) {
			return {
				ok: false,
				statusCode: 400,
				message: this.FAIL_UPDATE,
			};
		}
	}
}
