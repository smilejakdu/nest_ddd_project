import { User } from '../domain/User';
import { UserEntity } from './entity/User.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
	save(user: User): Promise<User>;

	findByNicknameOrId(nickname: string, id: string): Promise<User> | Promise<UserEntity>;

	createPasswordHash(password: string): Promise<string> | undefined;

	comparePassword(beforePassword: string, afterPassword: string): Promise<boolean> | undefined;
}
