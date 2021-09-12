import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { log } from 'console';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/shared/decorator/user.decorator';
import { CreateBoardUseCase } from '../application/CreateBoard/CreateBoardUseCase';
import { CreateBoardRequest, CreateBoardResponse } from '../application/CreateBoard/dto/CreateBoard.dto';

@ApiInternalServerErrorResponse({ description: '서버 에러' })
@ApiTags('BOARD')
@Controller('board')
export class BoardsController {
	constructor(private createBoardUseCase: CreateBoardUseCase) {}

	// UseGuards 데코레이터를 이용하여 토큰 요청이 필요한 API임을 알립니다.
	// UseGuards 안에는 2번 제목에서 AuthGuard 클래스를 넣어줍니다.
	@ApiOperation({ summary: '게시판 작성' })
	@ApiOkResponse({ description: '성공', type: CreateBoardResponse })
	@UseGuards(JwtAuthGuard)
	@Post('create')
	async createUser(@User() user, @Body() createBoardRequest: CreateBoardRequest) {
		return this.createBoardUseCase.execute(createBoardRequest, user.id);
	}
}
