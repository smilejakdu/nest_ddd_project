import { Column, Entity, Index, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// Entity
import { CoreEntity } from 'src/shared/entity/CoreEntity';
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';
import { CommentEntity } from 'src/comment/infra/entity/CommentEntity';

@Index('nickname', ['nickname'], { unique: true })
@Entity({ schema: 'ddd_watcha', name: 'users' })
export class UserEntity extends CoreEntity {
	@Column('varchar', { name: 'nickname', length: 200 })
	nickname: string;

	@Column('varchar', { name: 'password', length: 150, select: false }) // select: false 하면 password 빼고 불러온다.
	password: string;

	@OneToMany(() => BoardEntity, boards => boards.User)
	Boards: BoardEntity[];

	@OneToMany(() => CommentEntity, comments => comments.User)
	Comments: CommentEntity[];
}
