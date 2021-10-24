import { isNil } from 'lodash';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../domain/User';
import { IUserRepository } from '../IUserRepository';
import { UserModelMapper } from '../dto/UserModelMapper';
import { UserEntity } from '../entity/User.entity';
import { log } from 'console';

export class MysqlUserRepository implements IUserRepository {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	async save(user: User): Promise<User> {
		await this.userRepository.save(
			this.userRepository.create({
				id: user.id.toValue().toString(),
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

	async find(id: string): Promise<User> | undefined {
		const foundUser = await this.userRepository.findOne({
			where: { id },
			select: ['id', 'nickname', 'password', 'createdAt'],
		});
		if (!foundUser) {
			return undefined;
		}
		return UserModelMapper.toDomain(foundUser);
	}

	async findByNicknameOrId(nickname: string, id: string): Promise<UserEntity> | undefined {
		const foundUser = await this.userRepository
			.createQueryBuilder('user')
			.select(['user.id , user.nickname', 'user.createdAt']);

		if (isNil(nickname) && isNil(id)) {
			foundUser.getMany();
			return foundUser.execute();
		}

		if (nickname) foundUser.andWhere('user.nickname := nickname', { nickname });
		if (id) foundUser.andWhere('user.id :=id', { id });
		return foundUser.execute();
	}

	async comparePassword(beforePassword: string, afterPassword: string): Promise<boolean> {
		const result = await bcrypt.compare(afterPassword, beforePassword);
		return result;
	}
}
