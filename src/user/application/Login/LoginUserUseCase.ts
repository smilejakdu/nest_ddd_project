import { isNil } from 'lodash';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUseCase } from 'src/shared/core/IUseCase';
import { IUserRepository } from 'src/user/infra/IUserRepository';
import { LoginRequest, LoginResponse } from './dto/LoginUser.dto';
import { User } from 'src/user/domain/User';

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
				error: `Can not found nickname : ${requestNickname}`,
			};
		}

		if (this.userRepository.checkUserPassword(request.password, String(foundUser.password))) {
			return {
				ok: false,
				error: 'Password is Wrong',
			};
		}

		const payload = {
			nickname: foundUser.nickname,
			id: foundUser.id,
		};
		return {
			ok: true,
			token: this.jwtService.sign(payload),
		};
	}
}
