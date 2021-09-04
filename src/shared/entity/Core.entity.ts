import {
	DeleteDateColumn,
	UpdateDateColumn,
	CreateDateColumn,
	Index,
	PrimaryColumn,
} from 'typeorm';

@Index('id', ['id'], { unique: true })
export class CoreEntity {
	@PrimaryColumn({ type: 'int', name: 'id' })
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date | null;
}
