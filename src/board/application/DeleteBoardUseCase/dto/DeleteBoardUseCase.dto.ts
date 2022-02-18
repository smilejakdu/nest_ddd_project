import { PickType } from '@nestjs/swagger';

import { Column } from 'typeorm';

import { BoardEntity } from 'src/board/infra/entity/BoardEntity';

import { CoreResponse } from '../../../../shared/dto/CoreResponse';

export class DeleteBoardRequest extends PickType(BoardEntity, ['board_idx']) {}

export class DeleteBoardResponse extends CoreResponse {
	@Column()
	id?: number;
}
