import { ApiProperty } from '@nestjs/swagger';

import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { MoviesEntity } from '../../../movies/infra/entity/MoviesEntity';

export enum CategoryStatusEnum {
	ACTIVE = 'active',
	STOP = 'stop',
}

@Entity({ schema: 'ddd_nest', name: 'category' })
export class CategoryEntity {
	@PrimaryGeneratedColumn()
	category_idx: number;

	@ApiProperty({
		description: 'category name',
		example: 'category name',
		type: String,
	})
	@IsString()
	@IsNotEmpty()
	@Column('varchar', { name: 'category_name', length: 200 })
	category_name: string;

	@ApiProperty({
		description: 'category name',
		example: 'category status active stop',
		type: String,
	})
	@IsEnum(CategoryStatusEnum)
	@Column({
		type: 'enum',
		enum: CategoryStatusEnum,
	})
	category_status: CategoryStatusEnum;

	@OneToMany(() => MoviesEntity, movie => movie.category)
	Movies: MoviesEntity;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
