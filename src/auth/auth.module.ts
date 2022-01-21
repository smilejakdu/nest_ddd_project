import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserEntity } from 'src/user/infra/entity/UserEntity';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT,
			signOptions: { expiresIn: '1d' },
		}),
	],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
