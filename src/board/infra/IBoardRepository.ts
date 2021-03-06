import { Board } from 'src/board/domain/Board';

import { BoardEntity } from './entity/BoardEntity';

export const BOARD_REPOSITORY = 'BOARD_REPOSITORY';

export interface IBoardRepository {
	save(board: Board): Promise<Board>;

	findByBoardId(id: number): Promise<Board> | undefined;

	myBoard(userId: string): Promise<BoardEntity[]> | undefined;

	findBoard(): Promise<BoardEntity[]> | undefined;

	deleteBoard(boardId: string): Promise<void> | undefined;
}
