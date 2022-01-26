import { ApiProperty } from '@nestjs/swagger';

export const BAD_REQUEST_PARAMETER = 'BAD_REQUEST_PARAMETER';

export class BadRequestParameterResponse {
	@ApiProperty({
		type: 'boolean',
		description: 'bad request response',
		example: false,
	})
	ok: boolean;

	@ApiProperty({
		type: 'number',
		description: '400',
		example: '400',
	})
	statusCode: number;

	@ApiProperty({
		type: 'string',
		description: 'bad_request',
		example: 'BAD_REQUEST',
	})
	message: string;
}
