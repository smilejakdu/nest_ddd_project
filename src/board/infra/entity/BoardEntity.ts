import { ApiProperty } from '@nestjs/swagger';

import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { IsString, IsNotEmpty } from 'class-validator';

// Entity
import { CommentEntity } from 'src/comment/infra/entity/CommentEntity';

import { UserEntity } from '../../../user/infra/entity/UserEntity';
import { CoreEntity } from 'src/shared/entity/CoreEntity';

@Index('board_idx', ['board_idx'], { unique: true })
@Entity({ name: 'boards' })
export class BoardEntity extends CoreEntity {
	@PrimaryGeneratedColumn()
	board_idx: number;

	@Column('varchar', { name: 'title', length: 200 })
	title: string;

	@Column('varchar', { name: 'content', length: 500 })
	content: string;

	@Column({ type: 'int' })
	userId: number;

	@OneToMany(() => CommentEntity, comments => comments.Board)
	Comments: CommentEntity[];

	@ManyToOne(() => UserEntity, user => user.Boards, {
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'userId', referencedColumnName: 'user_idx' }])
	User: UserEntity;
}
