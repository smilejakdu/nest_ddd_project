import { ApiProperty } from '@nestjs/swagger';

import { Column } from 'typeorm';

import { IsString } from 'class-validator';

export class CoreResponse {
	@ApiProperty({ example: 'true', description: 'ok boolean' })
	@Column()
	ok: boolean;

	@ApiProperty({ example: '200', description: 'statusCode' })
	@Column()
	statusCode: number;

	@ApiProperty({ example: 'message', description: 'message' })
	@IsString()
	@Column()
	message: string;
}
