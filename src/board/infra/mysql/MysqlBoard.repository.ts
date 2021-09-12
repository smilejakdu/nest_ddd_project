import { log } from 'console';
import { isEmpty } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/board/domain/Board';
import { Repository } from 'typeorm';
import { BoardEntity } from '../entity/Board.entity';
import { IBoardRepository } from '../interface/IBoardRepository';
import { BoardModelMapper } from '../dto/BoardModelMapper';

export class MysqlBoardRepository implements IBoardRepository {
	constructor(
		@InjectRepository(BoardEntity)
		private readonly boardRepository: Repository<BoardEntity>,
	) {}

	async save(board: Board): Promise<Board> {
		await this.boardRepository.save(
			this.boardRepository.create({
				id: board.id.toValue().toString(),
				title: board.title.value,
				userId: board.userId.value,
				content: board.content.value,
				createdAt: board.createdAt,
			}),
		);

		return board;
	}

	async findByBoardId(id: string): Promise<Board> {
		log('board repository id : ', id);
		const foundBoardId = await this.boardRepository.findOne({
			where: { id: id },
			select: ['id', 'title', 'content', 'createdAt', 'userId'],
		});
		if (!foundBoardId) {
			return undefined;
		}
		return BoardModelMapper.toDomain(foundBoardId);
	}

	async myBoard(userId: string): Promise<Board> | undefined {
		const foundUsertoBoards = await this.boardRepository.find({
			where: { userId: userId },
			select: ['id', 'title', 'content', 'createdAt', 'userId'],
		});

		if (isEmpty(foundUsertoBoards)) {
			return undefined;
		}

		return;
	}
}
