import { Inject, Injectable } from '@nestjs/common';

// Repository
import { BOARD_HISTORY_REPOSITORY, IBoardHistoryRepository } from 'src/history/infra/IBoardHistoryRepository';

export interface BoardHistory {
	bh_index: number;
	bh_count: number;
	bh_datetime: string;
}

@Injectable()
export class CreateThisMonthBoardHistoryUseCase {
	constructor(
		@Inject(BOARD_HISTORY_REPOSITORY)
		private readonly boardHistoryRepository: IBoardHistoryRepository,
	) {}

	async execute(): Promise<boolean> {
		return this.boardHistoryRepository.save();
	}
}
