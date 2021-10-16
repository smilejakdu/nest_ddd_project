import { Board } from 'src/board/domain/Board';
import { BoardEntity } from './entity/Board.entity';

export const BOARD_REPOSITORY = 'BOARD_REPOSITORY';

export interface IBoardRepository {
	save(board: Board): Promise<Board>;

	findByBoardId(id: string): Promise<Board> | undefined;

	myBoard(userId: string): Promise<BoardEntity[]> | undefined;

	findBoard(): Promise<BoardEntity[]> | undefined;

	deleteBoard(boardId: string): Promise<void> | undefined;
}
