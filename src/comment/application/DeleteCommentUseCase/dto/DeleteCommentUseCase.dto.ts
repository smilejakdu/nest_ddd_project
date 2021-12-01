import { ApiProperty, PickType } from '@nestjs/swagger';
import { PrimaryColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { CommentEntity } from '../../../infra/entity/CommentEntity';

export class DeleteCommentResponseDto {
	@PrimaryColumn()
	@IsString()
	public id: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'content', description: 'content' })
	public content: string;
}

export class DeleteCommentUseCaseRequest extends PickType(CommentEntity, ['id']) {}

export class DeleteCommentUseCaseResponse extends CoreResponse {
	@Column()
	comment?: DeleteCommentResponseDto;
}
