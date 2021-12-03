import { log } from 'console';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { JwtAuthrization } from 'src/shared/domain/JwtEntityId';
// Entity
import { CommentEntity } from '../entity/CommentEntity';
// Domain
import { Comment } from 'src/comment/domain/Comment';
import { CommentContent } from 'src/comment/domain/CommentContent';

export class CommentModelMapper {
	static toDomain(entity: CommentEntity): Comment {
		return Comment.create(
			{
				commentContent: CommentContent.create(entity.content).value,
				userId: JwtAuthrization.create(entity.userId).value,
				boardId: entity.boardId,
				createdAt: entity.createdAt,
			},
			entity.comment_idx,
		).value;
	}
}
