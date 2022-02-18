import { ApiProperty, PickType } from '@nestjs/swagger';

import { Column, PrimaryColumn } from 'typeorm';

import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/user/infra/entity/UserEntity';

import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { BoardEntity } from '../../../../board/infra/entity/BoardEntity';
import { CommentEntity } from '../../../../comment/infra/entity/CommentEntity';

export class FindUserDto {
	@PrimaryColumn()
	user_idx: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'ash', description: 'nickname' })
	@Column(() => String)
	nickname: string;

	@Column()
	@ApiProperty({ example: 'ash', description: 'nickname' })
	Boards: BoardEntity[];

	@Column()
	@ApiProperty({ example: 'ash', description: 'nickname' })
	comments: CommentEntity[];
}

export class FindUserRequest extends PickType(UserEntity, ['nickname'] as const) {}

export class FindUserResponse extends CoreResponse {
	@Column(() => FindUserDto)
	user?: {};
}
