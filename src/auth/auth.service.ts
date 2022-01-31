import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from 'src/user/infra/IUserRepository';
import { isNil } from 'lodash';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		@Inject('USER_REPOSITORY')
		private readonly userRepository: IUserRepository,
	) {}
	async validateUser(nickname: string) {
		const foundUser = await this.userRepository.findUserByNickname(nickname);
		if (isNil(foundUser)) {
			return {
				ok: false,
				statusCode: 400,
				message: `Can not found nickname : ${nickname}`,
			};
		}
		return {
			ok: true,
			user_idx: foundUser.user_idx,
			nickname: foundUser.nickname,
		};
	}

	async makeToken(username: string, userId: number) {
		const payload = { username: username, userId: userId };
		return await this.jwtService.signAsync(payload);
	}

	async checkToken(token: any) {
		return this.jwtService.verify(token);
	}
}
