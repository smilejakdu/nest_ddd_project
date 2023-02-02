import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import Joi from 'joi';

// Module

import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { HistoryModule } from './history/history.module';
import { CommentModule } from './comment/comment.module';
import { LoggerMiddleware } from './shared/logger.middlewares';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CoreEntity } from './shared/entity/CoreEntity';
import { UserEntity } from './user/infra/entity/UserEntity';
import { BoardEntity } from './board/infra/entity/BoardEntity';
import { CommentEntity } from './comment/infra/entity/CommentEntity';
import { CategoryEntity } from './category/infra/entity/CategoryEntity';
import { MoviesEntity } from './movies/infra/entity/MoviesEntity';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : process.env.NODE_ENV === 'dev' ? 'dev.env' : 'local.env',
			validationSchema: Joi.object({
				NODE_ENV: Joi.string().valid('local', 'dev', 'prod').required(),
				MYSQL_HOST: Joi.string().required(),
				MYSQL_PORT: Joi.string().required(),
				MYSQL_USER: Joi.string().required(),
				MYSQL_PASSWORD: Joi.string().required(),
				MYSQL_DATABASE: Joi.string().required(),
			}),
		}),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.MYSQL_HOST,
			port: Number(process.env.MYSQL_PORT) as number,
			username: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE,
			entities: [CoreEntity, UserEntity, BoardEntity, CommentEntity, CategoryEntity, MoviesEntity],
			autoLoadEntities: true,
			charset: 'utf8mb4',
			synchronize: false,
		}),
		UserModule,
		BoardModule,
		CommentModule,
		HistoryModule,
		AuthModule,
		CategoryModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
