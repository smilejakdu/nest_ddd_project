import { isNil } from 'lodash';
import { Body, Controller, Get, HttpStatus, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
// UseCase
import { CreateUserUseCase } from '../application/CreateUserUseCase/CreateUserUseCase';
import { UpdateUserProfileUseCase } from '../application/UpdateUserProfileUseCase/UpdateUserProfileUseCase';
import { LoginUserUseCase } from '../application/LoginUserCase/LoginUserUseCase';
import { FindUserUseCase } from '../application/FindUserUseCase/FindUserUseCase';
import { LoginUserUseCaseResponse } from './dto/LoginUseCaseResponse';
// Dto
import { CreateUserRequest } from '../application/CreateUserUseCase/dto/CreateUserUseCase.dto';
import { UpdateUserProfileRequest } from '../application/UpdateUserProfileUseCase/dto/UpdateUserProfileUseCase.dto';
import { LoginRequest } from '../application/LoginUserCase/dto/LoginUseCase.dto';

import { BadRequestParameterResponse, BAD_REQUEST_PARAMETER } from '../../shared/dto/BadRequestParameterResponse';
import { ServerErrorResponse } from 'src/shared/dto/ServerErrorResponse';
import { SignupUseCaseResponse } from './dto/SignupUseCaseResponse';
import { log } from 'console';
import { FindUserCaseResponse } from './dto/FindUserCaseResponse';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Response } from 'express';

@ApiBadRequestResponse({
	description: 'bad request parameter',
	type: BadRequestParameterResponse,
})
@ApiInternalServerErrorResponse({ description: 'server error', type: ServerErrorResponse })
@ApiTags('USER')
@Controller('users')
export class UsersController {
	constructor(
		private createUserUseCase: CreateUserUseCase,
		private loginUserUseCase: LoginUserUseCase,
		private findUserUseCase: FindUserUseCase,
		private updateUserProfileUseCase: UpdateUserProfileUseCase,
	) {}

	@ApiCreatedResponse({ description: 'create success', type: SignupUseCaseResponse })
	@ApiOperation({ summary: 'signup' })
	@Post('signup')
	async createUser(@Body() createUserRequest: CreateUserRequest, @Res() res: Response) {
		if (isNil(createUserRequest.nickname) || isNil(createUserRequest.password)) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				ok: false,
				statusCode: 400,
				message: BAD_REQUEST_PARAMETER,
			});
		}
		const responseSignupUser = await this.createUserUseCase.execute(createUserRequest);
		return res.status(HttpStatus.CREATED).json({
			ok: responseSignupUser.ok,
			statusCode: responseSignupUser.statusCode,
			message: responseSignupUser.message,
			user: responseSignupUser.user,
		});
	}

	@ApiOkResponse({ description: 'success', type: LoginUserUseCaseResponse })
	@ApiOperation({ summary: 'login' })
	@Post('login')
	async loginUser(@Body() loginUserRequest: LoginRequest, @Res() res: Response) {
		if (isNil(loginUserRequest.nickname) || isNil(loginUserRequest.password)) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				ok: false,
				statusCode: 400,
				message: BAD_REQUEST_PARAMETER,
			});
		}
		const responseLoginedUser = await this.loginUserUseCase.execute(loginUserRequest);
		return res.status(HttpStatus.OK).json({
			ok: responseLoginedUser.ok,
			statusCode: responseLoginedUser.statusCode,
			message: responseLoginedUser.message,
			user: responseLoginedUser.user,
			token: responseLoginedUser.token,
		});
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('access-token')
	@ApiOkResponse({ description: 'success', type: FindUserCaseResponse })
	@ApiOperation({ summary: 'profile' })
	@Get('profile')
	async findUser(@Request() req, @Res() res: Response) {
		const responseFoundUser = await this.findUserUseCase.execute(req);
		if (!responseFoundUser.ok) {
			return res.status(HttpStatus.OK).json({
				ok: responseFoundUser.ok,
				statusCode: responseFoundUser.statusCode,
				message: responseFoundUser.message,
			});
		}
		return res.status(HttpStatus.OK).json({
			ok: responseFoundUser.ok,
			statusCode: responseFoundUser.statusCode,
			message: responseFoundUser.message,
			user: responseFoundUser.user,
		});
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('access-token')
	@ApiOkResponse({ description: 'success' })
	@ApiOperation({ summary: 'profile modify' })
	@Put('edit_user')
	async editUser(@Body() updateUserProfileRequest: UpdateUserProfileRequest, @Res() res: Response) {
		const responseEditedUser = await this.updateUserProfileUseCase.execute(updateUserProfileRequest);
		if (!responseEditedUser.ok) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				ok: responseEditedUser.ok,
				statusCode: responseEditedUser.statusCode,
				message: responseEditedUser.message,
			});
		}
		return res.status(HttpStatus.OK).json({
			ok: responseEditedUser.ok,
			statusCode: responseEditedUser.statusCode,
			message: responseEditedUser.message,
			user: responseEditedUser.user,
		});
	}
}
