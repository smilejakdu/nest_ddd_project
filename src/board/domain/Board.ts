import { Result } from 'src/shared/core/Result';
import { AggregateRoot } from 'src/shared/domain/AggregateRoot';
import { UniqueEntityId } from 'src/shared/domain/UniqueEntityId';
import { BoardTitle } from './BoardTitle';
import { BoardContent } from './BoardContent';
import { log } from 'console';
import { JwtAuthrization } from 'src/shared/domain/JwtEntityId';

interface BoardProps {
	boardTitle: BoardTitle;
	boardContent: BoardContent;
	userId: JwtAuthrization;
	createdAt: Date;
}

interface BoardNewProps {
	boardTitle: BoardTitle;
	boardContent: BoardContent;
	userId: JwtAuthrization;
}

export class Board extends AggregateRoot<BoardProps> {
	static create(props: BoardProps, id?: UniqueEntityId): Result<Board> {
		return Result.ok(new Board(props, id));
	}

	static createNew(props: BoardNewProps): Result<Board> {
		return Board.create({ ...props, createdAt: new Date() });
	}

	private constructor(props: BoardProps, id?: UniqueEntityId) {
		super(props, id);
	}

	get title(): BoardTitle {
		return this.props.boardTitle;
	}

	get userId(): JwtAuthrization {
		return this.props.userId;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}

	get content(): BoardContent {
		return this.props.boardContent;
	}
}
