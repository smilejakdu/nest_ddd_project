import { Body, Controller, Get, HttpCode, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { log } from 'console';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/shared/decorator/user.decorator';
import { CreateUserUseCase } from '../application/CreateUser/CreateUserUseCase';
import {
	CreateUserRequest,
	CreateUserResponse,
} from '../application/CreateUser/dto/CreateUser.dto';
import {
	UpdateUserProfileRequest,
	UpdateUserProfileResponse,
} from '../application/UpdateUserProfile/dto/UpdateUserProfile.dto';
import { UpdateUserProfileUseCase } from '../application/UpdateUserProfile/UpdateUserProfileUseCase';
import { FindUserResponse } from '../application/FindUser/dto/FindUser.dto';
import { FindUserUseCase } from '../application/FindUser/FindUserUseCase';
import { LoginRequest, LoginResponse } from '../application/Login/dto/LoginUser.dto';
import { LoginUserUseCase } from '../application/Login/LoginUserUseCase';

@ApiBadRequestResponse({ description: 'bad request parameter' })
@ApiInternalServerErrorResponse({ description: 'server error' })
@ApiTags('USER')
@Controller('users')
export class UsersController {
	constructor(
		private createUserUseCase: CreateUserUseCase,
		private loginUserUseCase: LoginUserUseCase,
		private findUserUseCase: FindUserUseCase,
		private updateUserProfileUseCase: UpdateUserProfileUseCase,
	) {}

	@ApiCreatedResponse({ description: 'create success' })
	@ApiOperation({ summary: 'signup' })
	@Post('signup')
	async createUser(@Body() createUserRequest: CreateUserRequest) {
		return this.createUserUseCase.execute(createUserRequest);
	}

	@ApiOkResponse({ description: 'success' })
	@ApiOperation({ summary: 'login' })
	@Post('login')
	async loginUser(@Body() loginUserRequest: LoginRequest) {
		return this.loginUserUseCase.execute(loginUserRequest);
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
	async findUser(@User() user) {
		return this.findUserUseCase.execute(user);
	}

	@UseGuards(JwtAuthGuard)
	@ApiOkResponse({ description: 'success' })
	@ApiOperation({ summary: 'profile modify' })
	@Put('edit_user')
	async editUser(@Body() updateUserProfileRequest: UpdateUserProfileRequest) {
		return this.updateUserProfileUseCase.execute(updateUserProfileRequest);
	}
}
