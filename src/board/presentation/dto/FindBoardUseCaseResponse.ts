import { ApiProperty } from '@nestjs/swagger';

export class FindBoardUseCaseResponse {
	@ApiProperty({
		type: 'boolean',
		description: 'response boolean',
		example: true,
	})
	ok: boolean;

	@ApiProperty({
		type: 'number',
		description: 'status code',
		example: 200,
	})
	statusCode: number;

	@ApiProperty({
		type: 'string',
		description: 'SUCCESS',
		example: 'SUCCESS',
	})
	message: string;

	@ApiProperty({
		description: 'response my board info',
		example: [],
	})
	boards: [];
}
