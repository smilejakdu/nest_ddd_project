import { ApiProperty } from '@nestjs/swagger';

import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { IsNotEmpty, IsString, MinLength } from 'class-validator';
// Entity
import { UserEntity } from 'src/user/infra/entity/UserEntity';
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';

@Index('comment_idx', ['comment_idx'], { unique: true })
@Entity({ name: 'comments' })
export class CommentEntity {
	@PrimaryGeneratedColumn()
	comment_idx: number;

	@ApiProperty({
		description: 'comment content',
		example: 'comment content',
		type: String,
	})
	@IsString()
	@IsNotEmpty()
	@Column('varchar', { name: 'content', length: 500 })
	content: string;

	@ApiProperty({
		description: 'userId',
		example: 'userId',
		type: Number,
	})
	@Column({ type: 'int' })
	userId: number;

	@ApiProperty({
		description: 'boardId',
		example: 'boardId',
		type: Number,
	})
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

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
