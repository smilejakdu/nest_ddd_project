import { ApiProperty } from '@nestjs/swagger';

import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { IsNotEmpty, IsString, MinLength } from 'class-validator';
// Entity
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';
import { CommentEntity } from 'src/comment/infra/entity/CommentEntity';

@Index('user_idx', ['user_idx'], { unique: true })
@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn()
	user_idx: number;

	@ApiProperty({
		description: 'nickname',
		example: 'nickname',
		type: String,
	})
	@IsString()
	@Column('varchar', { name: 'nickname', length: 200 })
	nickname: string;

	@ApiProperty({
		description: 'password',
		example: 'password',
		type: String,
	})
	@IsString()
	@Column('varchar', { name: 'password', length: 200 }) // select: false 하면 password 빼고 불러온다.
	password: string;

	@OneToMany(() => BoardEntity, boards => boards.User)
	Boards: BoardEntity[];

	@OneToMany(() => CommentEntity, comments => comments.User)
	Comments: CommentEntity[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
