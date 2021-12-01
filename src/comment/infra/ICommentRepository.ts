import { Comment } from '../domain/Comment';
import { CommentEntity } from './entity/CommentEntity';

export const COMMENT_REPOSITORY = 'COMMENT_REPOSITORY';

export interface ICommentRepository {
	save(comment: Comment): Promise<Comment>;

	findMyComments(userId: string): Promise<CommentEntity[]> | undefined;

	findMyComment(commentId: string): Promise<Comment> | undefined;

	deleteComment(commentId: string): Promise<boolean> | undefined;
}
