import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import {
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { CreateUserUseCase } from '../application/CreateUser/CreateUserUseCase';
import {
	CreateUserRequest,
	CreateUserResponse,
} from '../application/CreateUser/dto/CreateUser.dto';

@ApiInternalServerErrorResponse({ description: '서버 에러' })
@ApiTags('USER')
@Controller('users')
export class UsersController {
	constructor(private createUserUseCase: CreateUserUseCase) {}

	@ApiOperation({ summary: '회원가입' })
	@ApiOkResponse({ description: '성공', type: CreateUserResponse })
	@Post('signup')
	async createBoard(@Body() createUserRequest: CreateUserRequest) {
		return this.createUserUseCase.execute(createUserRequest);
	}
}
