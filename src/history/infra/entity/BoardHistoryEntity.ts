import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('bhl_index', ['bhl_index'], { unique: true })
@Entity({ name: 'board_history_log' })
export class BoardHistoryEntity {
	@PrimaryGeneratedColumn()
	bhl_index: number;

	@Column({ type: 'int' })
	bhl_count: number;

	@Column('datetime', { name: 'bhl_datetime' })
	bhl_datetime: string;
}
