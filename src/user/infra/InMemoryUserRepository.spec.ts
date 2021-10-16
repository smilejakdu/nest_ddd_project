import { IUserRepository } from './IUserRepository';
import { User } from '../domain/User';
import { InMemoryUserRepository } from './InMemoryUserRepository';
import { UserPassword } from '../domain/UserPassword';
import { UserNickname } from '../domain/UserNickname';

describe('InMemoryUserRepository', () => {
	const TEST_USER_NICKNAME = 'ash';
	const TEST_PASSWORD = '1234567';

	let uut: IUserRepository;
	let createdUser: User;
	let savedId: string;

	beforeAll(async () => {
		uut = new InMemoryUserRepository();
		const userNickname = UserNickname.create(TEST_USER_NICKNAME).value;
		const userPassword = UserPassword.create(TEST_PASSWORD).value;
		createdUser = await User.createNew({ userNickname, userPassword }).value;
	});

	describe('save', () => {
		it('저장이 잘 되는지', async () => {
			const savedUser = await uut.save(createdUser);

			expect(createdUser.isEqual(savedUser)).toBe(true);

			savedId = savedUser.id.toValue().toString();
		});
	});

	describe('find', () => {
		it('잘 찾아지는지', async () => {
			const foundUser = await uut.find(savedId);

			expect(foundUser).toBeDefined();
			expect(foundUser.nickname.value).toEqual(TEST_USER_NICKNAME);
			expect(foundUser.password.value).toEqual(TEST_PASSWORD);
		});

		it('없는 유저는 찾지 못하는지', async () => {
			const foundUser = await uut.find('unregistered Id');

			expect(foundUser).toBeUndefined();
		});
	});

	describe('findByEmail', () => {
		it('잘 찾아지는지', async () => {
			const foundUser = await uut.findByNickname(TEST_USER_NICKNAME);

			expect(foundUser).toBeDefined();
			expect(foundUser.nickname.value).toEqual(TEST_USER_NICKNAME);
			expect(foundUser.password.value).toEqual(TEST_PASSWORD);
		});

		it('없는 유저는 찾지 못하는지', async () => {
			const foundUser = await uut.findByNickname('ash');

			expect(foundUser).toBeUndefined();
		});
	});
});
