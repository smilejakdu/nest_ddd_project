import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/user/infra/entity/UserEntity';
import { USER_REPOSITORY } from 'src/user/infra/IUserRepository';
import { MysqlUserRepository } from 'src/user/infra/mysql/MysqlUserRepository';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		TypeOrmModule.forFeature([UserEntity]),
		JwtModule.register({
			secret: 'ash_jwt',
			signOptions: { expiresIn: '6000s' },
		}),
	],
	providers: [
		AuthService,
		JwtStrategy,
		{
			provide: USER_REPOSITORY,
			useClass: MysqlUserRepository,
		},
	],
	exports: [PassportModule, AuthService, JwtStrategy],
})
export class AuthModule {}
