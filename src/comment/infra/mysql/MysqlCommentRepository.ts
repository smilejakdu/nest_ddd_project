import { isEmpty } from 'lodash';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// domain
import { Comment } from '../../domain/Comment';
// Entity
import { CommentEntity } from '../entity/CommentEntity';
// repository
import { ICommentRepository } from '../ICommentRepository';
import { CommentModelMapper } from '../dto/CommentModelMapper';
import { log } from 'console';

export class MysqlCommentRepository implements ICommentRepository {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly commentRepository: Repository<CommentEntity>,
	) {}

	async save(comment: Comment): Promise<Comment> {
		await this.commentRepository.save(
			this.commentRepository.create({
				comment_idx: comment.id,
				userId: comment.userId.value,
				boardId: comment.boardId,
				content: comment.content.value,
				createdAt: comment.createdAt,
			}),
		);

		return comment;
	}

	async findMyComments(userId: string): Promise<CommentEntity[]> {
		const foundMyComment = await this.commentRepository
			.createQueryBuilder('comment')
			.where('comment.userId =:userId', { userId })
			.execute();

		return foundMyComment;
	}

	async findMyComment(commentId: number): Promise<Comment> {
		const foundMyComment = await this.commentRepository
			.createQueryBuilder('comment')
			.where('comment.id =:id', { commentId })
			.getOne();

		return CommentModelMapper.toDomain(foundMyComment);
	}

	async deleteComment(commentId: number): Promise<boolean> {
		await this.commentRepository
			.createQueryBuilder('comment')
			.delete()
			.from(CommentEntity)
			.where('comment.commentId =:commentId', { commentId })
			.execute();

		return true;
	}
}
