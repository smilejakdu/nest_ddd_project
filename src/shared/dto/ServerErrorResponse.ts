import { ApiProperty } from '@nestjs/swagger';

export class ServerErrorResponse {
	@ApiProperty({
		type: 'number',
		description: '500',
		example: '500',
	})
	statusCode: number;

	@ApiProperty({
		type: 'string',
		description: 'Internal server error',
		example: 'Internal server error',
	})
	message: string;
}

export const SERVER_ERROR = 'SERVER_ERROR';
