import { mock, MockProxy } from 'jest-mock-extended';

import { IUserRepository } from '../../infra/IUserRepository';
import { User } from '../../domain/User';
import { UserPassword } from '../../domain/UserPassword';
import { UpdateUserProfileUseCase } from './UpdateUserProfileUseCase';
import { UserNickname } from 'src/user/domain/UserNickname';

describe('UpdateUserProfileUseCase', () => {
	const USER_ID = 'ID1';
	const MODIFY_NICKNAME = 'MODIFIED';
	const MODIFY_PWD = 'MODIFY_PWD';
	const FAIL_UPDATE = 'Can`t modify profile.';

	let uut: UpdateUserProfileUseCase;
	let userRepository: MockProxy<IUserRepository>;

	beforeEach(() => {
		userRepository = mock<IUserRepository>();
		uut = new UpdateUserProfileUseCase(userRepository);
	});

	function givenFoundUserThatJoinedNaverMail() {
		userRepository.findUserById.calledWith(USER_ID).mockResolvedValue(
			User.createNew({
				userNickname: UserNickname.create('ash').value,
				userPassword: UserPassword.create('original_pwd').value,
			}).value,
		);
	}

	it('생성되었는지', () => {
		expect(uut).toBeDefined();
	});

	it('변경이 잘 되는지', async () => {
		givenFoundUserThatJoinedNaverMail();

		const updateUserProfileResponse = await uut.execute({
			id: USER_ID,
			nickname: MODIFY_NICKNAME,
			password: MODIFY_PWD,
		});

		expect(updateUserProfileResponse.ok).toBe(true);
	});

	it('유저이름, 패스워드 규칙 잘 이뤄지는지', async () => {
		givenFoundUserThatJoinedNaverMail();

		const updateUserProfileResponseOfPasswordTest = await uut.execute({
			id: USER_ID,
			nickname: MODIFY_NICKNAME,
			password: '1',
		});

		const updateUserProfileResponseOfName = await uut.execute({
			id: USER_ID,
			nickname: '',
			password: MODIFY_PWD,
		});

		expect(updateUserProfileResponseOfPasswordTest.ok).toBe(false);
		expect(updateUserProfileResponseOfName.ok).toBe(false);
		expect(updateUserProfileResponseOfPasswordTest.error).toBe(FAIL_UPDATE);
		expect(updateUserProfileResponseOfName.error).toBe(FAIL_UPDATE);
	});
});
