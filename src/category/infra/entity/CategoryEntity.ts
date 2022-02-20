import { ApiProperty } from '@nestjs/swagger';

import { Column, CreateDateColumn, DeleteDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { isEnum, IsNotEmpty, IsString } from 'class-validator';

import { ProductsEntity } from '../../../products/infra/entity/ProductsEntity';

export enum CategoryStatus {
	ACTIVE = 'active',
	STOP = 'stop',
}

export class CategoryEntity {
	@PrimaryGeneratedColumn()
	category_idx: number;

	@IsString()
	@IsNotEmpty()
	@Column('varchar', { name: 'category_name', length: 200 })
	category_name: string;

	@Column({
		type: 'enum',
		enum: CategoryStatus,
		default: CategoryStatus.ACTIVE,
	})
	category_status: string;

	@OneToMany(() => ProductsEntity, product => product.category)
	Products: ProductsEntity;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
