import {UpdateDateColumn, CreateDateColumn, Index, PrimaryColumn, PrimaryGeneratedColumn, DeleteDateColumn, BaseEntity} from 'typeorm';

import { IsString } from 'class-validator';

export class CoreEntity extends BaseEntity {
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
