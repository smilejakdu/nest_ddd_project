import { ApiProperty } from '@nestjs/swagger';

export class SignupUseCaseResponse {
	@ApiProperty({
		type: 'boolean',
		description: 'true',
		example: true,
	})
	ok: boolean;

	@ApiProperty({
		type: 'number',
		description: '200',
		example: 200,
	})
	statusCode: number;

	@ApiProperty({
		type: 'object',
		description: 'user info response',
		example: { nickname: 'ash' },
	})
	user?: object;
}
