import { isNil } from 'lodash';
import { Body, Controller, Get, HttpStatus, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
// UseCase
import { CreateUserUseCase } from '../application/CreateUserUseCase/CreateUserUseCase';
import { UpdateUserProfileUseCase } from '../application/UpdateUserProfileUseCase/UpdateUserProfileUseCase';
import { LoginUserUseCase } from '../application/LoginUserCase/LoginUserUseCase';
import { FindUserUseCase } from '../application/FindUserUseCase/FindUserUseCase';
import { LoginUserUseCaseResponse } from './dto/LoginUseCaseResponse';
// Dto
import { CreateUserRequest, CreateUserResponse } from '../application/CreateUserUseCase/dto/CreateUserUseCase.dto';
import { UpdateUserProfileRequest, UpdateUserProfileResponse } from '../application/UpdateUserProfileUseCase/dto/UpdateUserProfileUseCase.dto';
import { LoginRequest, LoginResponse } from '../application/LoginUserCase/dto/LoginUseCase.dto';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/shared/decorator/user.decorator';
import { BadRequestParameterResponse, BAD_REQUEST_PARAMETER } from '../../shared/dto/BadRequestParameterResponse';
import { ServerErrorResponse } from 'src/shared/dto/ServerErrorResponse';
import { SignupUseCaseResponse } from './dto/SignupUseCaseResponse';
import { AuthService } from 'src/auth/auth.service';
import { log } from 'console';

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
		private authService: AuthService,
	) {}

	@ApiCreatedResponse({ description: 'create success', type: SignupUseCaseResponse })
	@ApiOperation({ summary: 'signup' })
	@Post('signup')
	async createUser(@Body() createUserRequest: CreateUserRequest, @Res() res: Response) {
		if (isNil(createUserRequest.nickname) || isNil(createUserRequest.password)) {
			res.status(HttpStatus.BAD_REQUEST).json({
				result: BAD_REQUEST_PARAMETER,
			});
		}
		const createUserUseCaseResponse = await this.createUserUseCase.execute(createUserRequest);
		try {
			res.status(HttpStatus.OK).json({
				ok: createUserUseCaseResponse.ok,
				nickname: createUserUseCaseResponse.user.nickname,
			});
		} catch (error) {
			console.error(error);
			res.status(HttpStatus.BAD_REQUEST).json({
				ok: createUserUseCaseResponse.ok,
				result: BAD_REQUEST_PARAMETER,
			});
		}
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
		try {
			const loginUserUseCaseResponse = await this.loginUserUseCase.execute(loginUserRequest);
			return res.status(HttpStatus.OK).json({
				ok: loginUserUseCaseResponse.ok,
				statusCode: loginUserUseCaseResponse.statusCode,
				data: loginUserUseCaseResponse.user,
				token: loginUserUseCaseResponse.token,
			});
		} catch (err) {
			return {
				ok: false,
				statusCode: 400,
				message: 'INTERNATIONAL ERROR',
			};
		}
	}

	@UseGuards(JwtAuthGuard)
	@ApiOkResponse({ description: 'success' })
	@ApiOperation({ summary: 'logout' })
	@Post('logout')
	async logOut(@Res({ passthrough: true }) res: Response) {
		try {
			const { token, ...option } = await this.authService.logOut();
			res.cookie('Authentication', token, option);
			res.status(HttpStatus.OK).json({
				ok: true,
			});
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST).json({
				error: BAD_REQUEST_PARAMETER,
			});
		}
	}

	@UseGuards(JwtAuthGuard)
	@ApiOkResponse({ description: 'success' })
	@ApiOperation({ summary: 'profile' })
	@Get('profile')
	async findUser(@User() user, @Res() res: Response) {
		console.log(user);
		try {
			const findUserUseCaseResponse = await this.findUserUseCase.execute(user);
			return res.status(HttpStatus.OK).json({
				ok: true,
				statusCode: findUserUseCaseResponse.statusCode,
				data: findUserUseCaseResponse.user,
			});
		} catch (err) {
			console.log(err);
			res.status(HttpStatus.BAD_REQUEST).json({
				ok: false,
				data: BAD_REQUEST_PARAMETER,
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
