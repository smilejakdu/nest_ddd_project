import { isNil } from 'lodash';

import { ValueObject } from '../../shared/dto/ValueObject';
import { Result } from '../../shared/core/Result';

interface CategoryNameProps {
	value: string;
}

export const CATEGORY_NAME_SHOULD_NOT_BE_NULL_UNDEFINED = 'CategoryName should not be null or undefined.';

export class CategoryName extends ValueObject<CategoryNameProps> {
	static create(categoryNameString: string): Result<CategoryName> {
		if (isNil(categoryNameString)) {
			return Result.fail(CATEGORY_NAME_SHOULD_NOT_BE_NULL_UNDEFINED);
		}

		return Result.ok(new CategoryName({ value: categoryNameString }));
	}

	private constructor(props: CategoryNameProps) {
		super(props);
	}

	get value(): string {
		return this.props.value;
	}
}
