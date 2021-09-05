import { Inject } from '@nestjs/common';
import { UserNickname } from 'src/user/domain/UserNickname';
import { UserPassword } from 'src/user/domain/UserPassword';

import { IUseCase } from '../../../shared/core/IUseCase';
import { User } from '../../domain/User';
import { IUserRepository } from '../../infra/interface/IUserRepository';
import { CreateUserRequest, CreateUserResponse } from './dto/CreateUser.dto';

export class CreateUserUseCase
	implements IUseCase<CreateUserRequest, CreateUserResponse>
{
	private DUPLICATE_NICK_NAME_ERROR_MESSAGE = 'Request email was duplicated.';

	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: IUserRepository,
	) {}

	async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
		const requestNickname = request.nickname;

		const userNicknameOrError = UserNickname.create(request.nickname);
		const userPasswordOrError = UserPassword.create(request.password);

		const foundUser = await this.userRepository.findByNickname(requestNickname);

		if (foundUser) {
			return {
				ok: false,
				error: this.DUPLICATE_NICK_NAME_ERROR_MESSAGE,
			};
		}

		const user = User.createNew({
			userNickname: userNicknameOrError.value,
			userPassword: userPasswordOrError.value,
		}).value;

		await this.userRepository.save(user);

		return {
			// 여기 return 은 어디로 가는걸까 ?? ==> controller
			// CreateUser.dto.ts 규격이랑 맞아야함
			ok: true,
			user: {
				id: user.id.toValue().toString(),
				nickname: user.nickname.value,
			},
		};
	}
}
