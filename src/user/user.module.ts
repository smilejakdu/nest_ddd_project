import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserUseCase } from './application/CreateUser/CreateUserUseCase';
import { UserEntity } from './infra/entity/User.entity';
import { MysqlUserRepository } from './infra/mysql/MysqlUser.repository';
import { UsersController } from './presentation/user.controller';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	providers: [
		CreateUserUseCase,
		{
			provide: 'USER_REPOSITORY',
			useClass: MysqlUserRepository,
		},
	],
	exports: [TypeOrmModule],
	controllers: [UsersController],
})
export class UserModule {}
