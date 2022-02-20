import { ApiProperty, PickType } from '@nestjs/swagger';

import { Column, PrimaryColumn } from 'typeorm';

import { IsNotEmpty, IsString } from 'class-validator';

import { CategoryEntity } from '../../../infra/entity/CategoryEntity';
import { CoreResponse } from '../../../../shared/dto/CoreResponse';

export class CreateCategoryResponseDto {
	@PrimaryColumn()
	public category_idx: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'category_name', description: 'category_name' })
	public category_name: string;

	@IsNotEmpty()
	@ApiProperty({ example: 'category_status', description: 'category_status' })
	public category_status: string;
}

export class CreateCategoryUseCaseRequest extends PickType(CategoryEntity, ['category_idx', 'category_name', 'category_status']) {}

export class CreateCategoryUseCaseResponse extends CoreResponse {
	@Column()
	category?: CreateCategoryResponseDto;
}
