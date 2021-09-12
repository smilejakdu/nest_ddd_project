import { Board } from 'src/board/domain/Board';

export interface IBoardRepository {
	save(board: Board): Promise<Board>;

	findByBoardId(id: string): Promise<Board> | undefined;

	myBoard(userId: string): Promise<Board> | undefined;
}
