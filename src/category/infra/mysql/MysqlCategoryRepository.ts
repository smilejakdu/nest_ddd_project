import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { isNil } from 'lodash';

import { ICategoryRepository } from '../ICategoryRepository';
import { Category } from '../../domain/Category';
import { CategoryEntity } from '../entity/CategoryEntity';
import { CategoryModelMapper } from '../dto/CategoryModelMapper';

export class MysqlCategoryRepository implements ICategoryRepository {
	constructor(
		@InjectRepository(CategoryEntity)
		private readonly categoryRepository: Repository<CategoryEntity>,
	) {}

	async deleteByCategoryId(id: number): Promise<void> {
		await this.categoryRepository.delete(id);
	}

	async findAllCategory(): Promise<CategoryEntity[]> {
		const foundAllCategory = await this.categoryRepository.createQueryBuilder().getMany();
		return foundAllCategory;
	}

	async findByCategoryId(categoryId: number): Promise<Category> {
		const foundCategoryById = await this.categoryRepository
			.createQueryBuilder('category')
			.innerJoin('category.Movies', 'movies')
			.where('movies.categoryId =:categoryId', { categoryId })
			.getOne();
		if (isNil(foundCategoryById)) {
			return;
		}
		return CategoryModelMapper.toDomain(foundCategoryById);
	}

	async save(category: Category): Promise<Category> {
		await this.categoryRepository.save(
			this.categoryRepository.create({
				category_idx: category.id,
				category_name: category.categoryName.value,
				createdAt: category.createdAt,
			}),
		);

		return category;
	}
}
