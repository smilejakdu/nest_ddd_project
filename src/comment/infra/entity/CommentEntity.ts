import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
// Entity
import { CoreEntity } from 'src/shared/entity/CoreEntity';
import { UserEntity } from 'src/user/infra/entity/UserEntity';
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';

export class CommentEntity extends CoreEntity {
	@Column('varchar', { name: 'content', length: 500 })
	content: string;

	@Column('varchar', { name: 'userId', length: 200 })
	userId: string;

	@Column('varchar', { name: 'boardId', length: 200 })
	boardId: string;

	@ManyToOne(() => UserEntity, user => user.Comments, {
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
	User: UserEntity;

	@ManyToOne(() => BoardEntity, board => board.Comments, {
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'boardId', referencedColumnName: 'id' }])
	Board: BoardEntity;
}
