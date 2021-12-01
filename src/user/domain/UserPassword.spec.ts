import { Result } from '../../shared/core/Result';
import {
	UserPassword,
	USER_PASSWORD_NULL_OR_UNDEFINED,
	USER_PASSWORD_MIN_LENGTH,
} from './UserPassword';

describe('UserPassword', () => {
	const PASSWORD = '123456';

	let userPasswordOrError: Result<UserPassword>;

	it('생성되었는지', () => {
		userPasswordOrError = UserPassword.create(PASSWORD);

		expect(userPasswordOrError).toBeDefined();
	});

	it('UserPassword String 은 null 이나 undefined 일 수 없습니다', () => {
		userPasswordOrError = UserPassword.create(null);
		const userPasswordOrErrorOfUndefined = UserPassword.create(undefined);

		expect(userPasswordOrError.isSuccess).toBe(false);
		expect(userPasswordOrErrorOfUndefined.isSuccess).toBe(false);

		expect(userPasswordOrError.errorValue()).toEqual(USER_PASSWORD_NULL_OR_UNDEFINED);
		expect(userPasswordOrErrorOfUndefined.errorValue()).toEqual(USER_PASSWORD_NULL_OR_UNDEFINED);
	});

	it('UserPassword String 은 최소길이를 넘기지 않을 경우엔 생성이 불가합니다.', () => {
		userPasswordOrError = UserPassword.create('12345');

		expect(userPasswordOrError.isSuccess).toBe(false);
		expect(userPasswordOrError.errorValue()).toEqual(USER_PASSWORD_MIN_LENGTH);
	});
});
