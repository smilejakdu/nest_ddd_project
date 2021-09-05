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
import { UsersService } from './users.service';

@ApiInternalServerErrorResponse({
	description: '서버 에러',
})
@ApiTags('USER')
@Controller('user')
export class UsersController {
	constructor(private usersService: UsersService) {}
}
