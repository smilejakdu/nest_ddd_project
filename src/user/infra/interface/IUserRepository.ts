import { User } from '../../domain/User';

export interface IUserRepository {
	save(user: User): Promise<User>;

	findByNickname(nickname: string): Promise<User> | undefined;

	find(id: string): Promise<User> | undefined;

	editUser(
		id: string,
		nickname: string,
		password: string,
	): Promise<User> | undefined;

	createPasswordHash(password: string): Promise<string> | undefined;
}
