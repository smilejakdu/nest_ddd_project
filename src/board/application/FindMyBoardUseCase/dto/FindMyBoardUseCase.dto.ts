import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { PickType } from '@nestjs/swagger';
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';

export class FindMyBoardRequest extends PickType(BoardEntity, ['id', 'title', 'content']) {}

export class FindMyBoardResponse extends CoreResponse {
	boards?: BoardEntity[];
}
