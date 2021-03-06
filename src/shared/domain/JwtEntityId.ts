import { Result } from '../../shared/core/Result';
import { ValueObject } from '../dto/ValueObject';

interface JwtContentProps {
	value: number;
}
export class JwtAuthrization extends ValueObject<JwtContentProps> {
	static create(jwtAuthrization: number): Result<JwtAuthrization> {
		return Result.ok(new JwtAuthrization({ value: jwtAuthrization }));
	}

	private constructor(props: JwtContentProps) {
		super(props);
	}

	get value(): number {
		return this.props.value;
	}
}
