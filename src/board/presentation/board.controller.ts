import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
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
// UseCase
import { UpdateBoardUseCase } from '../application/UpdateBoardUseCase/UpdateBoardUseCase';
import { FindBoardUseCase } from '../application/FindBoardUseCase/FindBoardUseCase';
import { CreateBoardUseCase } from '../application/CreateBoardUseCase/CreateBoardUseCase';
import { FindMyBoardUseCase } from '../application/FindMyBoardUseCase/FindMyBoardUseCase';
import { DeleteBoardUseCase } from '../application/DeleteBoardUseCase/DeleteBoardUseCase';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { BadRequestParameterResponse } from 'src/shared/dto/BadRequestParameterResponse';
import { ServerErrorResponse } from 'src/shared/dto/ServerErrorResponse';
import { FindBoardUseCaseResponse } from './dto/FindBoardUseCaseResponse';
import { DeleteBoardUseCaseResponse } from './dto/DeleteBoardUseCaseResponse';
import { UpdateBoardUseCaseResponse } from './dto/UpdateBoardUseCaseResponse';

@ApiBadRequestResponse({
	description: 'bad request parameter',
	type: BadRequestParameterResponse,
})
@ApiInternalServerErrorResponse({ description: 'server error', type: ServerErrorResponse })
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
	async createBoard(@User() user, @Body() createBoardRequest: CreateBoardUseCaseRequest) {
		return this.createBoardUseCase.execute(createBoardRequest, user.id);
	}

	@ApiOkResponse({ description: 'update success', type: UpdateBoardUseCaseResponse })
	@ApiOperation({ summary: 'update board' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('access-token')
	@Put('update')
	async updateBoard(@User() user, @Body() updateBoardRequest: UpdateBoardRequest, @Res() res: Response) {
		const responseUpdateBoard = await this.updateBoardUseCase.execute(updateBoardRequest, user.id);
		if (!responseUpdateBoard.ok) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				ok: responseUpdateBoard.ok,
				statusCode: responseUpdateBoard.statusCode,
				message: responseUpdateBoard.message,
			});
		}
		return res.status(HttpStatus.OK).json({
			ok: responseUpdateBoard.ok,
			statusCode: responseUpdateBoard.statusCode,
			message: responseUpdateBoard.message,
			board: responseUpdateBoard.board,
		});
	}

	@ApiOkResponse({ description: 'delete success', type: DeleteBoardUseCaseResponse })
	@ApiOperation({ summary: 'delete board' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('access-token')
	@Delete('delete')
	async deleteBoard(@User() user, @Body() deleteBoardRequest: DeleteBoardRequest, @Res() res: Response) {
		console.log(user);
		const responseDeleteBoard = await this.deleteBoardUseCase.execute(deleteBoardRequest.board_idx);
		if (!responseDeleteBoard.ok) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				ok: responseDeleteBoard.ok,
				statusCode: responseDeleteBoard.statusCode,
				message: responseDeleteBoard.message,
			});
		}
		return res.status(HttpStatus.OK).json({
			ok: responseDeleteBoard.ok,
			statusCode: responseDeleteBoard.statusCode,
			boardIdx: responseDeleteBoard.id,
			message: responseDeleteBoard.message,
		});
	}

	@ApiOkResponse({ description: 'find success', type: FindBoardUseCaseResponse })
	@ApiOperation({ summary: 'get board' })
	@Get('find_board')
	async findBoard(@Res() res: Response) {
		const responseFoundBoard = await this.findBoardUseCase.execute();
		if (!responseFoundBoard.ok) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				ok: responseFoundBoard.ok,
				statusCode: responseFoundBoard.statusCode,
				message: responseFoundBoard.message,
			});
		}
		return res.status(HttpStatus.OK).json({
			ok: responseFoundBoard.ok,
			statusCode: responseFoundBoard.statusCode,
			message: responseFoundBoard.message,
			boards: responseFoundBoard.boards,
		});
	}

	@ApiOkResponse({ description: 'my board get success', type: FindBoardUseCaseResponse })
	@ApiOperation({ summary: 'get my board' })
	@UseGuards(JwtAuthGuard)
	@Get('myboard')
	async myBoardFind(@User() user, @Res() res: Response) {
		const responseFoundMyBoard = await this.findMyBoardUseCase.execute(user.id);
		if (!responseFoundMyBoard.ok) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				ok: responseFoundMyBoard.ok,
				statusCode: responseFoundMyBoard.statusCode,
				message: responseFoundMyBoard.message,
			});
		}
		return res.status(HttpStatus.OK).json({
			ok: responseFoundMyBoard.ok,
			statusCode: responseFoundMyBoard.statusCode,
			message: responseFoundMyBoard.message,
			boards: responseFoundMyBoard.boards,
		});
	}
}
