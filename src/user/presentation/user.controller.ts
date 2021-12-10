import { isNil } from 'lodash';
import { Body, Controller, Get, HttpStatus, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
// UseCase
import { CreateUserUseCase } from '../application/CreateUser/CreateUserUseCase';
import { UpdateUserProfileUseCase } from '../application/UpdateUserProfile/UpdateUserProfileUseCase';
import { LoginUserUseCase } from '../application/Login/LoginUserUseCase';
import { FindUserUseCase } from '../application/FindUser/FindUserUseCase';
import { LoginUserUseCaseResponse } from './dto/LoginUseCaseResponse';
// Dto
import { CreateUserRequest, CreateUserResponse } from '../application/CreateUser/dto/CreateUser.dto';
import { UpdateUserProfileRequest, UpdateUserProfileResponse } from '../application/UpdateUserProfile/dto/UpdateUserProfile.dto';
import { LoginRequest, LoginResponse } from '../application/Login/dto/LoginUser.dto';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/shared/decorator/user.decorator';
import { BadRequestParameterResponse, BAD_REQUEST_PARAMETER } from '../../shared/dto/BadRequestParameterResponse';
import { ServerErrorResponse } from 'src/shared/dto/ServerErrorResponse';
import { SignupUseCaseResponse } from './dto/SignupUseCaseResponse';

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
		try {
			if (isNil(createUserRequest.nickname) || isNil(createUserRequest.password)) {
				res.status(HttpStatus.BAD_REQUEST).json({
					result: BAD_REQUEST_PARAMETER,
				});
			}
			const createUserUseCaseResponse = await this.createUserUseCase.execute(createUserRequest);

			res.status(HttpStatus.OK).json({
				ok: createUserUseCaseResponse.ok,
				nickname: createUserUseCaseResponse.user.nickname,
			});
		} catch (error) {
			console.error(error);
			res.status(HttpStatus.BAD_REQUEST).json({
				result: BAD_REQUEST_PARAMETER,
			});
		}
	}

	@ApiOkResponse({ description: 'success', type: LoginUserUseCaseResponse })
	@ApiOperation({ summary: 'login' })
	@Post('login')
	async loginUser(@Body() loginUserRequest: LoginRequest, @Res() res: Response) {
		if (isNil(loginUserRequest.nickname) || isNil(loginUserRequest.password)) {
			res.status(HttpStatus.BAD_REQUEST).json({
				error: BAD_REQUEST_PARAMETER,
			});
		}
		try {
			const loginUserUseCaseResponse = await this.loginUserUseCase.execute(loginUserRequest);

			res.status(HttpStatus.OK).json({
				result: loginUserUseCaseResponse,
			});
		} catch (err) {
			console.log(err);
		}
	}

	@ApiOkResponse({ description: 'success' })
	@ApiOperation({ summary: 'logout' })
	@Post('logout')
	async logOut(@Req() req, @Res() res) {
		req.logout();
		res.clearCookie('connect.sid', { httpOnly: true });
		res.send('ok');
	}

	@UseGuards(JwtAuthGuard)
	@ApiOkResponse({ description: 'success' })
	@ApiOperation({ summary: 'get my user' })
	@Get('profile')
	async findUser(@User() user, @Res() res: Response) {
		try {
			const findUserUseCaseResponse = await this.findUserUseCase.execute(user);

			res.status(HttpStatus.OK).json({
				result: findUserUseCaseResponse,
			});
		} catch (err) {
			console.log(err);
			res.status(HttpStatus.BAD_REQUEST).json({
				result: BAD_REQUEST_PARAMETER,
			});
		}
	}

	@UseGuards(JwtAuthGuard)
	@ApiOkResponse({ description: 'success' })
	@ApiOperation({ summary: 'profile modify' })
	@Put('edit_user')
	async editUser(@Body() updateUserProfileRequest: UpdateUserProfileRequest) {
		return this.updateUserProfileUseCase.execute(updateUserProfileRequest);
	}
}
