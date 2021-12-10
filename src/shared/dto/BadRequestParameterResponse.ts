import { ApiProperty } from '@nestjs/swagger';

export class BadRequestParameterResponse {
	@ApiProperty({
		type: 'boolean',
		description: 'bad request response',
		example: false,
	})
	success: boolean;

	@ApiProperty({
		type: 'number',
		description: '400',
		example: '400',
	})
	statusCode: number;

	@ApiProperty({
		type: 'string',
		description: 'bad_request',
		example: 'bad_request',
	})
	message: string;
}

export const BAD_REQUEST_PARAMETER = 'BAD_REQUEST_PARAMETER';
