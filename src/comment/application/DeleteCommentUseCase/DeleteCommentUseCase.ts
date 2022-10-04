import {HttpStatus, Inject } from '@nestjs/common';

import { isNil } from 'lodash';
import { IUseCase } from 'src/shared/core/IUseCase';
import { ICommentRepository } from 'src/comment/infra/ICommentRepository';

import { DeleteCommentUseCaseRequest, DeleteCommentUseCaseResponse } from './dto/DeleteCommentUseCase.dto';

export const DELETE_COMMENT_ERR = 'DOES_NOT_COMMENT';

export class DeleteCommentUseCase implements IUseCase<DeleteCommentUseCaseRequest, DeleteCommentUseCaseResponse> {
	constructor(
		@Inject('COMMENT_REPOSITORY')
		private readonly commentRepository: ICommentRepository,
	) {}

	async execute(request: DeleteCommentUseCaseRequest): Promise<DeleteCommentUseCaseResponse> {
		const foundComment = await this.commentRepository.findMyComment(request.comment_idx);

		if (isNil(foundComment)) {
			return {
				ok: false,
				statusCode: HttpStatus.NOT_FOUND,
				message: DELETE_COMMENT_ERR,
			};
		}

		await this.commentRepository.deleteComment(foundComment.id);

		return {
			ok: true,
			message: 'SUCCESS',
			statusCode: HttpStatus.OK,
		};
	}
}
