import { Board } from 'src/board/domain/Board';

export interface IBoardRepository {
	save(board: Board): Promise<Board>;

	findByTitle(title: string): Promise<Board> | undefined;

	myBoard(userId: string): Promise<string> | undefined;
}
