import { Inject } from '@nestjs/common';

import { JwtAuthrization } from '../../../shared/domain/JwtEntityId';
import { IUseCase } from 'src/shared/core/IUseCase';
import {
	CreateCommentUseCaseRequest,
	CreateCommentUseCaseResponse,
} from './dto/CreateCommentUseCase.dto';
import { CommentContent } from 'src/comment/domain/CommentContent';
import { Comment } from 'src/comment/domain/Comment';
import { ICommentRepository } from 'src/comment/infra/ICommentRepository';

export class CreateCommentUseCase
	implements IUseCase<CreateCommentUseCaseRequest, CreateCommentUseCaseResponse>
{
	private FAIL_CREATE = 'Can`t create comment.';

	constructor(
		@Inject('COMMENT_REPOSITORY')
		private readonly commentRepository: ICommentRepository,
	) {}

	async execute(
		request: CreateCommentUseCaseRequest,
		userId: string,
	): Promise<CreateCommentUseCaseResponse> {
		try {
			const requestContent = request.content;

			const commentContentOrError = CommentContent.create(requestContent);
			const jwtAuthrizationOrError = JwtAuthrization.create(userId);

			const comment = Comment.createNew({
				commentContent: commentContentOrError.value,
				userId: jwtAuthrizationOrError.value,
			}).value;

			await this.commentRepository.save(comment);

			return {
				ok: true,
				comment: {
					id: comment.id.toValue(),
					content: comment.content.props.value,
				},
			};
		} catch (error) {
			return {
				ok: false,
				error: this.FAIL_CREATE,
			};
		}
	}
}
