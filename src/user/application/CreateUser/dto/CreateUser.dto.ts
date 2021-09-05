import { Column, PrimaryColumn } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { CoreResponse } from 'src/shared/dto/CoreResponse';
import { UserEntity } from 'src/user/infra/entity/User.entity';

export class CreateUserDto {
	@PrimaryColumn()
	@IsString()
	public id: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'ash', description: 'nickname' })
	public nickname: string;
}

export class CreateUserRequest extends PickType(UserEntity, [
	'nickname',
	'password',
]) {}

export class CreateUserResponse extends CoreResponse {
	@Column(() => CreateUserDto)
	user?: CreateUserDto;
}
