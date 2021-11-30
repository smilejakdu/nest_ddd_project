import { Result } from 'src/shared/core/Result';
import { AggregateRoot } from 'src/shared/domain/AggregateRoot';
import { UniqueEntityId } from 'src/shared/domain/UniqueEntityId';
import { CommentContent } from './CommentContent';
import { JwtAuthrization } from 'src/shared/domain/JwtEntityId';

interface CommentProps {
	commentContent: CommentContent;
	userId: JwtAuthrization;
	createdAt: Date;
}

interface CommentNewProps {
	commentContent: CommentContent;
	userId: JwtAuthrization;
}

export class Comment extends AggregateRoot<CommentProps> {
	static create(props: CommentProps, id?: UniqueEntityId): Result<Comment> {
		return Result.ok(new Comment(props, id));
	}

	static createNew(props: CommentNewProps): Result<Comment> {
		return Comment.create({ ...props, createdAt: new Date() });
	}

	private constructor(props: CommentProps, id?: UniqueEntityId) {
		super(props, id);
	}

	get userId(): JwtAuthrization {
		return this.props.userId;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}

	get content(): CommentContent {
		return this.props.commentContent;
	}
}
