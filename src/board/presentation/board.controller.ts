import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/shared/decorator/user.decorator';
// Request , Response
import { CreateBoardRequest, CreateBoardResponse } from '../application/CreateBoardUseCase/dto/CreateBoardUseCase.dto';
import { DeleteBoardRequest, DeleteBoardResponse } from '../application/DeleteBoardUseCase/dto/DeleteBoardUseCase.dto';
import { UpdateBoardRequest, UpdateBoardResponse } from '../application/UpdateBoardUseCase/dto/UpdateBoardUseCase.dto';
import { FindBoardResponse } from '../application/FindBoardUseCase/dto/FindBoardUseCase.dto';
// UseCase
import { UpdateBoardUseCase } from '../application/UpdateBoardUseCase/UpdateBoardUseCase';
import { FindBoardUseCase } from '../application/FindBoardUseCase/FindBoardUseCase';
import { CreateBoardUseCase } from '../application/CreateBoardUseCase/CreateBoardUseCase';
import { FindMyBoardUseCase } from '../application/FindMyBoardUseCase/FindMyBoardUseCase';
import { DeleteBoardUseCase } from '../application/DeleteBoardUseCase/DeleteBoardUseCase';
import { log } from 'console';

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

	@ApiOperation({ summary: 'create board' })
	@ApiOkResponse({ description: 'success', type: CreateBoardResponse })
	@UseGuards(JwtAuthGuard)
	@Post('create')
	async createBoard(@User() user, @Body() createBoardRequest: CreateBoardRequest) {
		return this.createBoardUseCase.execute(createBoardRequest, user.id);
	}

	@ApiOperation({ summary: 'update board' })
	@ApiOkResponse({ description: 'success', type: UpdateBoardResponse })
	@UseGuards(JwtAuthGuard)
	@Put('update')
	async updateBoard(@User() user, @Body() updateBoardRequest: UpdateBoardRequest) {
		return this.updateBoardUseCase.execute(updateBoardRequest, user.id);
	}

	@ApiOperation({ summary: 'delete board' })
	@ApiOkResponse({ description: 'success', type: DeleteBoardResponse })
	@UseGuards(JwtAuthGuard)
	@Delete('delete')
	async deleteBoard(@Body() deleteBoardRequest: DeleteBoardRequest) {
		return this.deleteBoardUseCase.execute(deleteBoardRequest.id);
	}

	@ApiOperation({ summary: 'get board' })
	@ApiOkResponse({ description: 'success', type: FindBoardResponse })
	@Get('find_board')
	async findBoard() {
		return this.findBoardUseCase.execute();
	}

	@ApiOperation({ summary: 'get my board' })
	@ApiOkResponse({ description: 'success', type: FindBoardResponse })
	@UseGuards(JwtAuthGuard)
	@Get('myboard')
	async myBoardFind(@User() user) {
		log(user);
		return this.findMyBoardUseCase.execute(user.id);
	}
}
