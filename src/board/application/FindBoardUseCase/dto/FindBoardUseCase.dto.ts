import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { PickType } from '@nestjs/swagger';
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';

export class FindBoardRequest extends PickType(BoardEntity, ['board_idx', 'title', 'content']) {}

export class FindBoardResponse extends CoreResponse {
	boards?: BoardEntity[];
}
