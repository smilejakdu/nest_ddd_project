import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { log } from 'console';

import { CreateUserUseCase } from './application/CreateUser/CreateUserUseCase';
import { EditUserProfileUseCase } from './application/EditUserProfile/EditUserProfileUseCase';
import { FindUserUseCase } from './application/FindUser/FindUserUseCase';
import { LoginUserUseCase } from './application/Login/LoginUserUseCase';

import { UserEntity } from './infra/entity/User.entity';
import { MysqlUserRepository } from './infra/mysql/MysqlUser.repository';
import { UsersController } from './presentation/user.controller';
import dotenv from 'dotenv';
import { AuthModule } from 'src/auth/auth.module';

dotenv.config();
const JWT = process.env.JWT as string;

@Module({
	imports: [
		AuthModule,
		TypeOrmModule.forFeature([UserEntity]),
		JwtModule.register({
			secret: JWT,
			signOptions: { expiresIn: '60s' },
		}),
	],
	providers: [
		CreateUserUseCase,
		FindUserUseCase,
		LoginUserUseCase,
		EditUserProfileUseCase,
		UsersController,
		{
			// 만약에 생성자에서 @Inject 로 사용하고 싶을때
			provide: 'USER_REPOSITORY',
			useClass: MysqlUserRepository,
		},
	],
	exports: [TypeOrmModule, FindUserUseCase],
	controllers: [UsersController],
})
export class UserModule {}
