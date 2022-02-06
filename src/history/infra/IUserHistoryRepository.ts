export const USER_HISTORY_REPOSITORY = Symbol('USER_HISTORY_REPOSITORY');

export interface IUserHistoryRepository {
	findThisMonthRegisterUser(): Promise<number>;
}
