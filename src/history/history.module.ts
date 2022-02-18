import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// UseCase
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';

import { CreateThisMonthBoardHistoryUseCase } from './application/CreateThisMonthBoardHistoryUseCase/CreateThisMonthBoardHistoryUseCase';
import { FindAllMonthBoardHistoryUseCase } from './application/FindAllMonthBoardHistoryUseCase/FindAllMonthBoardHistoryUseCase';
import { FindThisMonthBoardHistoryUseCase } from './application/FindThisMonthBoardHistoryUseCase/FindThisMonthBoardHistoryUseCase';
// Entity
import { BoardHistoryEntity } from '../history/infra/entity/BoardHistoryEntity';
// Repository
import { MysqlBoardHistoryRepository } from './infra/mysql/MysqlBoardHistoryRepository';
import { BOARD_HISTORY_REPOSITORY } from '../history/infra/IBoardHistoryRepository';
// Controller
import { HistoryCronController } from './presentation/History.controller';
import { BoardHistoryController } from './presentation/BoardData.controller';

@Module({
	imports: [TypeOrmModule.forFeature([BoardHistoryEntity, BoardEntity])],
	providers: [
		CreateThisMonthBoardHistoryUseCase,
		FindAllMonthBoardHistoryUseCase,
		FindThisMonthBoardHistoryUseCase,
		BoardHistoryController,
		HistoryCronController,
		{
			provide: BOARD_HISTORY_REPOSITORY,
			useClass: MysqlBoardHistoryRepository,
		},
	],
	exports: [TypeOrmModule],
	controllers: [BoardHistoryController, HistoryCronController],
})
export class HistoryModule {}
