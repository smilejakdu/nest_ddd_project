import { Category } from '../../domain/Category';
import { CategoryName } from '../../domain/CategoryName';
import { CategoryEntity, CategoryStatusEnum } from '../entity/CategoryEntity';

export class CategoryModelMapper {
	static toDomain(entity: CategoryEntity): Category {
		return Category.create(
			{
				categoryName: CategoryName.create(entity.category_name).value,
				categoryStatus: entity.category_status,
				createdAt: entity.createdAt,
			},
			entity.category_idx,
		).value;
	}
}
