import { BoardContent } from '../../domain/BoardContent';
import { BoardTitle } from '../../domain/BoardTitle';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { BoardEntity } from '../entity/Board.entity';
import { Board } from '../../domain/Board';

export class BoardModelMapper {
	static toDomain(entity: BoardEntity): Board {
		return Board.create(
			{
				boardTitle: BoardTitle.create(entity.title).value,
				boardContent: BoardContent.create(entity.content).value,
				createdAt: entity.createdAt,
			},
			new UniqueEntityId(entity.id),
		).value;
	}
}
