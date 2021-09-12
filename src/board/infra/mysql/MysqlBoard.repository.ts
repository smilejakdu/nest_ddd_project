import { log } from 'console';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/board/domain/Board';
import { Repository } from 'typeorm';
import { BoardEntity } from '../entity/Board.entity';
import { IBoardRepository } from '../interface/IBoardRepository';

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

	async findByTitle(title: string): Promise<Board> {
		log('board repository title : ', title);
		throw new Error('Method not implemented.');
	}

	myBoard(userId: string): Promise<string> {
		log('board repository content : ', userId);
		throw new Error('Method not implemented.');
	}
}
