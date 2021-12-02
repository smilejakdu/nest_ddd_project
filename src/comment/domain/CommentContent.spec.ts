import { Result } from 'src/shared/core/Result';

import { CommentContent, COMMENT_CONTENT_SHOULD_NOT_BE_NULL_UNDEFINED } from './CommentContent';

describe('CommentContent', () => {
	const COMMENT_CONTENT = 'content_test';
	let commentContentOrError: Result<CommentContent>;

	beforeAll(() => {
		commentContentOrError = CommentContent.create(COMMENT_CONTENT);
	});

	it('creates 생성되는지 확인', () => {
		expect(commentContentOrError.isSuccess).toBe(true);
		expect(commentContentOrError.value.props.value).toEqual(COMMENT_CONTENT);
	});

	it('returns an error when CommentContent is null or undefined', () => {
		const commentContentNullOrError = CommentContent.create(null);
		const commentContentUndefinedOrError = CommentContent.create(undefined);

		expect(commentContentNullOrError.isSuccess).toBe(false);
		expect(commentContentUndefinedOrError.isSuccess).toBe(false);
		expect(commentContentNullOrError.errorValue()).toEqual(
			COMMENT_CONTENT_SHOULD_NOT_BE_NULL_UNDEFINED,
		);
		expect(commentContentUndefinedOrError.errorValue()).toEqual(
			COMMENT_CONTENT_SHOULD_NOT_BE_NULL_UNDEFINED,
		);
	});
});
