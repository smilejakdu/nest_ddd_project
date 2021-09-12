import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { PickType } from '@nestjs/swagger';
import { BoardEntity } from 'src/board/infra/entity/Board.entity';

export class EditBoardRequestDto extends PickType(BoardEntity, [
	'id',
	'title',
	'content',
]) {}

export class EditBoardRequest extends PickType(BoardEntity, [
	'id',
	'title',
	'content',
]) {}

export class EditBoardResponse extends CoreResponse {}
