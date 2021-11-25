import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { AuthModule } from 'src/auth/auth.module';
// UseCase
import { CreateUserUseCase } from './application/CreateUser/CreateUserUseCase';
import { UpdateUserProfileUseCase } from './application/UpdateUserProfile/UpdateUserProfileUseCase';
import { FindUserUseCase } from './application/FindUser/FindUserUseCase';
import { LoginUserUseCase } from './application/Login/LoginUserUseCase';
// Entity
import { UserEntity } from './infra/entity/User.entity';
// Repository
import { MysqlUserRepository } from './infra/mysql/MysqlUserRepository';
import { USER_REPOSITORY } from './infra/IUserRepository';
// Controller
import { UsersController } from './presentation/user.controller';

dotenv.config();
const JWT = process.env.JWT as string;

@Module({
	imports: [
		AuthModule,
		TypeOrmModule.forFeature([UserEntity]),
		JwtModule.register({
			secret: JWT,
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
