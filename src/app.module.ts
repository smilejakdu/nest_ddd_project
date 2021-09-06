import * as Joi from 'joi';
import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import * as ormconfig from '../ormconfig';
import { JwtMiddleware } from './jwt/JwtMiddleWare';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from './jwt/jwt.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot(ormconfig),
		JwtModule.forRoot({
			privateKey: process.env.PRIVATE_KEY,
		}),
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(JwtMiddleware).forRoutes({
			path: '/jwt_path',
			method: RequestMethod.POST,
		});
	}
}
