import { JwtAuthrization } from './../../../shared/domain/JwtEntityId';
import { Inject } from '@nestjs/common';
import { IUseCase } from 'src/shared/core/IUseCase';
import { CreateBoardRequest, CreateBoardResponse } from './dto/CreateBoard.dto';
import { IBoardRepository } from 'src/board/infra/IBoardRepository';
import { BoardTitle } from 'src/board/domain/BoardTitle';
import { BoardContent } from 'src/board/domain/BoardContent';
import { Board } from 'src/board/domain/Board';

export class CreateBoardUseCase implements IUseCase<CreateBoardRequest, CreateBoardResponse> {
	private FAIL_CREATE = 'Can`t create board.';

	constructor(
		@Inject('BOARD_REPOSITORY')
		private readonly boardRepository: IBoardRepository,
	) {}

	async execute(request: CreateBoardRequest, userId: string): Promise<CreateBoardResponse> {
		try {
			const requestTitle = request.title;
			const requestContent = request.content;

			const boardTitleOrError = BoardTitle.create(requestTitle);
			const boardContentOrError = BoardContent.create(requestContent);
			const jwtAuthrizationOrError = JwtAuthrization.create(userId);

			const board = Board.createNew({
				boardTitle: boardTitleOrError.value,
				boardContent: boardContentOrError.value,
				userId: jwtAuthrizationOrError.value,
			}).value;

			await this.boardRepository.save(board);

			return {
				ok: true,
				board: {
					id: board.id.toValue(),
					title: board.title.props.value,
					content: board.content.props.value,
				},
			};
		} catch (error) {
			return {
				ok: false,
				error: this.FAIL_CREATE,
			};
		}
	}
}
