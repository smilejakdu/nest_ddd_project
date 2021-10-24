import { isEmpty, isNil } from 'lodash';

import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';

interface UserPasswordProps {
	value: string;
}

export const USER_PASSWORD_EMPTY = 'UserPasswordString should not be empty.';
export const USER_PASSWORD_NULL_OR_UNDEFINED = 'UserPasswordString is not null or undefined';
export const USER_PASSWORD_MIN_LENGTH = 'UserPasswordString should be 6 length';

export class UserPassword extends ValueObject<UserPasswordProps> {
	private constructor(props: UserPasswordProps) {
		super(props);
	}

	static create(userPasswordString: string): Result<UserPassword> {
		const MIN_LENGTH = 6;

		if (isEmpty(userPasswordString)) {
			return Result.fail(USER_PASSWORD_EMPTY);
		}

		if (isNil(userPasswordString)) {
			return Result.fail(USER_PASSWORD_NULL_OR_UNDEFINED);
		}

		if (userPasswordString.length < MIN_LENGTH) {
			return Result.fail(`UserPasswordString should be longer than ${MIN_LENGTH}`);
		}

		return Result.ok(new UserPassword({ value: userPasswordString }));
	}

	get value(): string {
		return this.props.value;
	}
}
