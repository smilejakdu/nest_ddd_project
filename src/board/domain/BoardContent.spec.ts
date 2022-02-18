import { Result } from 'src/shared/core/Result';
import { BoardContent, BOARD_CONTENT_SHOULD_NOT_BE_NULL_UNDEFINED, BOARD_CONTENT_SHOULD_NOT_BE_EMPTY } from 'src/board/domain/BoardContent';

describe('BoardContent', () => {
	const BOARD_CONTENT = 'content_test';
	let boardContentOrError: Result<BoardContent>;

	beforeAll(() => {
		boardContentOrError = BoardContent.create(BOARD_CONTENT);
	});

	it('creates 생성되는지 확인', () => {
		expect(boardContentOrError.isSuccess).toBe(true);
		expect(boardContentOrError.value.value.toString).toEqual(BOARD_CONTENT);
	});

	it('returns an error when BoardContent is empty', () => {
		boardContentOrError = BoardContent.create('');

		expect(boardContentOrError.isSuccess).toBe(true);
		expect(boardContentOrError.errorValue()).toEqual(BOARD_CONTENT_SHOULD_NOT_BE_EMPTY);
	});

	it('returns an error when BoardTitle is null or undefined', () => {
		const boardTitleNullOrError = BoardContent.create(null);
		const boardTitleUndefinedOrError = BoardContent.create(undefined);

		expect(boardTitleNullOrError.isSuccess).toBe(false);
		expect(boardTitleUndefinedOrError.isSuccess).toBe(false);
		expect(boardTitleNullOrError.errorValue()).toEqual(BOARD_CONTENT_SHOULD_NOT_BE_NULL_UNDEFINED);
		expect(boardTitleUndefinedOrError.errorValue()).toEqual(BOARD_CONTENT_SHOULD_NOT_BE_NULL_UNDEFINED);
	});
});
