import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/shared/decorator/user.decorator';
// Request , Response
import { CreateCommentUseCaseRequest } from '../application/CreateCommentUseCase/dto/CreateCommentUseCase.dto';
import { UpdateCommentUseCaseRequest } from '../application/UpdateCommentUseCase/dto/UpdateCommentUseCase.dto';
import { DeleteCommentUseCaseRequest } from '../application/DeleteCommentUseCase/dto/DeleteCommentUseCase.dto';
// UseCase
import { CreateCommentUseCase } from '../application/CreateCommentUseCase/CreateCommentUseCase';
import { UpdateCommentUseCase } from '../application/UpdateCommentUseCase/UpdateCommentUseCase';
import { DeleteCommentUseCase } from '../application/DeleteCommentUseCase/DeleteCommentUseCase';

@ApiBadRequestResponse({ description: 'bad request parameter' })
@ApiInternalServerErrorResponse({ description: 'server error' })
@ApiTags('COMMENT')
@Controller('comment')
export class CommentController {
	constructor(
		private createCommentUseCase: CreateCommentUseCase,
		private updateCommentUseCase: UpdateCommentUseCase,
		private deleteCommentUseCase: DeleteCommentUseCase,
	) {}

	@ApiOperation({ summary: 'create comment' })
	@ApiCreatedResponse({ description: 'create success' })
	@UseGuards(JwtAuthGuard)
	@Post('create')
	async createComment(@User() user, @Body() createCommentRequest: CreateCommentUseCaseRequest) {
		return this.createCommentUseCase.execute(createCommentRequest, user.id);
	}

	@ApiOperation({ summary: 'update comment' })
	@ApiOkResponse({ description: 'success' })
	@UseGuards(JwtAuthGuard)
	@Put('update')
	async updateComment(@User() user, @Body() updateCommentUseCaseRequest: UpdateCommentUseCaseRequest) {
		return this.updateCommentUseCase.execute(updateCommentUseCaseRequest, user.id);
	}

	@ApiOperation({ summary: 'delete comment' })
	@ApiOkResponse({ description: 'success' })
	@UseGuards(JwtAuthGuard)
	@Delete('delete')
	async deleteComment(@Body() deleteCommentRequest: DeleteCommentUseCaseRequest) {
		return this.deleteCommentUseCase.execute(deleteCommentRequest);
	}
}
