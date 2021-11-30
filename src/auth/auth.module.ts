import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UserEntity } from 'src/user/infra/entity/UserEntity';
import dotenv from 'dotenv';
import { log } from 'console';

dotenv.config();
const JWT = process.env.JWT;

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		PassportModule,
		JwtModule.register({
			secret: JWT,
			signOptions: { expiresIn: '1d' },
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
