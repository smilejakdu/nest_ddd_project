import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/user/infra/entity/User.entity';

export class EditUserProfileRequestDto extends PickType(UserEntity, [
	'id',
	'nickname',
	'password',
]) {}

export class EditUserProfileRequest extends PickType(UserEntity, [
	'id',
	'nickname',
	'password',
]) {}

export class EditUserProfileResponse extends CoreResponse {}
