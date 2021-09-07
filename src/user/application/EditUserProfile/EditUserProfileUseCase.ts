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

	constructor(
		@Inject('USER_REPOSITORY')
		private userRepository: IUserRepository,
	) {}

	async execute(
		request: EditUserProfileRequestDto,
	): Promise<EditUserProfileResponse> {
		log('request :', request);
		try {
			const foundUser = await this.userRepository.find(request.id);
			log('foundUser :', foundUser);
			if (!foundUser) {
				return {
					ok: false,
					error: this.HAS_NOT_USER,
				};
			}
			const user = User.create(
				{
					userNickname: foundUser.nickname,
					userPassword: UserPassword.create(request.password).value,
					createdAt: foundUser.createdAt,
				},
				new UniqueEntityId(request.id),
			).value;

			log('EditUserProfileUseCase :', user);

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
