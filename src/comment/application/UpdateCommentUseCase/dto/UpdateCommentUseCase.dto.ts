import { ApiProperty, PickType } from '@nestjs/swagger';
import { PrimaryColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { CommentEntity } from '../../../infra/entity/CommentEntity';

export class UpdateCommentResponseDto {
	@PrimaryColumn()
	@IsString()
	public id: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'content', description: 'content' })
	public content: string;
}

export class UpdateCommentUseCaseRequest extends PickType(CommentEntity, [
	'id',
	'content',
	'boardId',
]) {}

export class UpdateCommentUseCaseResponse extends CoreResponse {
	@Column()
	comment?: UpdateCommentResponseDto;
}
