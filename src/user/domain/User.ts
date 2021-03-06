import { Result } from '../../shared/core/Result';
import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { UserNickname } from './UserNickname';
import { UserPassword } from './UserPassword';

interface UserProps {
	userNickname: UserNickname;
	userPassword: UserPassword;
	createdAt: Date;
}

export interface UserNewProps {
	userNickname: UserNickname;
	userPassword: UserPassword;
}

export class User extends AggregateRoot<UserProps> {
	private constructor(props: UserProps, id: number) {
		super(props, id);
	}

	static create(props: UserProps, id: number): Result<User> {
		return Result.ok(new User(props, id));
	}

	static createNew(props: UserNewProps): Result<User> {
		return User.create({ ...props, createdAt: new Date() }, 0);
	}

	get nickname(): UserNickname {
		return this.props.userNickname;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}

	get password(): UserPassword {
		return this.props.userPassword;
	}
}
