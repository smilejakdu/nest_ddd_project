import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { CategoryName } from './CategoryName';
import { Result } from '../../shared/core/Result';
import { CategoryStatus } from './CategoryStatus';

interface CategoryProps {
	categoryName: CategoryName;
	categoryStatus: CategoryStatus;
	createdAt: Date;
}

interface CategoryNewProps {
	categoryName: CategoryName;
	categoryStatus: CategoryStatus;
}

export class Category extends AggregateRoot<CategoryProps> {
	private constructor(props: CategoryProps, id: number) {
		super(props, id);
	}

	static create(props: CategoryProps, id: number): Result<Category> {
		return Result.ok(new Category(props, id));
	}

	static createNew(props: CategoryNewProps): Result<Category> {
		return Category.create({ ...props, createdAt: new Date() }, 0);
	}

	get categoryName(): CategoryName {
		return this.props.categoryName;
	}

	get categoryStatus(): CategoryStatus {
		return this.props.categoryStatus;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}
}
