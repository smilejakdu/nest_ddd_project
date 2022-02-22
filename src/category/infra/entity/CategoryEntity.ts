import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";

import { IsNotEmpty, IsString } from 'class-validator';

import { MoviesEntity } from '../../../movies/infra/entity/MoviesEntity';

export enum CategoryStatus {
	ACTIVE = 'active',
	STOP = 'stop',
}

@Entity({ schema: 'ddd_nest', name: 'category' })
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

	@OneToMany(() => MoviesEntity, movie => movie.category)
	Movies: MoviesEntity;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
