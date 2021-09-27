import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlUserRepository } from 'src/user/infra/mysql/MysqlUserRepository';
import { CreateBoardUseCase } from './application/CreateBoard/CreateBoardUseCase';
import { EditBoardUseCase } from './application/EditBoard/EditBoardUseCase';
import { FindBoardUseCase } from './application/FindBoard/FindBoardUseCase';
import { BoardEntity } from './infra/entity/Board.entity';
import { MysqlBoardRepository } from './infra/mysql/MysqlBoardRepository';
import { BoardsController } from './presentation/board.controller';

@Module({
	imports: [TypeOrmModule.forFeature([BoardEntity])],
	providers: [
		CreateBoardUseCase,
		EditBoardUseCase,
		BoardsController,
		FindBoardUseCase,
		{
			provide: 'BOARD_REPOSITORY',
			useClass: MysqlBoardRepository,
		},
		{
			provide: 'UPDATE_REPOSITORY',
			useClass: MysqlBoardRepository,
		},
		{
			provide: 'FIND_REPOSITORY',
			useClass: MysqlBoardRepository,
		},
	],
	exports: [TypeOrmModule],
	controllers: [BoardsController],
})
export class BoardModule {}
