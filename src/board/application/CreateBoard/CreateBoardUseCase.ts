import { User } from './../../../user/domain/User';
import { Inject } from '@nestjs/common';
import { IUseCase } from 'src/shared/core/IUseCase';
import { CreateBoardRequest, CreateBoardResponse } from './dto/CreateBoard.dto';
import { IUserRepository } from 'src/user/infra/interface/IUserRepository';
import { BoardTitle } from 'src/board/domain/BoardTitle';
import { BoardContent } from 'src/board/domain/BoardContent';
import { log } from 'console';

export class CreateBoardUseCase
	implements IUseCase<CreateBoardRequest, CreateBoardResponse>
{
	constructor(
		@Inject('BOARD_REPOSITORY')
		private readonly boardRepository: IUserRepository,
	) {}

	async execute(
		request: CreateBoardRequest,
		token?: string,
	): Promise<CreateBoardResponse> {
		const requestTitle = request.title;
		const requestContent = request.content;

		const userNicknameOrError = BoardTitle.create(request.title);
		const userPasswordOrError = BoardContent.create(request.content);
		log('createBoardUserCase request : ', request);
		log('createBoardUserCase token : ', token);
		return;
	}
}
