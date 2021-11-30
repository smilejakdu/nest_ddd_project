import { User } from 'src/user/domain/User';
import { UserNickname } from 'src/user/domain/UserNickname';
import { UserPassword } from 'src/user/domain/UserPassword';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { UserEntity } from '../entity/UserEntity';

export class UserModelMapper {
	static toDomain(entity: UserEntity): User {
		return User.create(
			{
				userNickname: UserNickname.create(entity.nickname).value,
				userPassword: UserPassword.create(entity.password).value,
				createdAt: entity.createdAt,
			},
			new UniqueEntityId(entity.id),
		).value;
	}
}
