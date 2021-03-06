import { JwtAuthrization } from '../../shared/domain/JwtEntityId';
import { Board } from './Board';
import { BoardContent } from './BoardContent';
import { BoardTitle } from './BoardTitle';

describe('Board', () => {
	it('it creates', () => {
		const board = Board.createNew({
			boardTitle: BoardTitle.create('board title').value,
			boardContent: BoardContent.create('board content').value,
			userId: JwtAuthrization.create(1).value,
		});
		expect(board.isSuccess).toBeTruthy();
	});
});
