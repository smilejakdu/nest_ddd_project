import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { PickType } from '@nestjs/swagger';
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';

export class FindMyBoardRequest extends PickType(BoardEntity, ['board_idx', 'title', 'content']) {}

export class FindMyBoardResponse extends CoreResponse {
	boards?: BoardEntity[];
}
