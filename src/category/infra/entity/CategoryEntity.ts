import { ApiProperty } from '@nestjs/swagger';

import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { MoviesEntity } from '../../../movies/infra/entity/MoviesEntity';
import { CoreEntity } from 'src/shared/entity/CoreEntity';

export enum CategoryStatusEnum {
	ACTIVE = 'active',
	STOP = 'stop',
}

@Entity({ schema: 'ddd_nest', name: 'category' })
export class CategoryEntity extends CoreEntity {
	@PrimaryGeneratedColumn()
	category_idx: number;

	@Column('varchar', { name: 'category_name', length: 200 })
	category_name: string;

	@IsEnum(CategoryStatusEnum)
	@Column({
		type: 'enum',
		enum: CategoryStatusEnum,
	})
	category_status: CategoryStatusEnum;

	@OneToMany(() => MoviesEntity, movie => movie.category)
	Movies: MoviesEntity;
}
