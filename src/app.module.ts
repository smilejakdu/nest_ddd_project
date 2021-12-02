import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { LoggerMiddleware } from './shared/logger.middlewares';
import { CommentModule } from './comment/comment.module';
import ormconfig from 'ormconfig';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot(ormconfig),
		UserModule,
		BoardModule,
		CommentModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
