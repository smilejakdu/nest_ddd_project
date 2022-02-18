import { ApiProperty, PickType } from '@nestjs/swagger';

import { Column, PrimaryColumn } from 'typeorm';

import { IsString, IsNotEmpty } from 'class-validator';
import { CoreResponse } from 'src/shared/dto/CoreResponse';
import { UserEntity } from 'src/user/infra/entity/UserEntity';

export class CreateUserDto {
	@PrimaryColumn()
	@IsString()
	public user_idx: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'ash', description: 'nickname' })
	public nickname: string;
}

export class CreateUserRequest extends PickType(UserEntity, ['nickname', 'password']) {}

export class CreateUserResponse extends CoreResponse {
	@Column(() => CreateUserDto)
	user?: CreateUserDto;
}
