import { isEmpty, isNil } from 'lodash';

import { ValueObject } from 'src/shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';

interface BoardContentProps {
	value: string;
}

export const BOARD_CONTENT_SHOULD_NOT_BE_EMPTY = 'BoardContent should not be empty.';
export const BOARD_CONTENT_SHOULD_NOT_BE_NULL_UNDEFINED = 'BoardContent should not be null or undefined.';

export class BoardContent extends ValueObject<BoardContentProps> {
	static create(boardContentString: string): Result<BoardContent> {
		if (isEmpty(boardContentString)) {
			return Result.fail(BOARD_CONTENT_SHOULD_NOT_BE_EMPTY);
		}

		if (isNil(boardContentString)) {
			return Result.fail(BOARD_CONTENT_SHOULD_NOT_BE_NULL_UNDEFINED);
		}

		return Result.ok(new BoardContent({ value: boardContentString }));
	}

	private constructor(props: BoardContentProps) {
		super(props);
	}

	get value(): string {
		return this.props.value;
	}
}
