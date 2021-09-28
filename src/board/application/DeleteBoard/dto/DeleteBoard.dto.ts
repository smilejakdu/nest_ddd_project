import { Column } from 'typeorm';

import { CoreResponse } from '../../../../shared/dto/CoreResponse';
import { PickType } from '@nestjs/swagger';
import { BoardEntity } from 'src/board/infra/entity/Board.entity';

export class DeleteBoardRequest extends PickType(BoardEntity, ['id']) {}

export class DeleteBoardResponse extends CoreResponse {
	@Column()
	id: number;
}
