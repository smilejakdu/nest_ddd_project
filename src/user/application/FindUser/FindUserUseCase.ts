import { Inject, Injectable } from '@nestjs/common';

import { IUseCase } from '../../../shared/core/IUseCase';
import { FindUserRequest, FindUserResponse } from './dto/FindUser.dto';
import { IUserRepository } from '../../infra/interface/IUserRepository';

@Injectable()
export class FindUserUseCase
	implements IUseCase<FindUserRequest, FindUserResponse>
{
	private HAS_NOT_USER = 'Can`t found User.';

	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: IUserRepository,
	) {}

	async execute(request: FindUserRequest): Promise<FindUserResponse> {
		const requestNickname = request.nickname;
		const foundUser = await this.userRepository.find(requestNickname);

		if (!foundUser) {
			return {
				ok: false,
				error: this.HAS_NOT_USER,
			};
		}

		return {
			ok: true,
			user: {
				id: foundUser.id.toValue().toString(),
				nickname: foundUser.nickname.value,
			},
		};
	}
}
