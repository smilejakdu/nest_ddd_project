import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Column, PrimaryColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/user/infra/entity/User.entity';

export class FindUserDto {
	@PrimaryColumn()
	@IsString()
	id: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'ash', description: 'nickname' })
	@Column(() => String)
	nickname: string;
}

export class FindUserRequest extends PickType(UserEntity, ['id']) {}

export class FindUserResponse extends CoreResponse {
	@Column(() => FindUserDto)
	user?: FindUserDto;
}
