import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';

export class UserModelMapper {
	static toDomain(entity: UserEntity): User {
		return User.create(
			{
				userName: UserName.create(entity.name).value,
				userEmail: UserEmail.create(entity.email).value,
				userPassword: UserPassword.create(entity.password).value,
				createdAt: entity.createdAt,
			},
			new UniqueEntityId(entity.id),
		).value;
	}
}
