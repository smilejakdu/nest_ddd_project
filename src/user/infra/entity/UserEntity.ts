import { Column, Entity, Index, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CoreEntity } from 'src/shared/entity/CoreEntity';
import { ApiProperty } from '@nestjs/swagger';
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';

@Index('nickname', ['nickname'], { unique: true })
@Entity({ schema: 'ddd_watcha', name: 'users' })
export class UserEntity extends CoreEntity {
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@ApiProperty({
		example: 'nickname',
		description: 'nickname',
	})
	@Column('varchar', { name: 'nickname', length: 200 })
	nickname: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@ApiProperty({
		example: 'password',
		description: 'password',
	})
	@Column('varchar', { name: 'password', length: 150, select: false }) // select: false 하면 password 빼고 불러온다.
	password: string;

	@OneToMany(() => BoardEntity, boards => boards.User)
	UserToBoards: BoardEntity[];
}
