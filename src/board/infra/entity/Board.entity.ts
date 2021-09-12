import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { CoreEntity } from 'src/shared/entity/Core.entity';
import { Column, Entity } from 'typeorm';

@Entity({ schema: 'ddd_watcha', name: 'boards' })
export class BoardEntity extends CoreEntity {
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@ApiProperty({
		example: 'title',
		description: 'title',
	})
	@Column('varchar', { name: 'title', length: 200 })
	title: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@ApiProperty({
		example: 'content',
		description: 'content',
	})
	@Column('varchar', { name: 'content', length: 500 })
	content: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'userId',
		description: 'userId',
	})
	@Column('varchar', { name: 'userId', length: 200 })
	userId: string;
}
