import { Category } from '../domain/Category';
import { CategoryEntity } from './entity/CategoryEntity';

export const CATEGORY_REPOSITORY = 'CATEGORY_REPOSITORY';

export interface ICategoryRepository {
	save(category: Category): Promise<Category>;

	findByCategoryId(id: number): Promise<Category>;

	findAllCategory(): Promise<CategoryEntity[]>;

	deleteByCategoryId(id: number): Promise<void>;
}
