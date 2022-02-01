import { isEmpty } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/board/domain/Board';
import { Repository } from 'typeorm';
import { BoardEntity } from '../entity/BoardEntity';
import { IBoardRepository } from '../IBoardRepository';
import { BoardModelMapper } from '../dto/BoardModelMapper';

export class MysqlBoardRepository implements IBoardRepository {
	constructor(
		@InjectRepository(BoardEntity)
		private readonly boardRepository: Repository<BoardEntity>,
	) {}

	async save(board: Board): Promise<Board> {
		await this.boardRepository.save(
			this.boardRepository.create({
				board_idx: board.id,
				title: board.title.value,
				userId: board.userId.value,
				content: board.content.value,
				createdAt: board.createdAt,
			}),
		);

		return board;
	}

	async findByBoardId(board_idx: number): Promise<Board> {
		const foundBoard = await this.boardRepository
			.createQueryBuilder('board')
			.leftJoinAndSelect('board.Comments', 'comments')
			.where('board.board_idx =:board_idx', { board_idx })
			.getOne();

		if (!foundBoard) {
			return undefined;
		}
		return BoardModelMapper.toDomain(foundBoard);
	}

	async myBoard(userId: string): Promise<BoardEntity[]> {
		const foundMyBoard = await this.boardRepository
			.createQueryBuilder('board')
			.leftJoinAndSelect('board.Comments', 'comments')
			.where('board.userId =:userId', { userId })
			.execute();

		if (isEmpty(foundMyBoard)) {
			throw new Error('나의 게시물이 없습니다.');
		}

		return foundMyBoard;
	}

	async findBoard(): Promise<BoardEntity[]> {
		const foundBoards = await this.boardRepository.find();

		if (isEmpty(foundBoards)) {
			throw new Error('게시물이 없습니다.');
		}

		return foundBoards;
	}

	async deleteBoard(boardId: string): Promise<void> {
		await this.boardRepository.delete(boardId);
	}
}
