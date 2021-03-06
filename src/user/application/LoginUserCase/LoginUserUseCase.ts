import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { isNil } from 'lodash';
import { IUseCase } from 'src/shared/core/IUseCase';
import { IUserRepository } from 'src/user/infra/IUserRepository';
import { log } from 'console';

import { LoginRequest, LoginResponse } from './dto/LoginUseCase.dto';

export class LoginUserUseCase implements IUseCase<LoginRequest, LoginResponse> {
	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: IUserRepository,
		private readonly jwtService: JwtService,
	) {}

	async execute(request: LoginRequest): Promise<LoginResponse> {
		try {
			const requestNickname = request.nickname;
			const foundUser = await this.userRepository.findUserByNickname(requestNickname);

			if (isNil(foundUser)) {
				return {
					ok: false,
					statusCode: 400,
					message: `Can not found nickname : ${requestNickname}`,
				};
			}

			if (!this.userRepository.checkUserPassword(request.password, foundUser.password)) {
				return {
					ok: false,
					statusCode: 400,
					message: 'Password is Wrong',
				};
			}
			delete foundUser.password;
			const payload = {
				user_idx: foundUser.user_idx,
				nickname: foundUser.nickname,
			};
			return {
				ok: true,
				statusCode: 200,
				message: 'SUCCESS',
				user: foundUser,
				token: this.jwtService.sign(payload),
			};
		} catch (error) {
			console.error(error);
			return {
				ok: false,
				statusCode: 400,
				message: 'BAD REQUEST',
			};
		}
	}
}
