import { Result } from '../../shared/core/Result';
import {
	USER_NICKNAME_EMPTY_ERROR_MESSAGE,
	USER_NICKNAME_NOT_NULL_OR_UNDEFINED,
	UserNickname,
} from './UserNickname';

describe('UserNickname', () => {
	const USER_NICKNAME = 'ash';
	let userNicknameOrError: Result<UserNickname>;

	beforeAll(() => {
		userNicknameOrError = UserNickname.create(USER_NICKNAME);
	});

	it('creates 생성되는지 확인', () => {
		expect(userNicknameOrError.isSuccess).toBe(true);
	});

	it('UserNickname String 은 null 이나 undefined 일 수 없습니다', () => {
		const userNicknameOrErrorOfUndefined = UserNickname.create(null);

		expect(userNicknameOrErrorOfUndefined.isSuccess).toBe(false);

		expect(userNicknameOrErrorOfUndefined.errorValue()).toEqual(
			USER_NICKNAME_NOT_NULL_OR_UNDEFINED,
		);
	});
});
