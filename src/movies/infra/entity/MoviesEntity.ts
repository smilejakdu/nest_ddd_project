import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { IsNotEmpty, IsString } from 'class-validator';

import { CategoryEntity, CategoryStatus } from "../../../category/infra/entity/CategoryEntity";

export enum MovieStatusEnum {
	ACTIVE = 'active',
	PAUSE = 'pause',
	INIT = 'init',
	ENCOREDEAL = 'encoredeal',
	FINISHED = 'finished',
}

@Entity({ schema: 'ddd_nest', name: 'movies' })
export class MoviesEntity {
	@PrimaryGeneratedColumn()
	movie_idx: number;

	@IsString()
	@IsNotEmpty()
	@Column('varchar', { name: 'movie_name', length: 200 })
	movie_name: string;

	@Column({ type: 'enum', enum: MovieStatusEnum, default: MovieStatusEnum.INIT })
	movie_status: string;

	@Column()
	deal_start_at: Date;

	@Column()
	deal_end_at: Date;

	@Column({ type: 'int' })
	categoryId: number;

	@ManyToOne(() => CategoryEntity, category => category.Movies)
	@JoinColumn({ name: 'category_id' })
	category: CategoryEntity;
}
