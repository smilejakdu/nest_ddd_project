import { Result } from 'src/shared/core/Result';
import { ValueObject } from '../../shared/dto/ValueObject';
import { isEmpty } from 'lodash';

interface BoardTitleProps {
	value: string;
}
export class BoardTitle extends ValueObject<BoardTitleProps> {
	static create(boardTitleString: string): Result<BoardTitle> {
		if (isEmpty(boardTitleString)) {
			return Result.fail('board title should not be empty.');
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
