import { IUseCase } from '../../../shared/core/IUseCase';
import {
	EditUserProfileRequestDto,
	EditUserProfileResponse,
} from './dto/EditUserProfile.dto';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '../../infra/interface/IUserRepository';
import { User } from '../../domain/User';
import { UserPassword } from '../../domain/UserPassword';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { log } from 'console';

export class EditUserProfileUseCase
	implements IUseCase<EditUserProfileRequestDto, EditUserProfileResponse>
{
	private FAIL_UPDATE = 'Can`t modify profile.';
	private HAS_NOT_USER = 'Can`t found User.';
	private PASSWORD_NO_MACTH = 'check User Password';

	constructor(
		@Inject('USER_REPOSITORY')
		private userRepository: IUserRepository,
	) {}

	async execute(
		request: EditUserProfileRequestDto,
	): Promise<EditUserProfileResponse> {
		try {
			const foundUser = await this.userRepository.find(request.id);
			if (!foundUser) {
				return {
					ok: false,
					error: this.HAS_NOT_USER,
				};
			}
			const comparePassword = await this.userRepository.comparePassword(
				foundUser.password.value,
				request.password,
			);
			if (!comparePassword) {
				return {
					ok: false,
					error: this.PASSWORD_NO_MACTH,
				};
			}

			const createHashPassword = await this.userRepository.createPasswordHash(
				request.password,
			);
			foundUser.nickname.props.value = request.nickname;
			const user = User.create(
				{
					userNickname: foundUser.nickname,
					userPassword: UserPassword.create(createHashPassword).value,
					createdAt: foundUser.createdAt,
				},
				new UniqueEntityId(request.id),
			).value;

			await this.userRepository.save(user);

			return {
				ok: true,
			};
		} catch (error) {
			return {
				ok: false,
				error: this.FAIL_UPDATE,
			};
		}
	}
}
