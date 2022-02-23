import { Inject } from '@nestjs/common';

import { IUseCase } from '../../../shared/core/IUseCase';
import { CreateCategoryUseCaseRequest, CreateCategoryUseCaseResponse } from './dto/CreateCategoryUseCase.dto';
import { ICategoryRepository } from '../../infra/ICategoryRepository';
import { CategoryName } from '../../domain/CategoryName';
import { Category } from '../../domain/Category';
import { CategoryStatusEnum } from '../../infra/entity/CategoryEntity';

export class CreateCategoryUseCase implements IUseCase<CreateCategoryUseCaseRequest, CreateCategoryUseCaseResponse> {
	private FAIL_CREATE = 'Can`t create category.';

	constructor(
		@Inject('CATEGORY_REPOSITORY')
		private readonly categoryRepository: ICategoryRepository,
	) {}

	async execute(request: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
		try {
			const requestCategoryName = request.category_name;
			const categoryNameOrError = CategoryName.create(requestCategoryName);

			const category = Category.createNew({
				categoryName: categoryNameOrError.value,
				categoryStatus: CategoryStatusEnum.ACTIVE,
			}).value;
			await this.categoryRepository.save(category);

			return {
				ok: true,
				statusCode: 201,
				message: 'SUCCESS',
				category: {
					category_name: category.categoryName.props.value,
				},
			};
		} catch (error) {
			console.log('error:', error);
			return {
				ok: false,
				statusCode: 400,
				message: this.FAIL_CREATE,
			};
		}
	}
}
