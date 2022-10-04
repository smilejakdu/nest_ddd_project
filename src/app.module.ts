import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Module
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { HistoryModule } from './history/history.module';
import { CommentModule } from './comment/comment.module';
import { LoggerMiddleware } from './shared/logger.middlewares';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { UserEntity } from './user/infra/entity/UserEntity';
import {BoardEntity} from "./board/infra/entity/BoardEntity";
import { CommentEntity } from './comment/infra/entity/CommentEntity';
import {MoviesEntity} from "./movies/infra/entity/MoviesEntity";
import {CategoryEntity} from "./category/infra/entity/CategoryEntity";
import {BoardHistoryEntity} from "./history/infra/entity/BoardHistoryEntity";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: 'local.env',
		}),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT, 10),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [
				UserEntity,
				BoardEntity,
				CommentEntity,
				MoviesEntity,
				CategoryEntity,
				BoardHistoryEntity,
			],
			synchronize: true,
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
