import { cloneDeep, find, findIndex } from 'lodash';

import { IUserRepository } from './interface/IUserRepository';
import { User } from '../domain/User';
import { log } from 'console';

export class InMemoryUserRepository implements IUserRepository {
	private items: User[] = [];

	async save(user: User): Promise<User> {
		const clonedUser = cloneDeep(user);
		this.items.push(clonedUser);

		return clonedUser;
	}

	async find(nickname: string): Promise<User> | undefined {
		return find(
			this.items,
			item => item.nickname.toValue().toString() === nickname,
		);
	}

	async findByNickname(nickname: string): Promise<User> {
		return find(this.items, item => item.nickname.value === nickname);
	}
}
