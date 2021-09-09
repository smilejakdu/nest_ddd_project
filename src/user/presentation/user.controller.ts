import {
	Body,
	Controller,
	Get,
	Post,
	Put,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import {
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { log } from 'console';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from 'src/shared/decorator/user.decorator';
import { CreateUserUseCase } from '../application/CreateUser/CreateUserUseCase';
import {
	CreateUserRequest,
	CreateUserResponse,
} from '../application/CreateUser/dto/CreateUser.dto';
import {
	EditUserProfileRequest,
	EditUserProfileResponse,
} from '../application/EditUserProfile/dto/EditUserProfile.dto';
import { EditUserProfileUseCase } from '../application/EditUserProfile/EditUserProfileUseCase';
import {
	FindUserRequest,
	FindUserResponse,
} from '../application/FindUser/dto/FindUser.dto';
import { FindUserUseCase } from '../application/FindUser/FindUserUseCase';
import {
	LoginRequest,
	LoginResponse,
} from '../application/Login/dto/LoginUser.dto';
import { LoginUserUseCase } from '../application/Login/LoginUserUseCase';

@ApiInternalServerErrorResponse({ description: '서버 에러' })
@ApiTags('USER')
@Controller('users')
export class UsersController {
	constructor(
		private createUserUseCase: CreateUserUseCase,
		private loginUserUseCase: LoginUserUseCase,
		private findUserUseCase: FindUserUseCase,
		private editUserProfileUseCase: EditUserProfileUseCase,
	) {}

	@ApiOperation({ summary: '회원가입' })
	@ApiOkResponse({ description: '성공', type: CreateUserResponse })
	@Post('signup')
	async createUser(@Body() createUserRequest: CreateUserRequest) {
		return this.createUserUseCase.execute(createUserRequest);
	}

	@ApiOperation({ summary: '로그인' })
	@ApiOkResponse({ description: '성공', type: LoginResponse })
	@Post('login')
	async loginUser(@Body() loginUserRequest: LoginRequest) {
		return this.loginUserUseCase.execute(loginUserRequest);
	}

	@ApiOperation({ summary: '로그아웃' })
	@Post('logout')
	async logOut(@Req() req, @Res() res) {
		req.logout();
		res.clearCookie('connect.sid', { httpOnly: true });
		res.send('ok');
	}

	@ApiResponse({ status: 500, description: '서버 에러' })
	@UseGuards(JwtAuthGuard)
	@ApiOkResponse({ description: '성공', type: FindUserResponse })
	@Get('profile')
	async findUser(@User() user) {
		log('findUser', user);
		return user || false;
	}

	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: '프로필 수정' })
	@ApiOkResponse({ description: '성공', type: EditUserProfileResponse })
	@Put('edit_user')
	async editUser(@Body() editUserProfileRequest: EditUserProfileRequest) {
		return this.editUserProfileUseCase.execute(editUserProfileRequest);
	}
}
