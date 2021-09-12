import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { PickType } from '@nestjs/swagger';
import { BoardEntity } from 'src/board/infra/entity/Board.entity';

export class FindBoardRequestDto extends PickType(BoardEntity, [
	'id',
	'title',
	'content',
]) {}

export class FindBoardRequest extends PickType(BoardEntity, [
	'id',
	'title',
	'content',
]) {}

export class FindBoardResponse extends CoreResponse {
	boards?: any;
}
