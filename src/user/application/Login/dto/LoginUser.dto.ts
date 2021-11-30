import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/user/infra/entity/UserEntity';
import { Column, PrimaryColumn } from 'typeorm';
import { CoreResponse } from '../../../../shared/dto/CoreResponse';

export class LoginUserDto {
	@PrimaryColumn()
	@IsString()
	public id: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'ash', description: 'nickname' })
	public nickname: string;
}

export class LoginRequest extends PickType(UserEntity, ['nickname', 'password']) {}

export class LoginResponse extends CoreResponse {
	@Column()
	user?: LoginUserDto;
	token?: string;
}
