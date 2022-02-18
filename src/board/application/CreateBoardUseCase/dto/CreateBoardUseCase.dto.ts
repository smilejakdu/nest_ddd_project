import { ApiProperty, PickType } from '@nestjs/swagger';

import { PrimaryColumn, Column } from 'typeorm';

import { IsNotEmpty, IsString } from 'class-validator';

import { BoardEntity } from '../../../infra/entity/BoardEntity';
import { CoreResponse } from '../../../../shared/dto/CoreResponse';

export class CreateBoardResponseDto {
	@PrimaryColumn()
	@IsString()
	public board_idx: number;

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
