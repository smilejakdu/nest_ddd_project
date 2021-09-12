import { isEmpty } from 'lodash';
import { Result } from '../../shared/core/Result';
import { ValueObject } from '../dto/ValueObject';

interface JwtContentProps {
	value: string;
}
export class JwtAuthrization extends ValueObject<JwtContentProps> {
	static create(jwtAuthrization: string): Result<JwtAuthrization> {
		if (isEmpty(jwtAuthrization)) {
			return Result.fail('board Content should not be empty.');
		}

		return Result.ok(new JwtAuthrization({ value: jwtAuthrization }));
	}

	private constructor(props: JwtContentProps) {
		super(props);
	}

	get value(): string {
		return this.props.value;
	}
}
