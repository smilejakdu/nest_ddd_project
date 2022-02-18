import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import dayjs from 'dayjs';

import { IBoardHistoryRepository } from '../IBoardHistoryRepository';

// Entity
import { BoardHistoryEntity } from '../entity/BoardHistoryEntity';
import { BoardEntity } from '../../../board/infra/entity/BoardEntity';

export class MysqlBoardHistoryRepository implements IBoardHistoryRepository {
	constructor(
		@InjectRepository(BoardHistoryEntity)
		private readonly boardHistoryRepository: Repository<BoardHistoryEntity>,
		@InjectRepository(BoardEntity)
		private readonly boardRepository: Repository<BoardEntity>,
	) {}

	async save(): Promise<boolean> {
		const thisMonth = dayjs(new Date()).format('YYYY-MM-DD');
		const foundThisMonthBoardCount = await this.findThisMonthBoardCount();

		await this.boardHistoryRepository
			.createQueryBuilder('boardHistory')
			.insert()
			.into(BoardHistoryEntity)
			.values({
				bhl_count: foundThisMonthBoardCount,
				bhl_datetime: thisMonth,
			})
			.execute();
		return true;
	}

	async findThisMonthBoardCount(): Promise<number> {
		const thisMonth = dayjs(new Date()).format('YYYY-MM');

		const foundThisMonthBoard = await this.boardRepository
			.createQueryBuilder('board')
			.where('board.bhl_datetime like =:bhl_datetime', { createdAt: `%${thisMonth}%` })
			.getCount();

		return foundThisMonthBoard;
	}

	async findAll(): Promise<BoardHistoryEntity[]> {
		const foundBoardHistoryAll = await this.boardHistoryRepository.createQueryBuilder('boardHistory').getMany();

		return foundBoardHistoryAll;
	}
}
