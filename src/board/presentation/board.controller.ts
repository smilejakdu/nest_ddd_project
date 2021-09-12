import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import {
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { log } from 'console';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/shared/decorator/user.decorator';
import { CreateBoardUseCase } from '../application/CreateBoard/CreateBoardUseCase';
import {
	CreateBoardRequest,
	CreateBoardResponse,
} from '../application/CreateBoard/dto/CreateBoard.dto';
import {
	EditBoardRequest,
	EditBoardResponse,
} from '../application/EditBoard/dto/EditUserProfile.dto';
import { EditBoardUseCase } from '../application/EditBoard/EditBoardUseCase';

@ApiInternalServerErrorResponse({ description: '서버 에러' })
@ApiTags('BOARD')
@Controller('board')
export class BoardsController {
	constructor(
		private createBoardUseCase: CreateBoardUseCase,
		private editBoardUseCase: EditBoardUseCase,
	) {}

	@ApiOperation({ summary: '게시판 작성' })
	@ApiOkResponse({ description: '성공', type: CreateBoardResponse })
	@UseGuards(JwtAuthGuard)
	@Post('create')
	async createBoard(
		@User() user,
		@Body() createBoardRequest: CreateBoardRequest,
	) {
		return this.createBoardUseCase.execute(createBoardRequest, user.id);
	}

	@ApiOperation({ summary: '게시판 수정' })
	@ApiOkResponse({ description: '성공', type: EditBoardResponse })
	@UseGuards(JwtAuthGuard)
	@Put('update')
	async updateBoard(@User() user, @Body() editBoardRequest: EditBoardRequest) {
		return this.editBoardUseCase.execute(editBoardRequest, user.id);
	}
}
