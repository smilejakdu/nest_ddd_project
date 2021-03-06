import { isNil } from 'lodash';

import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';

interface CommentContentProps {
	value: string;
}

export const COMMENT_CONTENT_SHOULD_NOT_BE_NULL_UNDEFINED = 'CommentContent should not be null or undefined.';

export class CommentContent extends ValueObject<CommentContentProps> {
	static create(commentContentString: string): Result<CommentContent> {
		if (isNil(commentContentString)) {
			return Result.fail(COMMENT_CONTENT_SHOULD_NOT_BE_NULL_UNDEFINED);
		}

		return Result.ok(new CommentContent({ value: commentContentString }));
	}

	private constructor(props: CommentContentProps) {
		super(props);
	}

	get value(): string {
		return this.props.value;
	}
}
