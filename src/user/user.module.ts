import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
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
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		PassportModule,
		AuthModule,
		JwtModule.register({
			secret: 'ash_jwt',
			signOptions: { expiresIn: '6000s' },
		}),
	],
	providers: [
		CreateUserUseCase,
		FindUserUseCase,
		LoginUserUseCase,
		UpdateUserProfileUseCase,
		UsersController,
		JwtStrategy,
		{
			provide: USER_REPOSITORY,
			useClass: MysqlUserRepository,
		},
	],
	exports: [TypeOrmModule, FindUserUseCase],
	controllers: [UsersController],
})
export class UserModule {}
