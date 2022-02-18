import { JwtAuthrization } from 'src/shared/domain/JwtEntityId';
import { CommentContent } from 'src/comment/domain/CommentContent';

import { Comment } from './Comment';

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
