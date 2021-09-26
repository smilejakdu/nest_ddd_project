import { isEmpty, isNil } from 'lodash';

import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';

interface UserNicknameProps {
	value: string;
}

export class UserNickname extends ValueObject<UserNicknameProps> {
	static create(userNicknameString: string): Result<UserNickname> {
		if (isEmpty(userNicknameString)) {
			return Result.fail('userNicknameString should not be empty.');
		}

		if (isNil(userNicknameString)) {
			return Result.fail('userNicknameString is not null or undefined.');
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
