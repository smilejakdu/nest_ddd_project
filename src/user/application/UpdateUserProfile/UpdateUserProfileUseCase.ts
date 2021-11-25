import { IUseCase } from '../../../shared/core/IUseCase';
import { UpdateUserProfileRequestDto, UpdateUserProfileResponse } from './dto/UpdateUserProfile.dto';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '../../infra/IUserRepository';
import { User } from '../../domain/User';
import { UserPassword } from '../../domain/UserPassword';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { UserNickname } from 'src/user/domain/UserNickname';

export class UpdateUserProfileUseCase implements IUseCase<UpdateUserProfileRequestDto, UpdateUserProfileResponse> {
	private FAIL_UPDATE = 'Can`t modify profile.';
	private HAS_NOT_USER = 'Can`t found User.';
	private PASSWORD_NO_MACTH = 'check User Password';

	constructor(
		@Inject('USER_REPOSITORY')
		private userRepository: IUserRepository,
	) {}

	async execute(request: UpdateUserProfileRequestDto): Promise<UpdateUserProfileResponse> {
		try {
			const foundUser = await this.userRepository.findUserById(request.id);
			if (!foundUser) {
				return {
					ok: false,
					error: this.HAS_NOT_USER,
				};
			}

			const comparePassword = await this.userRepository.comparePassword(
				foundUser.password.props.value,
				request.password,
			);
			if (!comparePassword) {
				return {
					ok: false,
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
