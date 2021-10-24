import { Inject } from '@nestjs/common';
import { UserNickname } from 'src/user/domain/UserNickname';
import { UserPassword } from 'src/user/domain/UserPassword';

import { IUseCase } from '../../../shared/core/IUseCase';
import { User } from '../../domain/User';
import { IUserRepository } from '../../infra/IUserRepository';
import { CreateUserRequest, CreateUserResponse } from './dto/CreateUser.dto';

export class CreateUserUseCase implements IUseCase<CreateUserRequest, CreateUserResponse> {
	private DUPLICATE_NICKNAME_ERROR_MESSAGE = 'Request nickname was duplicated.';

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
				error: this.DUPLICATE_NICKNAME_ERROR_MESSAGE,
			};
		}

		const passwordHash = await this.userRepository.createPasswordHash(request.password);
		userPasswordOrError.value.props.value = passwordHash;

		const user = User.createNew({
			userNickname: userNicknameOrError.value,
			userPassword: userPasswordOrError.value,
		}).value;

		await this.userRepository.save(user);

		return {
			ok: true,
			user: {
				id: user.id.toValue().toString(),
				nickname: user.nickname.value,
			},
		};
	}
}
