import { PickType } from '@nestjs/swagger';

import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { CategoryEntity } from '../../../infra/entity/CategoryEntity';

export class UpdateCategoryUseCaseRequest extends PickType(CategoryEntity, ['category_idx', 'category_name', 'category_status']) {}

export class UpdateCategoryUseCaseResponse extends CoreResponse {
	category?: {
		category_idx: number;
		category_name: string;
	};
}
