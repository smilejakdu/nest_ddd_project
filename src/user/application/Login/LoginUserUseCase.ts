import { Inject } from '@nestjs/common';
import { isUndefined } from 'lodash';
import { IUseCase } from 'src/shared/core/IUseCase';
import { IUserRepository } from 'src/user/infra/interface/IUserRepository';
import { LoginRequest, LoginResponse } from './dto/LoginUser.dto';
import { log } from 'console';
import { User } from 'src/user/domain/User';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export class LoginUserUseCase implements IUseCase<LoginRequest, LoginResponse> {
	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: IUserRepository,
		private readonly jwtService: JwtService,
	) {}

	async execute(request: LoginRequest): Promise<LoginResponse> {
		log("LoginUser_request")
		const requestNickname = request.nickname;
		const foundUser       = await this.userRepository.findByNickname(requestNickname);
		log("LoginUser foundUser : " , foundUser);

		if (isUndefined(foundUser)) {
			return {
				ok: false,
				error: `Can not found nickname : ${requestNickname}`,
			};
		}

		if (!(await LoginUserUseCase.checkPassword(request.password, foundUser))) {
			log('foundUser : ', foundUser);
			return {
				ok: false,
				error: 'Password is Wrong',
			};
		}

    const payload = { nickname: foundUser.nickname.value, id:foundUser.id.toValue() };
		log("payload : " , payload);
		return {
			ok      : true,
			token   : this.jwtService.sign(payload),
		};
	}

	private static async checkPassword(
		requestPassword: string,
		user: User,
	): Promise<boolean> {
		return await bcrypt.compare(requestPassword, user.password.value);
	}
}
