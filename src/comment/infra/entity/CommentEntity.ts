import { ApiProperty } from '@nestjs/swagger';

import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { IsNotEmpty, IsString, MinLength } from 'class-validator';
// Entity
import { UserEntity } from 'src/user/infra/entity/UserEntity';
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';
import { CoreEntity } from 'src/shared/entity/CoreEntity';

@Index('comment_idx', ['comment_idx'], { unique: true })
@Entity({ name: 'comments' })
export class CommentEntity extends CoreEntity {
	@PrimaryGeneratedColumn()
	comment_idx: number;

	@Column('varchar', { name: 'content', length: 500 })
	content: string;

	@Column({ type: 'int' })
	userId: number;

	@Column({ type: 'int' })
	boardId: number;

	@ManyToOne(() => UserEntity, user => user.Comments, {
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'userId', referencedColumnName: 'user_idx' }])
	User: UserEntity;

	@ManyToOne(() => BoardEntity, board => board.Comments, {
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'boardId', referencedColumnName: 'board_idx' }])
	Board: BoardEntity;
}
