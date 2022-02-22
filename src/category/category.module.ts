import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './presentation/category.controller';
import { CategoryEntity } from './infra/entity/CategoryEntity';
import { MoviesEntity } from '../movies/infra/entity/MoviesEntity';
import { CreateCategoryUseCase } from './application/CreateCategoryUseCase/CreateCategoryUseCase';
import { UpdateCategoryUseCase } from './application/UpdateCategoryUseCase/UpdateCategoryUseCase';
import { FindCategoryUseCase } from './application/FindCategoryUseCase/FindCategoryUseCase';
import { CATEGORY_REPOSITORY } from './infra/ICategoryRepository';
import { MysqlCategoryRepository } from './infra/mysql/MysqlCategoryRepository';
import { FindUserUseCase } from '../user/application/FindUserUseCase/FindUserUseCase';
import { MysqlUserRepository } from '../user/infra/mysql/MysqlUserRepository';
import { USER_REPOSITORY } from '../user/infra/IUserRepository';
import { UserEntity } from '../user/infra/entity/UserEntity';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, MoviesEntity, CategoryEntity])],
	providers: [
		CreateCategoryUseCase,
		UpdateCategoryUseCase,
		FindCategoryUseCase,
		FindUserUseCase,
		{
			provide: CATEGORY_REPOSITORY,
			useClass: MysqlCategoryRepository,
		},
		{
			provide: USER_REPOSITORY,
			useClass: MysqlUserRepository,
		},
	],
	exports: [TypeOrmModule],
	controllers: [CategoryController],
})
export class CategoryModule {}
