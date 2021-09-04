import { Column } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { CoreResponse } from 'src/shared/dto/CoreResponse';
import { UserEntity } from 'src/user/infra/entity/User.entity';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'ash', description: 'nickname' })
	public nickname;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: '123123123', description: '비밀번호' })
	public password: string;
}

export class CreateUserRequest extends PickType(UserEntity, [
	'nickname',
	'password',
]) {}

export class CreateUserResponse extends CoreResponse {
	@Column(() => CreateUserDto)
	user?: CreateUserDto;
}
