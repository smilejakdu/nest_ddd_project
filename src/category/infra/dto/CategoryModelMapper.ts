import { Category } from '../../domain/Category';
import { CategoryName } from '../../domain/CategoryName';
import { CategoryStatus } from '../../domain/CategoryStatus';
import { CategoryEntity } from '../entity/CategoryEntity';

export class CategoryModelMapper {
	static toDomain(entity: CategoryEntity): Category {
		return Category.create(
			{
				categoryName: CategoryName.create(entity.category_name).value,
				categoryStatus: CategoryStatus.create(entity.category_status).value,
				createdAt: entity.createdAt,
			},
			entity.category_idx,
		).value;
	}
}
