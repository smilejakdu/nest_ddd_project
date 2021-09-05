import { Result } from '../../shared/core/Result';
import { UserNickname } from './UserNickname';

describe('UserEmail', () => {
	const USER_EMAIL = 'dev.den.shin@gmail.com';
	const USER_EMAIL_EMPTY_ERROR_MESSAGE = 'userEmailString should not be empty.';

	let userNicknameOrError: Result<UserNickname>;

	beforeAll(() => {
		userNicknameOrError = UserNickname.create(USER_EMAIL);
	});

	it('생성되는지', () => {
		expect(userNicknameOrError.isSuccess).toBe(true);
	});

	it('UserEmail String 은 빈 값일 수 없습니다', () => {
		userNicknameOrError = UserNickname.create('');

		expect(userNicknameOrError.isSuccess).toBe(false);
		expect(userNicknameOrError.errorValue()).toEqual(
			USER_EMAIL_EMPTY_ERROR_MESSAGE,
		);
	});

	it('UserEmail String 은 null 이나 undefined 일 수 없습니다', () => {
		userNicknameOrError = UserNickname.create(null);
		const userEmailOrErrorOfUndefined = UserNickname.create(undefined);

		expect(userNicknameOrError.isSuccess).toBe(false);
		expect(userEmailOrErrorOfUndefined.isSuccess).toBe(false);
		expect(userNicknameOrError.errorValue()).toEqual(
			USER_EMAIL_EMPTY_ERROR_MESSAGE,
		);
		expect(userEmailOrErrorOfUndefined.errorValue()).toEqual(
			USER_EMAIL_EMPTY_ERROR_MESSAGE,
		);
	});
});
