import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './presentation/category.controller';
import { CategoryEntity } from './infra/entity/CategoryEntity';
import { ProductsEntity } from '../products/infra/entity/ProductsEntity';
import { CreateCategoryUseCase } from './application/CreateCategoryUseCase/CreateCategoryUseCase';
import { UpdateCategoryUseCase } from './application/UpdateCategoryUseCase/UpdateCategoryUseCase';
import { FindCategoryUseCase } from './application/FindCategoryUseCase/FindCategoryUseCase';
import { CATEGORY_REPOSITORY } from './infra/ICategoryRepository';
import { MysqlCategoryRepository } from './infra/mysql/MysqlCategoryRepository';

@Module({
	imports: [TypeOrmModule.forFeature([ProductsEntity, CategoryEntity])],
	providers: [
		CreateCategoryUseCase,
		UpdateCategoryUseCase,
		FindCategoryUseCase,
		{
			provide: CATEGORY_REPOSITORY,
			useClass: MysqlCategoryRepository,
		},
	],
	exports: [TypeOrmModule],
	controllers: [CategoryController],
})
export class CategoryModule {}
