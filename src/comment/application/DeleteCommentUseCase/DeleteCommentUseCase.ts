import { isNil } from 'lodash';
import { Inject } from '@nestjs/common';

import { IUseCase } from 'src/shared/core/IUseCase';
import { ICommentRepository } from 'src/comment/infra/ICommentRepository';
import {
	DeleteCommentUseCaseRequest,
	DeleteCommentUseCaseResponse,
} from './dto/DeleteCommentUseCase.dto';

export const DELETE_COMMENT_ERR = 'DOES_NOT_COMMENT';

export class DeleteCommentUseCase
	implements IUseCase<DeleteCommentUseCaseRequest, DeleteCommentUseCaseResponse>
{
	constructor(
		@Inject('COMMENT_REPOSITORY')
		private readonly commentRepository: ICommentRepository,
	) {}

	async execute(request: DeleteCommentUseCaseRequest): Promise<DeleteCommentUseCaseResponse> {
		const foundComment = await this.commentRepository.findMyComment(request.id);

		if (isNil(foundComment)) {
			return {
				ok: false,
				error: DELETE_COMMENT_ERR,
			};
		}

		await this.commentRepository.deleteComment(foundComment.id.toValue());

		return {
			ok: true,
		};
	}
}