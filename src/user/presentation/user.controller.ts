import { Body, Controller, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { log } from 'console';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/shared/decorator/user.decorator';
import { CreateUserUseCase } from '../application/CreateUser/CreateUserUseCase';
import { CreateUserRequest, CreateUserResponse } from '../application/CreateUser/dto/CreateUser.dto';
import {
	UpdateUserProfileRequest,
	UpdateUserProfileResponse,
} from '../application/UpdateUserProfile/dto/UpdateUserProfile.dto';
import { UpdateUserProfileUseCase } from '../application/UpdateUserProfile/UpdateUserProfileUseCase';
import { FindUserResponse } from '../application/FindUser/dto/FindUser.dto';
import { FindUserUseCase } from '../application/FindUser/FindUserUseCase';
import { LoginRequest, LoginResponse } from '../application/Login/dto/LoginUser.dto';
import { LoginUserUseCase } from '../application/Login/LoginUserUseCase';

@ApiInternalServerErrorResponse({ description: '서버 에러' })
@ApiTags('USER')
@Controller('users')
export class UsersController {
	constructor(
		private createUserUseCase: CreateUserUseCase,
		private loginUserUseCase: LoginUserUseCase,
		private findUserUseCase: FindUserUseCase,
		private updateUserProfileUseCase: UpdateUserProfileUseCase,
	) {}

	@ApiOperation({ summary: 'signup' })
	@ApiOkResponse({ description: 'success', type: CreateUserResponse })
	@Post('signup')
	async createUser(@Body() createUserRequest: CreateUserRequest) {
		return this.createUserUseCase.execute(createUserRequest);
	}

	@ApiOperation({ summary: 'login' })
	@ApiOkResponse({ description: 'success', type: LoginResponse })
	@Post('login')
	async loginUser(@Body() loginUserRequest: LoginRequest) {
		return this.loginUserUseCase.execute(loginUserRequest);
	}

	@ApiOperation({ summary: 'logout' })
	@Post('logout')
	async logOut(@Req() req, @Res() res) {
		req.logout();
		res.clearCookie('connect.sid', { httpOnly: true });
		res.send('ok');
	}

	@ApiResponse({ status: 500, description: 'server error' })
	@UseGuards(JwtAuthGuard)
	@ApiOkResponse({ description: 'success', type: FindUserResponse })
	@Get('profile')
	async findUser(@User() user) {
		return this.findUserUseCase.execute(user);
	}

	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'profile modify' })
	@ApiOkResponse({ description: 'success', type: UpdateUserProfileResponse })
	@Put('edit_user')
	async editUser(@Body() updateUserProfileRequest: UpdateUserProfileRequest) {
		return this.updateUserProfileUseCase.execute(updateUserProfileRequest);
	}
}
