import { isNil } from 'lodash';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUseCase } from 'src/shared/core/IUseCase';
import { IUserRepository } from 'src/user/infra/IUserRepository';
import { LoginRequest, LoginResponse } from './dto/LoginUseCase.dto';

export class LoginUserUseCase implements IUseCase<LoginRequest, LoginResponse> {
	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: IUserRepository,
		private readonly jwtService: JwtService,
	) {}

	async execute(request: LoginRequest): Promise<LoginResponse> {
		const requestNickname = request.nickname;
		const foundUser = await this.userRepository.findUserByNickname(requestNickname);

		if (isNil(foundUser)) {
			return {
				ok: false,
				status_code: 400,
				error: `Can not found nickname : ${requestNickname}`,
			};
		}

		if (!this.userRepository.checkUserPassword(request.password, foundUser.password)) {
			return {
				ok: false,
				status_code: 400,
				error: 'Password is Wrong',
			};
		}

		const payload = {
			user_idx: foundUser.user_idx,
			nickname: foundUser.nickname,
		};

		return {
			ok: true,
			status_code: 200,
			user: payload,
			token: this.jwtService.sign(payload),
		};
	}
}
