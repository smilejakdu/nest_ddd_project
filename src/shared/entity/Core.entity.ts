import { IsString } from 'class-validator';
import {
	DeleteDateColumn,
	UpdateDateColumn,
	CreateDateColumn,
	Index,
	PrimaryColumn,
} from 'typeorm';

@Index('id', ['id'], { unique: true })
export class CoreEntity {
	@IsString()
	@PrimaryColumn()
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date | null;
}
