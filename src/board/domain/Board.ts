import { Result } from 'src/shared/core/Result';
import { AggregateRoot } from 'src/shared/domain/AggregateRoot';
import { UniqueEntityId } from 'src/shared/domain/UniqueEntityId';
import { JwtAuthrization } from 'src/shared/domain/JwtEntityId';

import { BoardTitle } from './BoardTitle';
import { BoardContent } from './BoardContent';

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
	static create(props: BoardProps, id: number): Result<Board> {
		return Result.ok(new Board(props, id));
	}

	static createNew(props: BoardNewProps): Result<Board> {
		return Board.create({ ...props, createdAt: new Date() }, 0);
	}

	private constructor(props: BoardProps, id: number) {
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
