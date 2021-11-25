import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/shared/decorator/user.decorator';
import { CreateBoardUseCase } from '../application/CreateBoard/CreateBoardUseCase';
import { CreateBoardRequest, CreateBoardResponse } from '../application/CreateBoard/dto/CreateBoard.dto';
import { DeleteBoardUseCase } from '../application/DeleteBoard/DeleteBoardUseCase';
import { DeleteBoardRequest, DeleteBoardResponse } from '../application/DeleteBoard/dto/DeleteBoard.dto';
import { UpdateBoardRequest, UpdateBoardResponse } from '../application/UpdateBoard/dto/UpdateBoard.dto';
import { UpdateBoardUseCase } from '../application/UpdateBoard/UpdateBoardUseCase';
import { FindBoardResponse } from '../application/FindBoard/dto/FindBoard.dto';
import { FindBoardUseCase } from '../application/FindBoard/FindBoardUseCase';

@ApiInternalServerErrorResponse({ description: 'server error' })
@ApiTags('BOARD')
@Controller('board')
export class BoardsController {
	constructor(
		private createBoardUseCase: CreateBoardUseCase,
		private updateBoardUseCase: UpdateBoardUseCase,
		private findBoardUseCase: FindBoardUseCase,
		private deleteBoardUseCase: DeleteBoardUseCase,
	) {}

	@ApiOperation({ summary: 'board create' })
	@ApiOkResponse({ description: 'success', type: CreateBoardResponse })
	@UseGuards(JwtAuthGuard)
	@Post('create')
	async createBoard(@User() user, @Body() createBoardRequest: CreateBoardRequest) {
		return this.createBoardUseCase.execute(createBoardRequest, user.id);
	}

	@ApiOperation({ summary: 'board modify' })
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
	@ApiOkResponse({ description: 'success', type: UpdateBoardResponse })
	@UseGuards(JwtAuthGuard)
	@Get('find_myboard')
	async myBoardFind(@User() user, @Body() updateBoardRequest: UpdateBoardRequest) {
		return this.updateBoardUseCase.execute(updateBoardRequest, user.id);
	}
}
