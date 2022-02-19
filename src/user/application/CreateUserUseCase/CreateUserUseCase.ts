import { Inject } from '@nestjs/common';

import { isNil } from 'lodash';
import { UserNickname } from 'src/user/domain/UserNickname';
import { UserPassword } from 'src/user/domain/UserPassword';

import { IUseCase } from '../../../shared/core/IUseCase';
import { User } from '../../domain/User';
import { IUserRepository } from '../../infra/IUserRepository';
import { CreateUserRequest, CreateUserResponse } from './dto/CreateUserUseCase.dto';
import { StatusCode } from '../../../shared/types/status_code';

export class CreateUserUseCase implements IUseCase<CreateUserRequest, CreateUserResponse> {
	private DUPLICATE_NICKNAME_ERROR_MESSAGE = 'Request nickname was duplicated.';

	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: IUserRepository,
	) {}

	async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
		try {
			const requestNickname = request.nickname;

			const userNicknameOrError = UserNickname.create(request.nickname);
			const userPasswordOrError = UserPassword.create(request.password);

			const foundUser = await this.userRepository.findUserByNickname(requestNickname);

			if (!isNil(foundUser)) {
				return {
					ok: false,
					statusCode: StatusCode.BAD_REQIEST,
					message: this.DUPLICATE_NICKNAME_ERROR_MESSAGE,
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
				statusCode: StatusCode.created,
				message: 'SUCCESS',
				user: {
					user_idx: user.id,
					nickname: user.nickname.value,
				},
			};
		} catch (error) {
			console.error(error);
			return {
				ok: false,
				statusCode: StatusCode.BAD_REQIEST,
				message: 'BAD REQUEST',
			};
		}
	}
}
