import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import dayjs from 'dayjs';

import { IUserHistoryRepository } from '../IUserHistoryRepository';
import { UserEntity } from '../../../user/infra/entity/UserEntity';

export class MysqlUserHistoryRepository implements IUserHistoryRepository {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userHistoryRepository: Repository<UserEntity>,
	) {}

	async findThisMonthRegisterUser(): Promise<any> {
		const thisMonth = dayjs(new Date()).format('YYYY-MM-DD');
		const foundThisMonthRegisterUser = await this.userHistoryRepository
			.createQueryBuilder('user')
			.addSelect('COUNT(*) as userCount')
			.where('user.createAt =: thisMonth', { thisMonth })
			.groupBy('user.createAt')
			.getRawMany();

		return foundThisMonthRegisterUser;
	}
}
