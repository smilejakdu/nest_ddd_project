import { isNil } from 'lodash';

import { ValueObject } from '../../shared/dto/ValueObject';
import { Result } from '../../shared/core/Result';

interface CategoryStatusProps {
	value: string;
}

export const CATEGORY_STATUS_SHOULD_NOT_BE_NULL_UNDEFINED = 'CategoryStatus should not be null or undefined.';

export class CategoryStatus extends ValueObject<CategoryStatusProps> {
	static create(categoryStatusString: string): Result<CategoryStatus> {
		if (isNil(categoryStatusString)) {
			return Result.fail(CATEGORY_STATUS_SHOULD_NOT_BE_NULL_UNDEFINED);
		}

		return Result.ok(new CategoryStatus({ value: categoryStatusString }));
	}

	private constructor(props: CategoryStatusProps) {
		super(props);
	}

	get value(): string {
		return this.props.value;
	}
}
