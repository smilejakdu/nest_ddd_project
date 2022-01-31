import { mock, MockProxy } from 'jest-mock-extended';

import { IUserRepository } from '../../infra/IUserRepository';
import { User } from '../../domain/User';
import { UserNickname } from '../../domain/UserNickname';
import { UserPassword } from '../../domain/UserPassword';
import { FindUserUseCase } from './FindUserUseCase';

describe('FindUserUseCase', () => {
	const FOUND_NICKNAME = 'ash';
	const HAS_NOT_USER = 'Can`t found User.';

	let uut: FindUserUseCase;
	let userRepository: MockProxy<IUserRepository>;

	beforeEach(() => {
		userRepository = mock<IUserRepository>();
		uut = new FindUserUseCase(userRepository);
	});

	function givenFoundUser(requestId) {
		userRepository.findUserById.calledWith(requestId).mockResolvedValue(
			User.createNew({
				userNickname: UserNickname.create(FOUND_NICKNAME).value,
				userPassword: UserPassword.create('pwdpwdpwd').value,
			}).value,
		);
	}

	it('생성되는지', () => {
		expect(uut).toBeDefined();
	});

	it('잘 찾아지는지', async () => {
		givenFoundUser(FOUND_NICKNAME);

		const found = await uut.execute({ nickname: FOUND_NICKNAME });

		expect(found.ok).toBe(true);
		expect(found.user.nickname).toBe(FOUND_NICKNAME);
	});

	it('없는 아이디의 경우', async () => {
		givenFoundUser('NOT_EXIST_NICKNAME');

		const found = await uut.execute({ nickname: FOUND_NICKNAME });

		expect(found.ok).toBe(false);
		expect(found.message).toBe(HAS_NOT_USER);
		expect(found.user).toBeUndefined();
	});
});
