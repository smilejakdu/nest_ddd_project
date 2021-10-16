import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// UseCase
import { CreateBoardUseCase } from './application/CreateBoard/CreateBoardUseCase';
import { DeleteBoardUseCase } from './application/DeleteBoard/DeleteBoardUseCase';
import { UpdateBoardUseCase } from './application/UpdateBoard/UpdateBoardUseCase';
import { FindBoardUseCase } from './application/FindBoard/FindBoardUseCase';
// Entity
import { BoardEntity } from './infra/entity/Board.entity';
// Repository
import { MysqlBoardRepository } from './infra/mysql/MysqlBoardRepository';
import { BOARD_REPOSITORY } from './infra/IBoardRepository';
// Controller
import { BoardsController } from './presentation/board.controller';

@Module({
	imports: [TypeOrmModule.forFeature([BoardEntity])],
	providers: [
		CreateBoardUseCase,
		UpdateBoardUseCase,
		BoardsController,
		FindBoardUseCase,
		DeleteBoardUseCase,
		{
			provide: BOARD_REPOSITORY,
			useClass: MysqlBoardRepository,
		},
	],
	exports: [TypeOrmModule],
	controllers: [BoardsController],
})
export class BoardModule {}
