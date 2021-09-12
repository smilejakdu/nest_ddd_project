import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlUserRepository } from 'src/user/infra/mysql/MysqlUser.repository';
import { CreateBoardUseCase } from './application/CreateBoard/CreateBoardUseCase';
import { EditBoardUseCase } from './application/EditBoard/EditBoardUseCase';
import { BoardEntity } from './infra/entity/Board.entity';
import { MysqlBoardRepository } from './infra/mysql/MysqlBoard.repository';
import { BoardsController } from './presentation/board.controller';

@Module({
	imports: [TypeOrmModule.forFeature([BoardEntity])],
	providers: [
		CreateBoardUseCase,
		EditBoardUseCase,
		BoardsController,
		{
			provide: 'BOARD_REPOSITORY',
			useClass: MysqlBoardRepository,
		},
		{
			provide: 'UBOARD_REPOSITORY',
			useClass: MysqlBoardRepository,
		},
	],
	exports: [TypeOrmModule],
	controllers: [BoardsController],
})
export class BoardModule {}
