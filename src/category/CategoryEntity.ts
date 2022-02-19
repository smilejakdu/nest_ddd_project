import { ApiProperty } from '@nestjs/swagger';

import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { isEnum, IsNotEmpty, IsString } from 'class-validator';

export enum CategoryStatus {
	ACTIVE = 'active',
	STOP = 'stop',
}

export class CategoryEntity {
	@ApiProperty({
		description: 'category_idx',
		example: 1,
		type: Number,
	})
	@PrimaryGeneratedColumn()
	category_idx: number;

	@IsString()
	@IsNotEmpty()
	@Column('varchar', { name: 'category_name', length: 200 })
	category_name: string;

	@ApiProperty({
		description: 'category_idx',
		example: 'active',
		type: isEnum,
		default: CategoryStatus.ACTIVE,
	})
	status: CategoryStatus;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@UpdateDateColumn()
	deletedAt: Date;
}
