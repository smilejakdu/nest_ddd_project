import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { BoardEntity } from '../../../infra/entity/BoardEntity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PrimaryColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardResponseDto {
	@PrimaryColumn()
	@IsString()
	public id: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'title', description: 'title' })
	public title: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'content', description: 'content' })
	public content: string;
}

export class CreateBoardUseCaseRequest extends PickType(BoardEntity, ['title', 'content']) {}

export class CreateBoardUseCaseResponse extends CoreResponse {
	@Column()
	board?: CreateBoardResponseDto;
}
