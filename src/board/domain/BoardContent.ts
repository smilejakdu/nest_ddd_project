import { ValueObject } from 'src/shared/domain/ValueObject';
import { isEmpty } from 'lodash';
import { Result } from '../../shared/core/Result';

interface BoardContentProps {
	value: string;
}
export class BoardContent extends ValueObject<BoardContentProps> {
	static create(boardContentString: string): Result<BoardContent> {
		if (isEmpty(boardContentString)) {
			return Result.fail('board Content should not be empty.');
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
