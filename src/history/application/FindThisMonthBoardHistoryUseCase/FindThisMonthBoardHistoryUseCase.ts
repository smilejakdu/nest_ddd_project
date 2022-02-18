import { Inject, Injectable } from '@nestjs/common';

// Repository
import { BOARD_HISTORY_REPOSITORY, IBoardHistoryRepository } from 'src/history/infra/IBoardHistoryRepository';

@Injectable()
export class FindThisMonthBoardHistoryUseCase {
	constructor(
		@Inject(BOARD_HISTORY_REPOSITORY)
		private readonly boardHistoryRepository: IBoardHistoryRepository,
	) {}

	async execute(): Promise<number> {
		return await this.boardHistoryRepository.findThisMonthBoardCount();
	}
}
