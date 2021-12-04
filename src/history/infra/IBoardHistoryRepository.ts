import { BoardHistoryEntity } from './entity/BoardHistoryEntity';

export const BOARD_HISTORY_REPOSITORY = Symbol('BOARD_HISTORY_REPOSITORY');

export interface IBoardHistoryRepository {
	save(): Promise<boolean>;
	findThisMonthBoardCount(): Promise<number>;
	findAll(): Promise<BoardHistoryEntity[]>;
}
