import { Column } from 'typeorm';

import { IsString } from 'class-validator';

export class CoreResponse {
	@Column()
	ok: boolean;

	@Column()
	statusCode: number;

	@IsString()
	@Column()
	message: string;
}
