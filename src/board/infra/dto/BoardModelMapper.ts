import { log } from 'console';
import { BoardEntity } from 'src/board/infra/entity/BoardEntity';
import { BoardTitle } from 'src/board/domain/BoardTitle';
import { BoardContent } from 'src/board/domain/BoardContent';
import { Board } from 'src/board/domain/Board';
import { JwtAuthrization } from 'src/shared/domain/JwtEntityId';

import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';

export class BoardModelMapper {
	static toDomain(entity: BoardEntity): Board {
		return Board.create(
			{
				boardTitle: BoardTitle.create(entity.title).value,
				boardContent: BoardContent.create(entity.content).value,
				userId: JwtAuthrization.create(entity.userId).value,
				createdAt: entity.createdAt,
			},
			entity.board_idx,
		).value;
	}
}
