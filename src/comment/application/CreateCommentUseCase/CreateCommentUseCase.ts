import { Inject } from '@nestjs/common';

import { IUseCase } from 'src/shared/core/IUseCase';
import { CommentContent } from 'src/comment/domain/CommentContent';
import { Comment } from 'src/comment/domain/Comment';
import { ICommentRepository } from 'src/comment/infra/ICommentRepository';

import { CreateCommentUseCaseRequest, CreateCommentUseCaseResponse } from './dto/CreateCommentUseCase.dto';
import { JwtAuthrization } from '../../../shared/domain/JwtEntityId';

export class CreateCommentUseCase implements IUseCase<CreateCommentUseCaseRequest, CreateCommentUseCaseResponse> {
	private FAIL_CREATE = 'Can`t create comment.';

	constructor(
		@Inject('COMMENT_REPOSITORY')
		private readonly commentRepository: ICommentRepository,
	) {}

	async execute(request: CreateCommentUseCaseRequest, userId: number): Promise<CreateCommentUseCaseResponse> {
		try {
			const requestContent = request.content;
			const boardId = request.boardId;

			const commentContentOrError = CommentContent.create(requestContent);
			const jwtAuthrizationOrError = JwtAuthrization.create(userId);

			const comment = Comment.createNew({
				commentContent: commentContentOrError.value,
				userId: jwtAuthrizationOrError.value,
				boardId: boardId,
			}).value;

			await this.commentRepository.save(comment);

			return {
				ok: true,
				statusCode: 200,
				message: 'SUCCESS',
				comment: {
					comment_idx: comment.id,
					content: comment.content.props.value,
				},
			};
		} catch (error) {
			console.log(error);
			return {
				ok: false,
				statusCode: 400,
				message: this.FAIL_CREATE,
			};
		}
	}
}
