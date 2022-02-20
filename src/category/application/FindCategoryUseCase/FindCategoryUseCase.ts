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
			const requestCategoryIdx = request.category_idx || undefined;
			if (isNil(requestCategoryIdx)) {
				const foundCategoryById = await this.categoryRepository.findAllCategory();
			}
		} catch (error) {
			console.log(error);
		}
		return undefined;
	}
}
