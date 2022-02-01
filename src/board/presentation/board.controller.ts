import { Body, Controller, Delete, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/shared/decorator/user.decorator';
// Request , Response
import { CreateBoardUseCaseRequest } from '../application/CreateBoardUseCase/dto/CreateBoardUseCase.dto';
import { DeleteBoardRequest } from '../application/DeleteBoardUseCase/dto/DeleteBoardUseCase.dto';
import { UpdateBoardRequest } from '../application/UpdateBoardUseCase/dto/UpdateBoardUseCase.dto';
import { FindBoardResponse } from '../application/FindBoardUseCase/dto/FindBoardUseCase.dto';
// UseCase
import { UpdateBoardUseCase } from '../application/UpdateBoardUseCase/UpdateBoardUseCase';
import { FindBoardUseCase } from '../application/FindBoardUseCase/FindBoardUseCase';
import { CreateBoardUseCase } from '../application/CreateBoardUseCase/CreateBoardUseCase';
import { FindMyBoardUseCase } from '../application/FindMyBoardUseCase/FindMyBoardUseCase';
import { DeleteBoardUseCase } from '../application/DeleteBoardUseCase/DeleteBoardUseCase';
import { log } from 'console';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBadRequestResponse({ description: 'bad request parameter' })
@ApiInternalServerErrorResponse({ description: 'server error' })
@ApiTags('BOARD')
@Controller('board')
export class BoardsController {
	constructor(
		private createBoardUseCase: CreateBoardUseCase,
		private updateBoardUseCase: UpdateBoardUseCase,
		private findBoardUseCase: FindBoardUseCase,
		private findMyBoardUseCase: FindMyBoardUseCase,
		private deleteBoardUseCase: DeleteBoardUseCase,
	) {}

	@ApiCreatedResponse({ description: 'create success' })
	@ApiOperation({ summary: 'create board' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('access-token')
	@Post('create')
	async createBoard(@Request() req, @Body() createBoardRequest: CreateBoardUseCaseRequest) {
		const { user_idx, nickname } = req.user;
		return this.createBoardUseCase.execute(createBoardRequest, user_idx);
	}

	@ApiOkResponse({ description: 'update success' })
	@ApiOperation({ summary: 'update board' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('access-token')
	@Put('update')
	async updateBoard(@User() user, @Body() updateBoardRequest: UpdateBoardRequest) {
		return this.updateBoardUseCase.execute(updateBoardRequest, user.id);
	}

	@ApiOkResponse({ description: 'delete success' })
	@ApiOperation({ summary: 'delete board' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('access-token')
	@Delete('delete')
	async deleteBoard(@Body() deleteBoardRequest: DeleteBoardRequest) {
		return this.deleteBoardUseCase.execute(deleteBoardRequest.board_idx);
	}

	@ApiOkResponse({ description: 'find success' })
	@ApiOperation({ summary: 'get board' })
	@Get('find_board')
	async findBoard() {
		return this.findBoardUseCase.execute();
	}

	@ApiOkResponse({ description: 'my board get success' })
	@ApiOperation({ summary: 'get my board' })
	@UseGuards(JwtAuthGuard)
	@Get('myboard')
	async myBoardFind(@User() user) {
		log(user);
		return this.findMyBoardUseCase.execute(user.id);
	}
}
