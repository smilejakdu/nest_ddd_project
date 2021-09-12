import { JwtAuthrization } from './../../../shared/domain/JwtEntityId';
import { User } from 'src/shared/decorator/user.decorator';
import { Inject } from '@nestjs/common';
import { IUseCase } from 'src/shared/core/IUseCase';
import { CreateBoardRequest, CreateBoardResponse } from './dto/CreateBoard.dto';
import { IBoardRepository } from 'src/board/infra/interface/IBoardRepository';
import { BoardTitle } from 'src/board/domain/BoardTitle';
import { BoardContent } from 'src/board/domain/BoardContent';
import { log } from 'console';
import { Board } from 'src/board/domain/Board';
import { IUserRepository } from 'src/user/infra/interface/IUserRepository';

export class CreateBoardUseCase implements IUseCase<CreateBoardRequest, CreateBoardResponse> {
	constructor(
		@Inject('BOARD_REPOSITORY')
		private readonly boardRepository: IBoardRepository,
	) {}

	async execute(request: CreateBoardRequest, userId: string): Promise<CreateBoardResponse> {
		log('userId : ', userId);
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
		};
	}
}
