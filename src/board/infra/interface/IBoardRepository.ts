import { Board } from 'src/board/domain/Board';
import { BoardEntity } from '../entity/Board.entity';

export interface IBoardRepository {
	save(board: Board): Promise<Board>;

	findByBoardId(id: string): Promise<Board> | undefined;

	myBoard(userId: string): Promise<BoardEntity[]> | undefined;

	findBoard(): Promise<BoardEntity[]> | undefined;

	deleteBoard(boardId: number): Promise<number> | undefined;
}
