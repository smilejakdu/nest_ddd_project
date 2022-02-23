import { Inject } from '@nestjs/common';

import { isNil } from 'lodash';

import { IUseCase } from '../../../shared/core/IUseCase';
import { FindCategoryUseCaseRequest, FindCategoryUseCaseResponse } from './dto/FindCategoryUseCase.dto';
import { ICategoryRepository } from '../../infra/ICategoryRepository';

export class FindCategoryUseCase implements IUseCase<FindCategoryUseCaseRequest, FindCategoryUseCaseResponse> {
	private FAIL_FIND = 'Can`t find category';

	constructor(
		@Inject('CATEGORY_REPOSITORY')
		private readonly categoryRepository: ICategoryRepository,
	) {}

	async execute(request?: FindCategoryUseCaseRequest): Promise<FindCategoryUseCaseResponse> {
		try {
			if (!request.category_idx) {
				const foundCategory = await this.categoryRepository.findAllCategory();
				return {
					ok: true,
					statusCode: 200,
					message: 'SUCCESS',
					category: foundCategory,
				};
			}
			const foundCategoryById = await this.categoryRepository.findByCategoryId(request.category_idx);
			return {
				ok: true,
				statusCode: 200,
				message: 'SUCCESS',
				category: {
					category_idx: foundCategoryById.id,
					category_name: foundCategoryById.categoryName,
					category_status: foundCategoryById.categoryStatus,
				},
			};
		} catch (error) {
			console.log(error);
		}
		return undefined;
	}
}
