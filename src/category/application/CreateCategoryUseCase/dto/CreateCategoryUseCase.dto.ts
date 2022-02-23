import { ApiProperty, PickType } from '@nestjs/swagger';

import { Column, PrimaryColumn } from 'typeorm';

import { IsEnum, IsNotEmpty, IsString } from "class-validator";

import { CategoryEntity } from '../../../infra/entity/CategoryEntity';
import { CoreResponse } from '../../../../shared/dto/CoreResponse';

export enum CategoryStatus {
	ACTIVE = 'active',
	STOP = 'stop',
}

export class CreateCategoryResponseDto {
	@PrimaryColumn()
	public category_idx: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'category_name', description: 'category_name' })
	public category_name: string;
}

export class CreateCategoryUseCaseRequest extends PickType(CategoryEntity, ['category_idx', 'category_name' ]) {}

export class CreateCategoryUseCaseResponse extends CoreResponse {
	@Column()
	category?: {
		category_name: string;
	};
}
