import { IUseCase } from '../../../shared/core/IUseCase';
import { Inject } from '@nestjs/common';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { IBoardRepository } from 'src/board/infra/IBoardRepository';
import { UpdateBoardRequest, UpdateBoardResponse } from './dto/UpdateBoard.dto';
import { BoardTitle } from 'src/board/domain/BoardTitle';
import { BoardContent } from 'src/board/domain/BoardContent';
import { Board } from 'src/board/domain/Board';
import { JwtAuthrization } from 'src/shared/domain/JwtEntityId';

export class UpdateBoardUseCase implements IUseCase<UpdateBoardRequest, UpdateBoardResponse> {
	private FAIL_UPDATE = 'Can`t modify board.';
	private HAS_NOT_BOARD = 'Can`t found board.';

	constructor(
		@Inject('BOARD_REPOSITORY')
		private boardRepository: IBoardRepository,
	) {}

	async execute(request: UpdateBoardRequest, userId: string): Promise<UpdateBoardResponse> {
		const requestTitle = request.title;
		const requestContent = request.content;

		const foundBoard = await this.boardRepository.findByBoardId(request.id);
		if (!foundBoard) {
			return {
				ok: false,
				error: this.HAS_NOT_BOARD,
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
				new UniqueEntityId(request.id),
			).value;

			await this.boardRepository.save(board);

			return {
				ok: true,
			};
		} catch (error) {
			return {
				ok: false,
				error: this.FAIL_UPDATE,
			};
		}
	}
}
