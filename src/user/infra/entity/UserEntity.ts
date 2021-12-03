import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// Entity
import { CoreEntity } from 'src/shared/entity/CoreEntity';
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';
import { CommentEntity } from 'src/comment/infra/entity/CommentEntity';

@Index('nickname', ['nickname'], { unique: true })
@Index('user_idx', ['user_idx'], { unique: true })
@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn()
	user_idx: number;

	@IsString()
	@Column('varchar', { name: 'nickname', length: 200 })
	nickname: string;

	@IsString()
	@Column('varchar', { name: 'password', length: 150, select: false }) // select: false 하면 password 빼고 불러온다.
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
