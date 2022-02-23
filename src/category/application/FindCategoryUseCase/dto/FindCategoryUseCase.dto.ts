import { PickType } from '@nestjs/swagger';

import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { CategoryEntity } from '../../../infra/entity/CategoryEntity';

export class FindCategoryUseCaseRequest extends PickType(CategoryEntity, ['category_idx']) {}

export class FindCategoryUseCaseResponse extends CoreResponse {
	category?: any;
}
