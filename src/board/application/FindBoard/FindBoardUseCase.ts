import { Inject } from '@nestjs/common';
import { log } from 'console';
import { isEmpty } from 'lodash';
import { IBoardRepository } from 'src/board/infra/interface/IBoardRepository';
import { IUseCase } from 'src/shared/core/IUseCase';
import { IUserRepository } from 'src/user/infra/interface/IUserRepository';
import { FindBoardRequest, FindBoardResponse } from './dto/FindBoard.dto';

export class FindBoardUseCase
	implements IUseCase<FindBoardRequest, FindBoardResponse>
{
	private FAIL_FIND = 'Can`t find board.';

	constructor(
		@Inject('FIND_REPOSITORY')
		private readonly boardRepository: IBoardRepository,
	) {}
	async execute(): Promise<FindBoardResponse> {
		log('222222');
		const foundBoards = await this.boardRepository.findBoard();
		log('333333');
		if (isEmpty(foundBoards)) {
			return {
				ok: false,
				error: this.FAIL_FIND,
			};
		}

		return {
			ok: true,
			boards: foundBoards,
		};
	}
}
