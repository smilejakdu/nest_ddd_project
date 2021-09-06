import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../domain/User';
import { IUserRepository } from '../interface/IUserRepository';
import { UserModelMapper } from '../dto/UserModelMapper';
import { UserEntity } from '../entity/User.entity';

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

	async find(nickname: string): Promise<User> | undefined {
		// const foundUser = await this.userRepository.findOne(id, {
		// 	select: ['id', 'nickname', 'password', 'createdAt'],
		// });

		const foundUser = await this.userRepository.findOne({
			where: { nickname },
			select: ['id', 'nickname', 'password', 'createdAt'],
		});
		if (!foundUser) {
			return undefined;
		}

		return UserModelMapper.toDomain(foundUser);
	}

	async findByNickname(nickname: string): Promise<User> | undefined {
		const foundUser = await this.userRepository.findOne(
			{ nickname },
			{ select: ['id', 'nickname', 'password', 'createdAt'] },
		);

		if (!foundUser) {
			return undefined;
		}

		return UserModelMapper.toDomain(foundUser);
	}
}
