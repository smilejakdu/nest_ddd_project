import { JwtService } from '@nestjs/jwt';

import { mock, MockProxy } from 'jest-mock-extended';
import { UserNickname } from 'src/user/domain/UserNickname';

import { IUserRepository } from '../../infra/IUserRepository';
import { User } from '../../domain/User';
import { UserPassword } from '../../domain/UserPassword';
import { LoginUserUseCase } from './LoginUserUseCase';

describe('LoginUseCase', () => {
	let uut: LoginUserUseCase;
	let userRepository: MockProxy<IUserRepository>;
	let jwtService: JwtService;

	const TEST_NICKNAME = 'ash123';
	const TEST_PASSWORD = '12345678';
	const TEST_PASSWORD_HASHED = '$2b$10$IJ0LdlcFUuehDmfT.Ke2sO3cEYAWsAXH1CC9CfNnzGUJ5Y5f8iB22';

	beforeEach(() => {
		userRepository = mock<IUserRepository>();
		uut = new LoginUserUseCase(userRepository, jwtService);
		jwtService = mock<JwtService>();
	});

	// function givenFoundUserThatJoinedNaverMail() {
	// 	userRepository.findUserByNickname.calledWith('shindevil1@naver.com').mockResolvedValue(
	// 		User.createNew({
	// 			userNickname: UserNickname.create(TEST_NICKNAME).value,
	// 			userPassword: UserPassword.create(TEST_PASSWORD_HASHED).value,
	// 		}).value,
	// 	);
	// }

	it('생성되었는지', () => {
		expect(uut).toBeDefined();
	});

	it('nickname 과 password 가 모두 일치 해 정상적으로 로그인 되는지', async () => {
		// givenFoundUserThatJoinedNaverMail();
		const loginUserUseCaseResponse = await uut.execute({
			nickname: TEST_NICKNAME,
			password: TEST_PASSWORD,
		});

		expect(loginUserUseCaseResponse.ok).toBe(true);
	});

	it('nickname 이 잘못 된 경우 로그인 되지 않는지', async () => {
		const WRONG_NICKNAME = 'ash';

		// givenFoundUserThatJoinedNaverMail();
		const login = await uut.execute({
			nickname: WRONG_NICKNAME,
			password: TEST_PASSWORD,
		});

		expect(login.ok).toBe(false);
		expect(login.message).toBe(`Can not found nickname : ${WRONG_NICKNAME}`);
	});

	it('password 가 잘못 된 경우 로그인 되지 않는지', async () => {
		// givenFoundUserThatJoinedNaverMail();
		const login = await uut.execute({
			nickname: TEST_NICKNAME,
			password: '1',
		});

		expect(login.ok).toBe(false);
		expect(login.message).toBe('Password is Wrong');
	});
});
