import { mock, MockProxy } from 'jest-mock-extended';

import { CreateUserUseCase } from './CreateUserUseCase';
import { IUserRepository } from '../../infra/IUserRepository';
import { User } from '../../domain/User';
import { UserNickname } from '../../domain/UserNickname';
import { UserPassword } from '../../domain/UserPassword';

describe('CreateUserUseCase', () => {
	const USER_NICKNAME = 'ash';
	const USER_PASSWORD = '123456';
	const DUPLICATE_NICKNAME_ERROR_MESSAGE = 'Request nickname was duplicated.';

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

	it('creates User', () => {
		expect(uut).toBeDefined();
	});

	it('User Create', async () => {
		const createUserResponse = await createUser(USER_NICKNAME, USER_PASSWORD);

		expect(createUserResponse).toBeDefined();
		expect(createUserResponse.ok).toBe(true);
		expect(createUserResponse.error).toBeUndefined();
		expect(createUserResponse.user).toBeDefined();
		expect(createUserResponse.user.nickname).toEqual(USER_NICKNAME);
	});
});
