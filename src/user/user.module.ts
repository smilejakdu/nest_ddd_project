import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
// UseCase
import { CreateUserUseCase } from './application/CreateUserUseCase/CreateUserUseCase';
import { UpdateUserProfileUseCase } from './application/UpdateUserProfileUseCase/UpdateUserProfileUseCase';
import { FindUserUseCase } from './application/FindUserUseCase/FindUserUseCase';
import { LoginUserUseCase } from './application/LoginUserCase/LoginUserUseCase';
// Entity
import { UserEntity } from './infra/entity/UserEntity';
// Repository
import { MysqlUserRepository } from './infra/mysql/MysqlUserRepository';
import { USER_REPOSITORY } from './infra/IUserRepository';
// Controller
import { UsersController } from './presentation/user.controller';

@Module({
	imports: [
		AuthModule,
		TypeOrmModule.forFeature([UserEntity]),
		JwtModule.register({
			secret: String(process.env.JWT),
			signOptions: { expiresIn: '6000s' },
		}),
	],
	providers: [
		CreateUserUseCase,
		FindUserUseCase,
		LoginUserUseCase,
		UpdateUserProfileUseCase,
		UsersController,
		{
			provide: USER_REPOSITORY,
			useClass: MysqlUserRepository,
		},
	],
	exports: [TypeOrmModule, FindUserUseCase],
	controllers: [UsersController],
})
export class UserModule {}
