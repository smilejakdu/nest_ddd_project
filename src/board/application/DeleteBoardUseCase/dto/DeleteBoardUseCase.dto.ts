import { Column } from 'typeorm';

import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { PickType } from '@nestjs/swagger';
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';

export class DeleteBoardRequest extends PickType(BoardEntity, ['board_idx']) {}

export class DeleteBoardResponse extends CoreResponse {
	@Column()
	id?: number;
}
