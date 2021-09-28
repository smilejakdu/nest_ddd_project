import { Result } from 'src/shared/core/Result';
import {
	BOARD_TITLE_SHOULD_NOT_EMPTY,
	BOARD_TITLE_SHOULD_NOT_NULL_UNDEFINED,
	BoardTitle,
} from './BoardTitle';

describe('BoardTitle', () => {
	const BOARD_TITLE = 'title_test';
	let boardTitleOrError: Result<BoardTitle>;

	beforeAll(() => {
		boardTitleOrError = BoardTitle.create(BOARD_TITLE);
	});

	it('creates 생성되는지 확인', () => {
		expect(boardTitleOrError.isSuccess).toBe(true);
		expect(boardTitleOrError.value.value.toString).toEqual(BOARD_TITLE);
	});

	it('UserNickname String 은 빈 값일 수 없습니다', () => {
		boardTitleOrError = BoardTitle.create('');

		expect(boardTitleOrError.isSuccess).toBe(false);
		expect(boardTitleOrError.errorValue()).toEqual(BOARD_TITLE_SHOULD_NOT_EMPTY);
	});

	it('UserNickname String 은 빈 값일 수 없습니다', () => {
		const boardTitleNullOrError = BoardTitle.create(null);
		const boardTitleUndefinedOrError = BoardTitle.create(undefined);

		expect(boardTitleNullOrError.isSuccess).toBe(false);
		expect(boardTitleUndefinedOrError.isSuccess).toBe(false);
		expect(boardTitleNullOrError.errorValue()).toEqual(BOARD_TITLE_SHOULD_NOT_EMPTY);
		expect(boardTitleUndefinedOrError.errorValue()).toEqual(BOARD_TITLE_SHOULD_NOT_EMPTY);
	});
});
