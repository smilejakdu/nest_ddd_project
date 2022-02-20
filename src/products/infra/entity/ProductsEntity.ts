import { ApiProperty } from '@nestjs/swagger';

import { Column, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { IsNotEmpty, IsString } from 'class-validator';

import { CategoryEntity } from '../../../category/infra/entity/CategoryEntity';

export enum ProductStatusEnum {
	ACTIVE = 'active',
	PAUSE = 'pause',
	INIT = 'init',
	ENCOREDEAL = 'encoredeal',
	FINISHED = 'finished',
}

export class ProductsEntity {
	@PrimaryGeneratedColumn()
	product_idx: number;

	@IsString()
	@IsNotEmpty()
	@Column('varchar', { name: 'product_name', length: 200 })
	product_name: string;

	@Column({ type: 'enum', name: 'product_status', default: ProductStatusEnum.INIT })
	product_status: ProductStatusEnum;

	@Column()
	deal_start_at: Date;

	@Column()
	deal_end_at: Date;

	@Column({ type: 'int' })
	categoryId: number;

	@ManyToOne(() => CategoryEntity, category => category.Products)
	@JoinColumn({ name: 'category_id' })
	category: CategoryEntity;
}
