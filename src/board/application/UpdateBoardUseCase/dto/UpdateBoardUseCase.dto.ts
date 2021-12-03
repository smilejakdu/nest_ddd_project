import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { PickType } from '@nestjs/swagger';
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';

export class UpdateBoardRequest extends PickType(BoardEntity, ['board_idx', 'title', 'content']) {}

export class UpdateBoardResponse extends CoreResponse {
	board?: {
		board_idx: number;
		title: string;
		content: string;
	};
}
