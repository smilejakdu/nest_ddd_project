import { isEmpty, isNil } from 'lodash';

import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';

interface UserNicknameProps {
	value: string;
}

export const USER_NICKNAME_EMPTY_ERROR_MESSAGE = 'userNicknameString should not be empty.';
export const USER_NICKNAME_NOT_NULL_OR_UNDEFINED = 'userNicknameString is not null or undefined.';

export class UserNickname extends ValueObject<UserNicknameProps> {
	static create(userNicknameString: string): Result<UserNickname> {
		if (isNil(userNicknameString)) {
			return Result.fail(USER_NICKNAME_NOT_NULL_OR_UNDEFINED);
		}

		return Result.ok(new UserNickname({ value: userNicknameString }));
	}

	private constructor(props: UserNicknameProps) {
		super(props);
	}

	get value(): string {
		return this.props.value;
	}
}
