import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// UseCase
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
	imports: [TypeOrmModule.forFeature([CommentEntity])],
	providers: [
		CreateCommentUseCase,
		UpdateCommentUseCase,
		DeleteCommentUseCase,
		// BoardsController,
		{
			provide: COMMENT_REPOSITORY,
			useClass: MysqlCommentRepository,
		},
	],
	exports: [TypeOrmModule],
	controllers: [CommentController],
})
export class CommentModule {}
