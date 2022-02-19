import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CategoryEntity } from './CategoryEntity';

@Injectable()
export class CategoryService {
	@InjectRepository(CategoryEntity)
	private categoryRepository: Repository<CategoryEntity>;
}
