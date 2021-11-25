import { User } from '../domain/User';
import { UserEntity } from './entity/User.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
	save(user: User): Promise<User>;

	findUserByNickname(nickname: string): Promise<UserEntity>;

	findUserById(id: string): Promise<User>;

	createPasswordHash(password: string): Promise<string> | undefined;

	comparePassword(beforePassword: string, afterPassword: string): Promise<boolean> | undefined;

	checkUserPassword(password: string, founduserPassword: string): Promise<boolean> | undefined;
}
