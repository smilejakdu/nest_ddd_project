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
import { Connection } from 'typeorm';
import { AppController } from './app.controller';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot(ormconfig),
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
