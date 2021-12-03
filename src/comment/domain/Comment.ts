import { Result } from 'src/shared/core/Result';
import { AggregateRoot } from 'src/shared/domain/AggregateRoot';
import { UniqueEntityId } from 'src/shared/domain/UniqueEntityId';
import { CommentContent } from './CommentContent';
import { JwtAuthrization } from 'src/shared/domain/JwtEntityId';

interface CommentProps {
	commentContent: CommentContent;
	userId: JwtAuthrization;
	boardId: number;
	createdAt: Date;
}

interface CommentNewProps {
	commentContent: CommentContent;
	userId: JwtAuthrization;
	boardId: number;
}

export class Comment extends AggregateRoot<CommentProps> {
	private constructor(props: CommentProps, id: number) {
		super(props, id);
	}

	static create(props: CommentProps, id: number): Result<Comment> {
		return Result.ok(new Comment(props, id));
	}

	static createNew(props: CommentNewProps): Result<Comment> {
		return Comment.create({ ...props, createdAt: new Date() }, 0);
	}

	get userId(): JwtAuthrization {
		return this.props.userId;
	}

	get boardId(): number {
		return this.props.boardId;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}

	get content(): CommentContent {
		return this.props.commentContent;
	}
}
