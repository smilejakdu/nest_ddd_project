import { log } from 'console';
import { isEmpty } from 'lodash';

import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';
import bcrypt from 'bcrypt';
import { string } from 'joi';
import { InternalServerErrorException } from '@nestjs/common';

interface UserPasswordProps {
	value: string;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
	// const userPasswordOrError = UserPassword.create(request.password);
	// "123123123" 을 받게된다.
	private constructor(props: UserPasswordProps) {
		super(props);
	}

	static create(userPasswordString: string): Result<UserPassword> {
		const MIN_LENGTH = 6;

		if (isEmpty(userPasswordString)) {
			return Result.fail('UserPasswordString should not be empty.');
		}

		if (userPasswordString.length < MIN_LENGTH) {
			return Result.fail(
				`UserPasswordString should be longer than ${MIN_LENGTH}`,
			);
		}
		const hashedPassword = String(
			UserPassword.passwordStringBcrypt(userPasswordString),
		) as string;
		return Result.ok(new UserPassword({ value: hashedPassword }));
	}

	static async passwordStringBcrypt(
		userPasswordString: string,
	): Promise<string> {
		const hashedPassword = await bcrypt.hash(userPasswordString, 12);
		log('hashedPassword: ', hashedPassword);
		return await hashedPassword;
	}

	get value(): string {
		return this.props.value;
	}
}
