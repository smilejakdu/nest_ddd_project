import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
// Entity
import { CoreEntity } from '../../../shared/entity/CoreEntity';
import { UserEntity } from '../../../user/infra/entity/UserEntity';
import { CommentEntity } from '../../../comment/infra/entity/CommentEntity';

@Entity({ schema: 'ddd_watcha', name: 'boards' })
export class BoardEntity extends CoreEntity {
	@Column('varchar', { name: 'title', length: 200 })
	title: string;

	@Column('varchar', { name: 'content', length: 500 })
	content: string;

	@Column('varchar', { name: 'userId', length: 200 })
	userId: string;

	@OneToMany(() => CommentEntity, comments => comments.Board)
	Comments: CommentEntity[];

	@ManyToOne(() => UserEntity, user => user.Boards, {
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
	User: UserEntity;
}
