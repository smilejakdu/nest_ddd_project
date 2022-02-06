import { InjectRepository } from '@nestjs/typeorm';
import { IUserHistoryRepository } from '../IUserHistoryRepository';
import { UserEntity } from '../../../user/infra/entity/UserEntity';
import { Repository } from 'typeorm';
import dayjs from 'dayjs';

export class MysqlUserHistoryRepository implements IUserHistoryRepository {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userHistoryRepository: Repository<UserEntity>,
	) {}

	async findThisMonthRegisterUser(): Promise<any> {
		const thisMonth = dayjs(new Date()).format('YYYY-MM-DD');
		console.log('thisMonth:', thisMonth);
		const foundThisMonthRegisterUser = await this.userHistoryRepository
			.createQueryBuilder('user')
			.addSelect('COUNT(*) as userCount')
			.where('user.createAt =: thisMonth', { thisMonth })
			.groupBy('user.createAt')
			.getRawMany();
		console.log('foundThisMonthRegisterUser:', foundThisMonthRegisterUser);

		return foundThisMonthRegisterUser;
	}
}
