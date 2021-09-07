import { cloneDeep, find } from 'lodash';

import { IUserRepository } from './interface/IUserRepository';
import { User } from '../domain/User';
import { log } from 'console';
import * as bcrypt from 'bcrypt';

export class InMemoryUserRepository implements IUserRepository {
	private items: User[] = [];

	async save(user: User): Promise<User> {
		const clonedUser = cloneDeep(user);
		this.items.push(clonedUser);

		return clonedUser;
	}

	async find(id: string): Promise<User> | undefined {
		return find(this.items, item => item.id.toValue().toString() === id);
	}

	async findByNickname(nickname: string): Promise<User> {
		return find(this.items, item => item.nickname.value === nickname);
	}

	async comparePassword(
		beforePassword: string,
		afterPassword: string,
	): Promise<boolean> {
		return await bcrypt.compare(beforePassword, afterPassword);
	}

	async createPasswordHash(password: string): Promise<string> {
		return await bcrypt.hash(password, 10);
	}

	async editUser(
		id: string,
		nickname: string,
		password: string,
	): Promise<User> | undefined {
		return;
	}
}
