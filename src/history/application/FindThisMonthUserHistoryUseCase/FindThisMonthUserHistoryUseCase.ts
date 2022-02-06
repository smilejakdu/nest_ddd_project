import { Inject, Injectable } from '@nestjs/common';
// Repository
import { IUserHistoryRepository, USER_HISTORY_REPOSITORY } from 'src/history/infra/IUserHistoryRepository';

export interface BoardHistory {
	bh_index: number;
	bh_count: number;
	bh_datetime: string;
}

@Injectable()
export class FindThisMonthUserHistoryUseCase {
	constructor(
		@Inject(USER_HISTORY_REPOSITORY)
		private readonly userHistoryRepository: IUserHistoryRepository,
	) {}

	async execute(): Promise<number> {
		return this.userHistoryRepository.findThisMonthRegisterUser();
	}
}
