import { Inject, Injectable } from '@nestjs/common';
import { BoardHistoryEntity } from 'src/history/infra/entity/BoardHistoryEntity';
// Repository
import {
	BOARD_HISTORY_REPOSITORY,
	IBoardHistoryRepository,
} from 'src/history/infra/IBoardHistoryRepository';

@Injectable()
export class FindAllMonthBoardHistoryUseCase {
	constructor(
		@Inject(BOARD_HISTORY_REPOSITORY)
		private readonly boardHistoryRepository: IBoardHistoryRepository,
	) {}

	async execute(): Promise<BoardHistoryEntity[]> {
		return await this.boardHistoryRepository.findAll();
	}
}
