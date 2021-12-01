import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CoreEntity } from 'src/shared/entity/CoreEntity';
import { UserEntity } from 'src/user/infra/entity/UserEntity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { BoardEntity } from '../../../board/infra/entity/BoardEntity';

export class CommentEntity extends CoreEntity {
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@ApiProperty({
		example: 'content',
		description: 'content',
	})
	@Column('varchar', { name: 'content', length: 500 })
	content: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'userId',
		description: 'userId',
	})
	@Column('varchar', { name: 'UserId', length: 200 })
	userId: string;

	@IsString()
	@ApiProperty({
		example: 'boardId',
		description: 'boardId',
	})
	@Column('varchar', { name: 'BoardId', length: 200 })
	boardId: string;

	@IsString()
	@IsNotEmpty()
	@ManyToOne(() => UserEntity, user => user.UserToBoards, {
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
	User: UserEntity;

	@IsString()
	@IsNotEmpty()
	@ManyToOne(() => BoardEntity, board => board.BoardToComments, {
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'BoardId', referencedColumnName: 'id' }])
	Board: BoardEntity;
}
