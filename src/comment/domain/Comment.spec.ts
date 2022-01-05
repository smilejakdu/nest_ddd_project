import { JwtAuthrization } from 'src/shared/domain/JwtEntityId';
import { Comment } from './Comment';
import { CommentContent } from 'src/comment/domain/CommentContent';

describe('Board', () => {
	it('it creates', () => {
		const comment = Comment.createNew({
			commentContent: CommentContent.create('comment_content').value,
			userId: JwtAuthrization.create(1).value,
			boardId: 1,
		});
		expect(comment.isSuccess).toBeTruthy();
	});
});
