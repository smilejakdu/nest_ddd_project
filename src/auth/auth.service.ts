import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/infra/entity/UserEntity';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private usersRepository: Repository<UserEntity>,
	) {}

	async validateUser(nickname: string, password: string): Promise<any> {
		const foundUser = await this.usersRepository.findOne({
			where: { nickname: nickname },
			select: ['id', 'nickname', 'password'],
		});

		if (!foundUser) {
			throw new Error('존재하지 않는 사용자');
		}

		const result = await bcrypt.compare(password, foundUser.password);
		if (result) {
			const { password, ...userWithoutPassword } = foundUser;
			return userWithoutPassword;
		}
		return null;
	}
}
