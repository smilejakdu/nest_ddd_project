import { Inject } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/IUseCase';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';

import {
	UpdateCommentUseCaseRequest,
	UpdateCommentUseCaseResponse,
} from './dto/UpdateCommentUseCase.dto';
import { JwtAuthrization } from 'src/shared/domain/JwtEntityId';
import { ICommentRepository } from 'src/comment/infra/ICommentRepository';
import { CommentContent } from 'src/comment/domain/CommentContent';
import { Comment } from 'src/comment/domain/Comment';

export class UpdateCommentUseCase
	implements IUseCase<UpdateCommentUseCaseRequest, UpdateCommentUseCaseResponse>
{
	private FAIL_UPDATE = 'Can`t modify comment.';
	private HAS_NOT_COMMENT = 'Can`t found comment.';

	constructor(
		@Inject('COMMENT_REPOSITORY')
		private commentRepository: ICommentRepository,
	) {}

	async execute(
		request: UpdateCommentUseCaseRequest,
		userId: string,
	): Promise<UpdateCommentUseCaseResponse> {
		const requestContent = request.content;

		const foundComment = await this.commentRepository.findMyComment(request.id);
		if (!foundComment) {
			return {
				ok: false,
				error: this.HAS_NOT_COMMENT,
			};
		}

		try {
			const commentContentOrError = CommentContent.create(requestContent);
			const jwtAuthrizationOrError = JwtAuthrization.create(userId);
			const boardId = request.boardId;

			const comment = Comment.create(
				{
					commentContent: commentContentOrError.value,
					userId: jwtAuthrizationOrError.value,
					boardId: boardId,
					createdAt: foundComment.createdAt,
				},
				new UniqueEntityId(request.id),
			).value;

			await this.commentRepository.save(comment);
			return {
				ok: true,
				comment: {
					id: comment.props.userId.value,
					content: comment.content.props.value,
				},
			};
		} catch (error) {
			return {
				ok: false,
				error: this.FAIL_UPDATE,
			};
		}
	}
}
