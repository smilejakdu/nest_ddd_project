import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/user/infra/entity/User.entity';

export class UpdateUserProfileRequestDto extends PickType(UserEntity, [
	'id',
	'nickname',
	'password',
]) {}

export class UpdateUserProfileRequest extends PickType(UserEntity, [
	'id',
	'nickname',
	'password',
]) {}

export class UpdateUserProfileResponse extends CoreResponse {}
