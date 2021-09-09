import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateBoardUseCase } from './application/CreateBoard/CreateBoardUseCase';
import { BoardEntity } from './infra/entity/Board.entity';
import { MysqlBoardRepository } from './infra/mysql/MysqlBoard.repository';
import { BoardsController } from './presentation/board.controller';

@Module({
	imports: [TypeOrmModule.forFeature([BoardEntity])],
	providers: [
		CreateBoardUseCase,
		BoardsController,
		{
			provide: 'BOARD_REPOSITORY',
			useClass: MysqlBoardRepository,
		},
	],
	exports: [TypeOrmModule],
	controllers: [BoardsController],
})
export class BoardModule {}
