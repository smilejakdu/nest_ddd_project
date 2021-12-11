import { Column, PrimaryColumn } from 'typeorm';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { UserEntity } from '../../../infra/entity/UserEntity';

export class UpdateUserProfileResponseDto {
	@PrimaryColumn()
	@IsString()
	public user_idx: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'ash', description: 'nickname' })
	public nickname: string;
}

export class UpdateUserProfileRequest extends PickType(UserEntity, [
	'user_idx',
	'nickname',
	'password',
]) {}

export class UpdateUserProfileResponse extends CoreResponse {
	@Column()
	user?: UpdateUserProfileResponseDto;
}
