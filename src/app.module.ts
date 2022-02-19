import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Module
import ormconfig from 'ormconfig';

import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { HistoryModule } from './history/history.module';
import { CommentModule } from './comment/comment.module';
import { LoggerMiddleware } from './shared/logger.middlewares';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		TypeOrmModule.forRoot(ormconfig),
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
