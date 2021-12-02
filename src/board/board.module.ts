import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// UseCase
import { CreateBoardUseCase } from './application/CreateBoardUseCase/CreateBoardUseCase';
import { DeleteBoardUseCase } from './application/DeleteBoardUseCase/DeleteBoardUseCase';
import { UpdateBoardUseCase } from './application/UpdateBoardUseCase/UpdateBoardUseCase';
import { FindBoardUseCase } from './application/FindBoardUseCase/FindBoardUseCase';
import { FindMyBoardUseCase } from './application/FindMyBoardUseCase/FindMyBoardUseCase';
// Entity
import { BoardEntity } from './infra/entity/BoardEntity';
// Repository
import { MysqlBoardRepository } from './infra/mysql/MysqlBoardRepository';
import { BOARD_REPOSITORY } from './infra/IBoardRepository';
// Controller
import { BoardsController } from './presentation/board.controller';
import { UserEntity } from '../user/infra/entity/UserEntity';
import { CommentEntity } from 'src/comment/infra/entity/CommentEntity';

@Module({
	imports: [TypeOrmModule.forFeature([BoardEntity, UserEntity, CommentEntity])],
	providers: [
		CreateBoardUseCase,
		UpdateBoardUseCase,
		BoardsController,
		FindBoardUseCase,
		FindMyBoardUseCase,
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
