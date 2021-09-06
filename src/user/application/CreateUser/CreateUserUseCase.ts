import { Inject } from '@nestjs/common';
import { UserNickname } from 'src/user/domain/UserNickname';
import { UserPassword } from 'src/user/domain/UserPassword';

import { IUseCase } from '../../../shared/core/IUseCase';
import { User } from '../../domain/User';
import { IUserRepository } from '../../infra/interface/IUserRepository';
import { CreateUserRequest, CreateUserResponse } from './dto/CreateUser.dto';
import bcrypt from 'bcrypt';

export class CreateUserUseCase
	implements IUseCase<CreateUserRequest, CreateUserResponse>
{
	private DUPLICATE_NICK_NAME_ERROR_MESSAGE =
		'Request nickname was duplicated.';

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
		console.log('userNickname1 : ', userNicknameOrError);
		console.log('userNickname2 : ', userNicknameOrError.value);
		console.log('userPassword1 : ', userPasswordOrError);
		console.log('userPassword2 : ', userPasswordOrError.value);

		const user = User.createNew({
			userNickname: userNicknameOrError.value,
			userPassword: userPasswordOrError.value,
		}).value;

		await this.userRepository.save(user);

		return {
			// 여기서 request 요청 데이터와 메세지가 전달된다.
			ok: true,
			user: {
				id: user.id.toValue().toString(),
				nickname: user.nickname.value,
			},
		};
	}
}
