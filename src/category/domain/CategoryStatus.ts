import { isNil } from 'lodash';

import { ValueObject } from '../../shared/dto/ValueObject';
import { Result } from '../../shared/core/Result';
import { CategoryStatusEnum } from '../infra/entity/CategoryEntity';

interface CategoryStatusProps {
	value: CategoryStatusEnum;
}

export const CATEGORY_STATUS_SHOULD_NOT_BE_NULL_UNDEFINED = 'CategoryStatus should not be null or undefined.';

export class CategoryStatus extends ValueObject<CategoryStatusProps> {
	static create(categoryStatusEnum: CategoryStatusEnum): Result<CategoryStatus> {
		if (isNil(categoryStatusEnum)) {
			return Result.fail(CATEGORY_STATUS_SHOULD_NOT_BE_NULL_UNDEFINED);
		}

		return Result.ok(new CategoryStatus({ value: categoryStatusEnum }));
	}

	private constructor(props: CategoryStatusProps) {
		super(props);
	}

	get value(): string {
		return this.props.value;
	}
}
