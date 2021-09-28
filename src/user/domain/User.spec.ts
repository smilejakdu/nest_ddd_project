import { Result } from '../../shared/core/Result';
import { User } from './User';
import { UserNickname } from './UserNickname';
import { UserPassword } from './UserPassword';

describe('User', () => {
	const USER_NICKNAME = 'ash';
	const USER_PASSWORD = '123456';

	let userOrError: Result<User>;
	let userNickname: UserNickname;
	let userPassword: UserPassword;

	beforeEach(() => {
		userNickname = UserNickname.create(USER_NICKNAME).value;
		userPassword = UserPassword.create(USER_PASSWORD).value;

		userOrError = User.createNew({
			userNickname,
			userPassword,
		});
	});

	it('생성되었는지', () => {
		expect(userOrError.isSuccess).toBe(true);
	});

	it('getter 들이 정상작동하는지', () => {
		const createdAt = userOrError.value.createdAt;
		const now = new Date();

		expect(userOrError.value.nickname).toEqual(userNickname);
		expect(userOrError.value.nickname.value).toEqual(USER_NICKNAME);
		expect(`${createdAt.getFullYear()}-${createdAt.getMonth()}-${createdAt.getDate()}`).toEqual(
			`${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
		);
		expect(userOrError.value.password).toEqual(userPassword);
		expect(userOrError.value.password.value).toEqual(USER_PASSWORD);
	});
});
