import { mock, MockProxy } from 'jest-mock-extended';

import { CreateUserUseCase } from './CreateUserUseCase';
import { IUserRepository } from '../../infra/interface/IUserRepository';
import { User } from '../../domain/User';
import { UserNickname } from '../../domain/UserNickname';
import { UserPassword } from '../../domain/UserPassword';

describe('CreateUserUseCase', () => {
	const USER_NICKNAME = 'ash';
	const USER_PASSWORD = '123456';
	const DUPLICATE_EMAIL_ERROR_MESSAGE = 'Request email was duplicated.';

	let uut: CreateUserUseCase;
	let userRepository: MockProxy<IUserRepository>;

	beforeEach(() => {
		userRepository = mock<IUserRepository>();
		uut = new CreateUserUseCase(userRepository);
	});

	async function createUser(nickname: string, password: string) {
		return await uut.execute({
			nickname: nickname,
			password: password,
		});
	}

	function givenFoundUserThatJoinedNaverMail(
		nickname: string,
		password: string,
	) {
		userRepository.findByEmail
			.calledWith('den.shin.dev@gmail.com')
			.mockResolvedValue(
				User.createNew({
					userNickname: UserNickname.create(nickname).value,
					userPassword: UserPassword.create(password).value,
				}).value,
			);
	}

	it('생성되었는지', () => {
		expect(uut).toBeDefined();
	});

	it('유저 Create', async () => {
		const createUserResponse = await createUser(USER_NAME, USER_PASSWORD);

		expect(createUserResponse).toBeDefined();
		expect(createUserResponse.ok).toBe(true);
		expect(createUserResponse.error).toBeUndefined();
		expect(createUserResponse.user).toBeDefined();
		expect(createUserResponse.user.name).toEqual(USER_NAME);
	});

	it('중복된 유저 error', async () => {
		givenFoundUserThatJoinedNaverMail(USER_EMAIL, USER_NAME, USER_PASSWORD);

		const duplicateUser = await createUser(
			USER_EMAIL,
			USER_NAME,
			USER_PASSWORD,
		);

		expect(duplicateUser.ok).toBe(false);
		expect(duplicateUser.error).toEqual(DUPLICATE_EMAIL_ERROR_MESSAGE);
	});
});
