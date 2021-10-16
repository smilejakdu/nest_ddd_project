import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import {
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/shared/decorator/user.decorator';
import { CreateBoardUseCase } from '../application/CreateBoard/CreateBoardUseCase';
import {
	CreateBoardRequest,
	CreateBoardResponse,
} from '../application/CreateBoard/dto/CreateBoard.dto';
import { DeleteBoardUseCase } from '../application/DeleteBoard/DeleteBoardUseCase';
import {
	DeleteBoardRequest,
	DeleteBoardResponse,
} from '../application/DeleteBoard/dto/DeleteBoard.dto';
import {
	UpdateBoardRequest,
	UpdateBoardResponse,
} from '../application/UpdateBoard/dto/UpdateBoard.dto';
import { UpdateBoardUseCase } from '../application/UpdateBoard/UpdateBoardUseCase';
import { FindBoardResponse } from '../application/FindBoard/dto/FindBoard.dto';
import { FindBoardUseCase } from '../application/FindBoard/FindBoardUseCase';

@ApiInternalServerErrorResponse({ description: '서버 에러' })
@ApiTags('BOARD')
@Controller('board')
export class BoardsController {
	constructor(
		private createBoardUseCase: CreateBoardUseCase,
		private updateBoardUseCase: UpdateBoardUseCase,
		private findBoardUseCase: FindBoardUseCase,
		private deleteBoardUseCase: DeleteBoardUseCase,
	) {}

	@ApiOperation({ summary: '게시판 작성' })
	@ApiOkResponse({ description: '성공', type: CreateBoardResponse })
	@UseGuards(JwtAuthGuard)
	@Post('create')
	async createBoard(@User() user, @Body() createBoardRequest: CreateBoardRequest) {
		return this.createBoardUseCase.execute(createBoardRequest, user.id);
	}

	@ApiOperation({ summary: '게시판 수정' })
	@ApiOkResponse({ description: '성공', type: UpdateBoardResponse })
	@UseGuards(JwtAuthGuard)
	@Put('update')
	async updateBoard(@User() user, @Body() updateBoardRequest: UpdateBoardRequest) {
		return this.updateBoardUseCase.execute(updateBoardRequest, user.id);
	}

	@ApiOperation({ summary: '게시판 삭제' })
	@ApiOkResponse({ description: '성공', type: DeleteBoardResponse })
	@UseGuards(JwtAuthGuard)
	@Delete('delete')
	async deleteBoard(@Body() deleteBoardRequest: DeleteBoardRequest) {
		return this.deleteBoardUseCase.execute(deleteBoardRequest.id);
	}

	@ApiOperation({ summary: '게시판 가져오기' })
	@ApiOkResponse({ description: '성공', type: FindBoardResponse })
	@Get('find_board')
	async FindBoard() {
		return this.findBoardUseCase.execute();
	}

	@ApiOperation({ summary: '내 게시판 가져오기' })
	@ApiOkResponse({ description: '성공', type: UpdateBoardResponse })
	@UseGuards(JwtAuthGuard)
	@Get('find_myboard')
	async myBoardFind(@User() user, @Body() updateBoardRequest: UpdateBoardRequest) {
		return this.updateBoardUseCase.execute(updateBoardRequest, user.id);
	}
}
