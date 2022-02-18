import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// UseCase
import { UserEntity } from 'src/user/infra/entity/UserEntity';
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';

import { CreateCommentUseCase } from './application/CreateCommentUseCase/CreateCommentUseCase';
import { UpdateCommentUseCase } from './application/UpdateCommentUseCase/UpdateCommentUseCase';
import { DeleteCommentUseCase } from './application/DeleteCommentUseCase/DeleteCommentUseCase';
// Entity
import { CommentEntity } from './infra/entity/CommentEntity';

// Repository
import { MysqlCommentRepository } from './infra/mysql/MysqlCommentRepository';
import { COMMENT_REPOSITORY } from './infra/ICommentRepository';
// Controller
import { CommentController } from './presentation/comment.controller';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, BoardEntity, CommentEntity])],
	providers: [
		CreateCommentUseCase,
		UpdateCommentUseCase,
		DeleteCommentUseCase,
		CommentController,
		{
			provide: COMMENT_REPOSITORY,
			useClass: MysqlCommentRepository,
		},
	],
	exports: [TypeOrmModule],
	controllers: [CommentController],
})
export class CommentModule {}
