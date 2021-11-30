import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { PickType } from '@nestjs/swagger';
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';

export class UpdateBoardRequest extends PickType(BoardEntity, ['id', 'title', 'content']) {}

export class UpdateBoardResponse extends CoreResponse {
	board?: {
		id: string;
		title: string;
		content: string;
	};
}
