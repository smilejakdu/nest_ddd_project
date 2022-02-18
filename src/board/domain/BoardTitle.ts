import { isEmpty, isNil } from 'lodash';
import { Result } from 'src/shared/core/Result';

import { ValueObject } from '../../shared/dto/ValueObject';

interface BoardTitleProps {
	value: string;
}

export const BOARD_TITLE_SHOULD_NOT_EMPTY = 'BoardTitle should be not empty.';
export const BOARD_TITLE_SHOULD_NOT_NULL_UNDEFINED = 'BoardTitle should be not null or defined.';

export class BoardTitle extends ValueObject<BoardTitleProps> {
	static create(boardTitleString: string): Result<BoardTitle> {
		if (isEmpty(boardTitleString)) {
			return Result.fail(BOARD_TITLE_SHOULD_NOT_EMPTY);
		}

		if (isNil(boardTitleString)) {
			return Result.fail(BOARD_TITLE_SHOULD_NOT_NULL_UNDEFINED);
		}

		return Result.ok(new BoardTitle({ value: boardTitleString }));
	}

	private constructor(props: BoardTitleProps) {
		super(props);
	}

	get value(): string {
		return this.props.value;
	}
}
