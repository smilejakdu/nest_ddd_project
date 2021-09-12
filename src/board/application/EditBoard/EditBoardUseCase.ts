import { IUseCase } from '../../../shared/core/IUseCase';
import { Inject } from '@nestjs/common';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { IBoardRepository } from 'src/board/infra/interface/IBoardRepository';
import {
	EditBoardRequestDto,
	EditBoardResponse,
} from './dto/EditUserProfile.dto';
import { IUserRepository } from 'src/user/infra/interface/IUserRepository';
import { BoardTitle } from 'src/board/domain/BoardTitle';
import { BoardContent } from 'src/board/domain/BoardContent';
import { Board } from 'src/board/domain/Board';
import { JwtAuthrization } from 'src/shared/domain/JwtEntityId';

export class EditBoardUseCase
	implements IUseCase<EditBoardRequestDto, EditBoardResponse>
{
	private FAIL_UPDATE = 'Can`t modify board.';
	private HAS_NOT_BOARD = 'Can`t found board.';

	constructor(
		@Inject('UBOARD_REPOSITORY')
		private boardRepository: IBoardRepository,
		@Inject('USER_REPOSITORY')
		private userRepository: IUserRepository,
	) {}

	async execute(
		request: EditBoardRequestDto,
		userId: string,
	): Promise<EditBoardResponse> {
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
					createdAt: 
				}).value,
				new UniqueEntityId(request.id),
			).value;

			await this.boardRepository.save(user);

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
