import { Inject } from '@nestjs/common';
import { IUseCase } from 'src/shared/core/IUseCase';
import { CreateBoardRequest, CreateBoardResponse } from './dto/CreateBoard.dto';
import { IUserRepository } from 'src/user/infra/interface/IUserRepository';

export class CreateBoardUseCase
	implements IUseCase<CreateBoardRequest, CreateBoardResponse>
{
	private DOES_NOT_USER = 'have not user id.';
	constructor(
		@Inject('USER_REPOSITORY')
		private readonly boardRepository: IUserRepository,
	) {}
	execute(
		request?: CreateBoardRequest,
	): CreateBoardResponse | Promise<CreateBoardResponse> {
		throw new Error('Method not implemented.');
	}
}
