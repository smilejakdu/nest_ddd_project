import { Inject } from '@nestjs/common';

import { isNil } from 'lodash';

import { IUseCase } from '../../../shared/core/IUseCase';
import { ICategoryRepository } from '../../infra/ICategoryRepository';
import { UpdateCategoryUseCaseRequest, UpdateCategoryUseCaseResponse } from './dto/UpdateCategoryUseCase.dto';
import { CategoryName } from '../../domain/CategoryName';
import { CategoryStatus } from '../../domain/CategoryStatus';
import { Category } from '../../domain/Category';

export class UpdateCategoryUseCase implements IUseCase<UpdateCategoryUseCaseRequest, UpdateCategoryUseCaseResponse> {
	private FAIL_UPDATE = 'Can`t update category.';
	private HAS_NOT_CATEGORY = 'Can`t found category.';

	constructor(
		@Inject('CATEGORY_REPOSITORY')
		private readonly categoryRepository: ICategoryRepository,
	) {}

	async execute(request: UpdateCategoryUseCaseRequest): Promise<UpdateCategoryUseCaseResponse> {
		try {
			const requestCategoryName = request.category_name;
			const requestCategoryStatus = request.category_status;

			const foundCategory = await this.categoryRepository.findByCategoryId(request.category_idx);

			if (isNil(foundCategory)) {
				return {
					ok: false,
					statusCode: 400,
					message: this.HAS_NOT_CATEGORY,
				};
			}

			const categoryNameOrError = CategoryName.create(requestCategoryName);
			const categoryStatusOrError = CategoryStatus.create(requestCategoryStatus);

			const responseCreatedCategory = Category.create(
				{
					categoryName: categoryNameOrError.value,
					categoryStatus: categoryStatusOrError.value,
					createdAt: foundCategory.createdAt,
				},
				foundCategory.id,
			).value;
			return {
				ok: true,
				statusCode: 200,
				message: 'SUCCESS',
				category: {
					category_idx: responseCreatedCategory.id,
					category_name: responseCreatedCategory.categoryName.value,
				},
			};
		} catch (e) {
			console.log('error:', e);
		}
	}
}
