import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserUseCase } from './application/CreateUser/CreateUserUseCase';
import { FindUserUseCase } from './application/FindUser/FindUserUseCase';
import { LoginUserUseCase } from './application/Login/LoginUserUseCase';

import { UserEntity } from './infra/entity/User.entity';
import { MysqlUserRepository } from './infra/mysql/MysqlUser.repository';
import { UsersController } from './presentation/user.controller';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	providers: [
		CreateUserUseCase,
		FindUserUseCase,
		LoginUserUseCase,
		UsersController,
		{
			provide: 'USER_REPOSITORY',
			useClass: MysqlUserRepository,
		},
	],
	exports: [TypeOrmModule, FindUserUseCase],
	controllers: [UsersController],
})
export class UserModule {}
