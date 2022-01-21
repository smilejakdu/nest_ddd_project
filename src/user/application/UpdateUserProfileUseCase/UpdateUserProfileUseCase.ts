import { isNil } from 'lodash';
import { IUseCase } from '../../../shared/core/IUseCase';
import { UpdateUserProfileRequest, UpdateUserProfileResponse } from './dto/UpdateUserProfileUseCase.dto';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '../../infra/IUserRepository';
import { User } from '../../domain/User';
import { UserPassword } from '../../domain/UserPassword';
import { UserNickname } from 'src/user/domain/UserNickname';

export class UpdateUserProfileUseCase implements IUseCase<UpdateUserProfileRequest, UpdateUserProfileResponse> {
	private FAIL_UPDATE = 'Can`t modify profile.';
	private HAS_NOT_USER = 'Can`t found User.';
	private PASSWORD_NO_MACTH = 'check User Password';

	constructor(
		@Inject('USER_REPOSITORY')
		private userRepository: IUserRepository,
	) {}

	async execute(request: UpdateUserProfileRequest): Promise<UpdateUserProfileResponse> {
		const foundUser = await this.userRepository.findUserById(request.user_idx);

		if (isNil(foundUser)) {
			return {
				ok: false,
				statusCode: 400,
				error: this.HAS_NOT_USER,
			};
		}

		const comparePassword = await this.userRepository.comparePassword(foundUser.password.props.value, request.password);
		if (!comparePassword) {
			return {
				ok: false,
				statusCode: 400,
				error: this.PASSWORD_NO_MACTH,
			};
		}
		const createHashPassword = await this.userRepository.createPasswordHash(request.password);
		foundUser.nickname.props.value = request.nickname;
		const user = User.create(
			{
				userNickname: UserNickname.create(foundUser.nickname.props.value).value,
				userPassword: UserPassword.create(createHashPassword).value,
				createdAt: foundUser.createdAt,
			},
			foundUser.id,
		).value;

		await this.userRepository.save(user);

		return {
			ok: true,
			statusCode: 200,
			user: {
				user_idx: request.user_idx,
				nickname: request.nickname,
			},
		};
	}
}
