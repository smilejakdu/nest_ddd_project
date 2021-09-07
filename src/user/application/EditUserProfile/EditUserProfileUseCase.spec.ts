import { mock, MockProxy } from 'jest-mock-extended';

import { IUserRepository } from '../../infra/interface/IUserRepository';
import { User } from '../../domain/User';
import { UserPassword } from '../../domain/UserPassword';
import { EditUserProfileUseCase } from './EditUserProfileUseCase';
import { UserNickname } from 'src/user/domain/UserNickname';

describe('EditUserProfileUseCase', () => {
	const USER_ID = 'ID1';
	const MODIFY_NICKNAME = 'MODIFIED';
	const MODIFY_PWD = 'MODIFY_PWD';
	const FAIL_UPDATE = 'Can`t modify profile.';

	let uut: EditUserProfileUseCase;
	let userRepository: MockProxy<IUserRepository>;

	beforeEach(() => {
		userRepository = mock<IUserRepository>();
		uut = new EditUserProfileUseCase(userRepository);
	});

	function givenFoundUserThatJoinedNaverMail() {
		userRepository.find.calledWith(USER_ID).mockResolvedValue(
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

		const editUserProfileResponse = await uut.execute({
			id: USER_ID,
			nickname: MODIFY_NICKNAME,
			password: MODIFY_PWD,
		});

		expect(editUserProfileResponse.ok).toBe(true);
	});

	it('유저이름, 패스워드 규칙 잘 이뤄지는지', async () => {
		givenFoundUserThatJoinedNaverMail();

		const editUserProfileResponseOfPasswordTest = await uut.execute({
			id: USER_ID,
			nickname: MODIFY_NICKNAME,
			password: '1',
		});

		const editUserProfileResponseOfName = await uut.execute({
			id: USER_ID,
			nickname: '',
			password: MODIFY_PWD,
		});

		expect(editUserProfileResponseOfPasswordTest.ok).toBe(false);
		expect(editUserProfileResponseOfName.ok).toBe(false);
		expect(editUserProfileResponseOfPasswordTest.error).toBe(FAIL_UPDATE);
		expect(editUserProfileResponseOfName.error).toBe(FAIL_UPDATE);
	});
});
