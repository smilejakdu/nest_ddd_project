import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { PickType } from '@nestjs/swagger';
import { BoardEntity } from 'src/board/infra/entity/Board.entity';

export class DeleteBoardRequestDto extends PickType(BoardEntity, ['id']) {}

export class DeleteBoardRequest extends PickType(BoardEntity, ['id', 'title', 'content']) {}

export class DeleteBoardResponse extends CoreResponse {}
