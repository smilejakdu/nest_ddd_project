import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlUserRepository } from 'src/user/infra/mysql/MysqlUser.repository';
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
		{
			provide: 'USER_REPOSITORY',
			useClass: MysqlUserRepository,
		},
	],
	exports: [TypeOrmModule],
	controllers: [BoardsController],
})
export class BoardModule {}
