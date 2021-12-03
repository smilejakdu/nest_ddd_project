import { isNil } from 'lodash';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../domain/User';
import { IUserRepository } from '../IUserRepository';
import { UserModelMapper } from '../dto/UserModelMapper';
import { UserEntity } from '../entity/UserEntity';
import { log } from 'console';

export class MysqlUserRepository implements IUserRepository {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	async save(user: User): Promise<User> {
		await this.userRepository.save(
			this.userRepository.create({
				user_idx: user.id,
				nickname: user.nickname.value,
				password: user.password.value,
				createdAt: user.createdAt,
			}),
		);

		return user;
	}

	async createPasswordHash(password: string): Promise<string> {
		const hashedPassword = await bcrypt.hash(password, 12);
		return hashedPassword;
	}

	async findUserById(user_idx: number): Promise<User> | undefined {
		const foundUser = await this.userRepository
			.createQueryBuilder('user')
			.select(['user.id', 'user.nickname', 'user.password', 'user.createdAt'])
			.where('user.id =:user_idx', { user_idx })
			.getOne();
		log(foundUser);
		if (isNil(foundUser)) return undefined;
		return UserModelMapper.toDomain(foundUser);
	}

	async findUserByNickname(nickname: string): Promise<UserEntity> | undefined {
		const foundUser = await this.userRepository
			.createQueryBuilder('user')
			.select(['user.id', 'user.nickname', 'user.createdAt'])
			.where('user.nickname =:nickname', { nickname })
			.getOne();

		return foundUser;
	}

	async comparePassword(beforePassword: string, afterPassword: string): Promise<boolean> {
		const result = await bcrypt.compare(afterPassword, beforePassword);
		return result;
	}

	async checkUserPassword(
		password: string,
		foundUserPassword: string,
	): Promise<boolean> | undefined {
		return await bcrypt.compare(password, foundUserPassword);
	}
}
