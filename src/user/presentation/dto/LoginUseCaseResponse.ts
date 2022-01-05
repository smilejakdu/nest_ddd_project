import { ApiProperty } from '@nestjs/swagger';
import { BoardHistoryEntity } from 'src/history/infra/entity/BoardHistoryEntity';

export class LoginUserUseCaseResponse {
	@ApiProperty({
		type: 'boolean',
		description: 'response boolean',
		example: true,
	})
	ok: boolean;

	@ApiProperty({
		type: 'object',
		description: 'response user info',
		example: { user_idx: 1, nickname: 'ash' },
	})
	user: {
		user_idx: number;
		nickname: string;
	};

	@ApiProperty({
		type: 'string',
		description: 'response token',
		example: '#%!@dvhsidpffoiheolhadsflih',
	})
	token: string;
}