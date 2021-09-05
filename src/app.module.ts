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

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
			ignoreEnvFile: process.env.NODE_ENV === 'prod',
			validationSchema: Joi.object({
				NODE_ENV: Joi.string().valid('prod', 'dev', 'test'),
				DB_HOST: Joi.string().required(),
				DB_PORT: Joi.string().required(),
				DB_USERNAME: Joi.string().required(),
				DB_PASSWORD: Joi.string().required(),
				DB_NAME: Joi.string().required(),
				PRIVATE_KEY: Joi.string().required(),
			}),
		}),
		TypeOrmModule.forRoot(ormconfig),
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
