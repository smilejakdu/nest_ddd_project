import { ApiProperty } from '@nestjs/swagger';

import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { IsNotEmpty, IsString, MinLength } from 'class-validator';
// Entity
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';
import { CommentEntity } from 'src/comment/infra/entity/CommentEntity';
import { CoreEntity } from 'src/shared/entity/CoreEntity';

@Index('user_idx', ['user_idx'], { unique: true })
@Entity({ name: 'users' })
export class UserEntity extends CoreEntity {
	@PrimaryGeneratedColumn()
	user_idx: number;

	@Column('varchar', { name: 'nickname', length: 200 })
	nickname: string;

	@Column('varchar', { name: 'password', length: 200 }) // select: false 하면 password 빼고 불러온다.
	password: string;

	@OneToMany(() => BoardEntity, boards => boards.User)
	Boards: BoardEntity[];

	@OneToMany(() => CommentEntity, comments => comments.User)
	Comments: CommentEntity[];
}
